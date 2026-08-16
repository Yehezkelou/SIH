# Documentation - Patient-Identity-Service

# Plan d'implémentation — Patient-Identity-Service

Document vivant listant les fonctionnalités à implémenter dans le microservice
`Patient-Identity-Service`, avec pour chacune : le contexte métier, les règles,
et le détail technique (fichiers à créer/modifier) en suivant les conventions
déjà en place dans le repo (NestJS, TypeORM, Zod via `@UseZodSchema`,
repository pattern, subscriber pour l'audit trail).

> Statut des fonctionnalités : 🟡 à faire · 🟢 fait · 🔵 en cours

---

## 1. 🟡 Dossier Patient Provisoire (urgence / identité incomplète)

### 1.1 Contexte métier

Aux urgences, un patient peut se présenter :
- inconscient, incapable de communiquer son identité,
- sans pièce d'identité, sans téléphone joignable pour la famille,
- en état d'urgence vitale où faire remplir le formulaire complet retarderait
  la prise en charge,
- mineur non accompagné dont le responsable légal n'est pas joignable
  immédiatement,
- lors d'une panne du système empêchant de vérifier les doublons (registre
  national, CMU...).

**Règle d'or : la prise en charge médicale ne doit jamais être bloquée par
l'absence d'identité complète.** Le dossier provisoire permet de créer
immédiatement une entrée `Patient` minimale, avec des valeurs par défaut,
et de la compléter/« régulariser » plus tard.

### 1.2 Règles métier à respecter

1. Un dossier provisoire est **explicitement marqué** (`statutDossier =
   "PROVISOIRE"`) afin qu'aucun autre microservice (Admission, Facturation...)
   ne le traite comme une identité fiable.
2. Un **délai de régularisation** est fixé à la création (ex. 48h,
   configurable). Passé ce délai, le dossier doit apparaître dans une liste
   de suivi ("dossiers à régulariser en retard").
3. À la création provisoire, **aucune vérification stricte de doublon** n'est
   possible (numéro sécu, CNI... souvent absents) → on fait une recherche
   **floue non bloquante** (nom/prénom/date de naissance approximative) et on
   remonte les correspondances possibles en information, sans jamais bloquer
   la création.
4. La **régularisation** (complétion du dossier) est le moment où l'on
   applique enfin la vérification stricte de doublon (comme
   `createNewPatient` le fait aujourd'hui). Si un doublon est détecté à ce
   moment-là, il faut déclencher un processus de **fusion** plutôt qu'une
   simple erreur bloquante (cf. §3 `fusionPatient`).
5. Toute création/régularisation reste tracée automatiquement par
   `PatientSubscriber` (aucun changement requis de ce côté, l'historique
   `PatientHistory` capture déjà `CREATE`/`UPDATE`).

### 1.3 Modèle de données — évolutions de `Patient`

Fichier : `src/modules/patient/entities/patient.entity.ts`

Ajouter :

| Champ | Type | Nullable | Notes |
|---|---|---|---|
| `statutDossier` | enum `"PROVISOIRE" \| "DEFINITIF"` | non, défaut `"DEFINITIF"` | indexé, permet de filtrer facilement |
| `motifProvisoire` | enum `"URGENCE_VITALE" \| "PATIENT_INCONSCIENT" \| "IDENTITE_INCONNUE" \| "MINEUR_NON_ACCOMPAGNE" \| "PANNE_SYSTEME" \| "AUTRE"` | oui | uniquement renseigné si provisoire |
| `serviceCreation` | varchar | oui | ex. `"URGENCES"`, service à l'origine de la création |
| `signalement` | text | oui | description physique (taille, vêtements, signes particuliers...) utile pour identifier un patient inconscient/inconnu |
| `photoIdentification` | varchar | oui | chemin du fichier (même méthode que `ArchivDossier`, via Multer) |
| `dateLimiteRegularisation` | timestamp | oui | `createdAt + délai configurable`, calculé côté service |
| `regulariseAt` | timestamp | oui | date de complétion du dossier |
| `regularisePar` | varchar (uuid) | oui | utilisateur ayant régularisé |

**Changement important requis sur les champs existants** :
`email!: string` et `numero!: string` sont aujourd'hui `NOT NULL`. Pour un
dossier provisoire ces informations peuvent être totalement absentes — il ne
faut **pas** les remplir avec de fausses valeurs (`"0000000000"`,
`"inconnu@sih.local"` etc.), ça pollue les recherches et casse la
sémantique du champ. → Passer ces deux colonnes en `nullable: true` (retirer
le `!`). La contrainte « obligatoire » reste portée par le schéma Zod
`CreatePatientSchema` (dossier définitif classique), pas par la base — c'est
cohérent avec le reste de l'entité qui laisse déjà beaucoup de champs
optionnels au niveau DB.

Comme `synchronize: true` est actif en dev (`libs/database/src/lib/database.module.ts:34`),
ces changements de colonnes s'appliquent au redémarrage du service — pas de
migration TypeORM à écrire pour l'instant. ⚠️ Le jour où le projet passera en
production, il faudra désactiver `synchronize` et introduire de vraies
migrations : à garder en tête, hors scope immédiat.

### 1.4 Génération de l'identifiant

Fichier : `src/helpers/func/uniquePatientIdGenerated.ts`

Faire évoluer `PatientIdGenerated` pour accepter un second paramètre optionnel
`isProvisoire?: boolean` qui change le préfixe (`"URG"` au lieu de `"SIH"`),
afin qu'un numéro de dossier provisoire soit reconnaissable **visuellement**
par le personnel (ex. `URG-2026-X-4F91AE2B` vs `SIH-2026-X-4F91AE2B`).

### 1.5 Validation Zod

Fichier : `src/modules/patient/validator/patient.validator.ts`

Nouveau schéma `CreateProvisionalPatientSchema`, volontairement permissif par
rapport à `CreatePatientSchema` :

```ts
export const CreateProvisionalPatientSchema = z.object({
  identity: z.object({
    nom: z.string().default("INCONNU"),
    prenom: z.string().default("INCONNU"),
    age: z.number().int().optional(),       // âge estimé, pas de défaut arbitraire
    genre: z.enum(["M", "F"]).default("M"),
    dateNaissance: z.date().optional(),
    lieuNaissance: z.string().optional(),
  }),
  urgence: z.object({
    motifProvisoire: z.enum([
      "URGENCE_VITALE", "PATIENT_INCONSCIENT", "IDENTITE_INCONNUE",
      "MINEUR_NON_ACCOMPAGNE", "PANNE_SYSTEME", "AUTRE"
    ]),
    serviceCreation: z.string().min(2),
    signalement: z.string().max(1000).optional(),
  }),
  contact: z.object({          // tout optionnel, pas de placeholder
    email: z.email().optional(),
    numero: z.string().optional(),
    contactUrgence: z.string().optional(),
  }).optional(),
  CreatedBy: z.object({
    createdBy: z.uuid(),        // obligatoire ici : on veut savoir quel soignant a créé le dossier
  }),
});

export type CreateProvisionalPatientInput = z.infer<typeof CreateProvisionalPatientSchema>;
```

Nouveau schéma `RegulariserPatientSchema` pour compléter un dossier
provisoire — réutilise `UpdatePatientSchema` (déjà partiel) en y ajoutant la
contrainte que l'identité et le contact deviennent obligatoires à ce stade :

```ts
export const RegulariserPatientSchema = UpdatePatientSchema.extend({
  identity: CreatePatientSchema.shape.identity,
  contact: CreatePatientSchema.shape.contact,
  uniqueIdentity: CreatePatientSchema.shape.uniqueIdentity,
});
```

### 1.6 DTO

Fichier : `src/modules/patient/dto/patient.dto.ts`

- `CreateProvisionalPatientDto implements CreateProvisionalPatientInput`
  décoré `@UseZodSchema(CreateProvisionalPatientSchema)`.
- `RegulariserPatientDto implements RegulariserPatientInput` décoré
  `@UseZodSchema(RegulariserPatientSchema)`.

### 1.7 Repository

Fichier : `src/modules/patient/repositories/patient.repository.ts`

- `createProvisionalPatient(data: CreateProvisionalPatientInput)` :
  - pas de vérification stricte de doublon (les champs uniques n'existent
    pas encore) ;
  - recherche floue non bloquante via `nom`/`prenom`/`dateNaissance`
    (réutiliser la même logique `ILike` que `findPatient`) → retourner un
    tableau `possibleMatches` **en plus** du patient créé, pour affichage
    côté staff ("attention, un patient similaire existe déjà") ;
  - `numeroDossier = PatientIdGenerated(data.identity.nom, true)` ;
  - `statutDossier = "PROVISOIRE"`, `dateLimiteRegularisation = now +
    délai` (délai lu depuis une variable d'env, ex. `PROVISIONAL_DOSSIER_DELAY_HOURS`,
    défaut 48) ;
  - `save`.

- `regulariserPatient(data: RegulariserPatientInput)` :
  - retrouver le dossier par `id` + `numeroDossier` **et**
    `statutDossier: "PROVISOIRE"` (sinon 404/erreur "déjà régularisé") ;
  - appliquer la vérification stricte de doublon comme `createNewPatient`
    (numSecuSocial, numIdentityNational, numeroPassport, numCMU) ;
    - si doublon trouvé → **ne pas écraser silencieusement** : retourner un
      statut dédié (ex. `{ possibleDuplicate: true, existingPatient }`) pour
      que le service déclenche le flux de fusion (§3) plutôt que de créer un
      conflit de données ;
  - sinon : merge des données saisies, `statutDossier = "DEFINITIF"`,
    `regulariseAt = now`, `regularisePar = data.updatedBy`, `save`.

- `findExpiredProvisionalDossiers()` : `statutDossier = "PROVISOIRE" AND
  dateLimiteRegularisation < now`, triés par ancienneté — alimente le futur
  tableau de bord "dossiers en retard".

### 1.8 Service

Fichier : `src/modules/patient/services/patient.service.ts`

- `createProvisionalPatient(data, files)` : suit le même pattern que
  `createPatient` (gestion des pièces jointes ArchivDossier réutilisable
  telle quelle pour la photo d'identification si besoin).
- `regulariserPatient(data)` : gère les deux cas retour du repository
  (succès → dossier `DEFINITIF` ; doublon détecté → exception dédiée
  `MESSAGE_ERROR.PATIENT_POSSIBLE_DUPLICATE` invitant à passer par la fusion).
- `findProvisionalDossiers(query)` : liste/filtre pour le dashboard (par
  service, par motif, en retard ou non).

Ajouter dans `src/helpers/messageError.ts` :
```ts

PATIENT_POSSIBLE_DUPLICATE: {
  MESSAGE: "un patient correspondant existe déjà, une fusion est nécessaire avant régularisation.",
  CODE: "PATIENT_POSSIBLE_DUPLICATE"
},

DOSSIER_NOT_PROVISIONAL: {
  MESSAGE: "ce dossier n'est pas un dossier provisoire ou a déjà été régularisé.",
  CODE: "DOSSIER_NOT_PROVISIONAL"
},
```

### 1.9 Controller / Endpoints

Fichier : `src/modules/patient/controllers/patient.controller.ts`

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/patient/urgence` | Création d'un dossier provisoire (payload minimal, `@UsePatientFile("signalementPhoto")` optionnel) |
| `PUT` | `/patient/urgence/regulariser` | Complète un dossier provisoire → `DEFINITIF` |
| `GET` | `/patient/urgence` | Liste/recherche des dossiers provisoires (filtrable par `enRetard=true`) |

> Note : étendre aussi `SearchPatientSchema` avec un filtre optionnel
> `statutDossier` pour que la recherche générale (`GET /patient/search`)
> puisse elle aussi inclure/exclure les dossiers provisoires.

### 1.10 Sécurité / dépendances

Le service n'a **aucun guard d'authentification actuellement** (pas de
`@nestjs/passport`/JWT trouvé dans le repo). `createdBy`/`regularisePar` sont
donc pour l'instant fournis "en confiance" par le body de la requête. À noter
comme dépendance externe : dès qu'un service d'authentification centralisé
existera, brancher un `AuthGuard` sur ces routes pour que `createdBy` vienne
du token et non du payload client.

### 1.11 Suivi des dossiers en retard (amélioration future, non bloquante)

`@nestjs/schedule` n'est pas installé dans ce service. Une tâche cron
(`findExpiredProvisionalDossiers` exécutée périodiquement + notification)
est une amélioration naturelle mais nécessite d'ajouter la dépendance — à
faire dans un second temps, ne pas bloquer la v1 de la fonctionnalité
dessus. Pour la v1, l'endpoint `GET /patient/urgence?enRetard=true` suffit
pour un contrôle manuel par le personnel.

### 1.12 Résumé des fichiers impactés

- `entities/patient.entity.ts` — nouvelles colonnes, `email`/`numero` nullable
- `helpers/func/uniquePatientIdGenerated.ts` — préfixe `URG`
- `helpers/messageError.ts` — nouveaux messages
- `validator/patient.validator.ts` — 2 nouveaux schémas
- `dto/patient.dto.ts` — 2 nouveaux DTO
- `repositories/patient.repository.ts` — 3 nouvelles méthodes
- `services/patient.service.ts` — 3 nouvelles méthodes
- `controllers/patient.controller.ts` — 3 nouvelles routes
- (optionnel) `validator/patient.validator.ts` → ajouter `statutDossier` à `SearchPatientSchema`

---

## 2. 🟡 Fusion de dossiers patients (`fusionPatient`)

### 2.1 Contexte et déclencheurs

Un stub vide existe déjà : `patient.service.ts:200` `async fusionPatient(){}`.
La fusion est déclenchée dans deux situations, toutes les deux se terminant
par le même appel générique :

1. **Régularisation d'un dossier provisoire** (§1.8) : `regularisationPatient`
   détecte un doublon strict (numSecuSocial/numIdentityNational/numeroPassport/
   numCMU) et renvoie `{ exist: true, existingPatient }`. Le service lève déjà
   `PATIENT_POSSIBLE_DUPLICATE` avec `existingPatient` en métadonnée
   (`patient.service.ts:110-117`). Le front-end/staff dispose alors de l'id du
   dossier provisoire en cours de régularisation (`patientSourceId`) et de
   l'id du dossier existant (`patientTargetId` = `existingPatient.id`).
2. **Alerte de similarité détectée par le scan automatique** (§3) : deux
   dossiers (provisoires ou définitifs) sont signalés comme probablement
   identiques ; le staff consulte l'alerte et décide manuellement lequel des
   deux devient le dossier maître.

Dans les deux cas, **la décision de qui absorbe qui reste toujours humaine** :
l'algorithme ne sait pas quel dossier est le plus complet/fiable, il ne fait
que proposer un rapprochement.

### 2.2 Règles métier

1. Le dossier **cible** (`patientTargetId`, généralement le dossier
   `DEFINITIF` existant) reste l'identité maître : son `id` et son
   `uniquePatientId` ne changent jamais suite à une fusion.
2. Le dossier **source** (`patientSourceId`, généralement le provisoire) est
   **absorbé** : ses champs non renseignés sur la cible viennent la
   compléter, puis il est *soft-delete* — jamais supprimé physiquement,
   conformément à `DeleteDateColumn` déjà en place sur `Patient`.
   
3. **Aucune perte de données** : avant toute modification, un instantané
   complet des deux dossiers (avant/après) est conservé dans une table
   d'audit dédiée à la fusion (`PatientMergeLog`), en plus de l'historique
   générique `PatientHistory` déjà alimenté automatiquement par
   `PatientSubscriber` sur la mise à jour de la cible et la suppression douce
   de la source (aucun changement requis côté subscriber).
4. **Règle de fusion des champs** : pour chaque champ fusionnable, la valeur
   de la cible est conservée si elle est renseignée ; sinon on prend celle de
   la source. Le staff peut **surcharger explicitement** certains champs via
   `champsAConserver` dans la requête (utile quand la régularisation vient de
   saisir des informations plus fiables que celles déjà présentes sur la
   cible — dans ce cas les valeurs saisies lors de la régularisation doivent
   être passées en `champsAConserver`, pas silencieusement écrasées par la
   règle par défaut).
5. Les `ArchivDossier` liés à la source doivent être **ré-attachés** à la
   cible (relation `patient` + colonne dénormalisée `dossierId`) : aucun
   document ne doit devenir orphelin ou rester attaché à un dossier
   supprimé.
6. Le dossier source garde la trace de son absorption via un nouveau champ
   `mergedIntoPatientId` (rempli avant le soft delete), afin qu'une recherche
   ultérieure sur son ancien `uniquePatientId` (ex. un `URG-...` encore
   utilisé par un autre service via un ancien lien) puisse retrouver le
   dossier définitif actuel plutôt que de renvoyer un 404 silencieux.
7. Toute l'opération (update cible, reattachement des `ArchivDossier`, soft
   delete source, insertion `PatientMergeLog`) doit être **atomique** — elle
   touche 3 entités différentes, une transaction est obligatoire.
8. Un dossier déjà fusionné (`mergedIntoPatientId` non nul) ne peut plus
   servir de `patientSourceId` ni de `patientTargetId` dans une nouvelle
   fusion (sécurité contre les fusions en chaîne mal maîtrisées) ; en
   revanche un dossier peut être `patientTargetId` de plusieurs fusions
   successives (cas de 3+ doublons du même patient).

### 2.3 Modèle de données

**Nouveau champ sur `Patient`** (`entities/patient.entity.ts`) :

| Champ | Type | Nullable | Notes |
|---|---|---|---|
| `mergedIntoPatientId` | uuid | oui | renseigné uniquement sur un dossier absorbé, pointe vers `Patient.id` de la cible |

**Nouvelle entité** `entities/patientMergeLog.entity.ts` :

| Champ | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `sourcePatientId` | uuid | id technique du dossier absorbé |
| `sourceNumeroDossier` | varchar | `uniquePatientId` de la source, pour lisibilité humaine (cohérent avec `PatientHistory.patientId`) |
| `targetPatientId` | uuid | id technique du dossier conservé |
| `targetNumeroDossier` | varchar | `uniquePatientId` de la cible |
| `sourceSnapshot` | jsonb | photo complète de la source juste avant fusion (via `toEntitySnapshot`, déjà utilisé par `PatientSubscriber`) |
| `targetSnapshotBefore` | jsonb | photo de la cible avant fusion |
| `targetSnapshotAfter` | jsonb | photo de la cible après fusion |
| `archivDossierMovedIds` | jsonb | liste des `id` d'`ArchivDossier` ré-attachés |
| `motifFusion` | enum `"DOUBLON_REGULARISATION" \| "DOUBLON_DETECTE_SIMILARITE" \| "DOUBLON_MANUEL"` | origine de la fusion, utile pour distinguer une fusion issue de §1/§2.1-1 vs §3 |
| `mergedBy` | uuid | utilisateur/staff ayant validé la fusion |
| `mergedAt` | `@CreateDateColumn()` | |

Pourquoi une table dédiée plutôt que de tout faire porter par
`PatientHistory` : une fusion est une opération **cross-entité** (deux
patients + des documents) alors que `PatientHistory` est conçu pour
l'historique d'un seul dossier. Les deux coexistent sans redondance néfaste :
`PatientHistory` capture le "quoi a changé sur la cible/la source" au niveau
champ, `PatientMergeLog` capture le "pourquoi/qui/quels documents déplacés"
au niveau métier.

### 2.4 Validation Zod

Fichier : `src/modules/patient/validator/patient.validator.ts`

```ts
export const FusionPatientSchema = z.object({
  patientSourceId: z.uuid("Identifiant du dossier source invalide"),
  patientTargetId: z.uuid("Identifiant du dossier cible invalide"),
  mergedBy: z.uuid("Identifiant de la personne qui valide la fusion invalide"),
  motifFusion: z
    .enum(["DOUBLON_REGULARISATION", "DOUBLON_DETECTE_SIMILARITE", "DOUBLON_MANUEL"])
    .default("DOUBLON_MANUEL"),
  // valeurs explicitement choisies par le staff, prioritaires sur la règle
  // par défaut "on garde la valeur de la cible si elle existe"
  champsAConserver: CreatePatientSchema
    .pick({ identity: true, famille: true, contact: true, uniqueIdentity: true })
    .partial()
    .optional(),
}).refine((data) => data.patientSourceId !== data.patientTargetId, {
  message: "le dossier source et le dossier cible ne peuvent pas être identiques",
  path: ["patientTargetId"],
});

export type FusionPatientInput = z.infer<typeof FusionPatientSchema>;
```

### 2.5 DTO

Fichier : `src/modules/patient/dto/patient.dto.ts`

`FusionPatientDto implements FusionPatientInput`, décoré
`@UseZodSchema(FusionPatientSchema)`, suivant le même pattern que les DTO
existants.

### 2.6 Repository

Fichier : `src/modules/patient/repositories/patient.repository.ts`

`fusionPatient(data: FusionPatientInput)` — utilise `dataSource.transaction`
(injecter `DataSource` dans le repository, déjà disponible via le
constructeur) :

1. Charger `source` et `target` par `id` (avec `withDeleted: false` implicite).
   - Si l'un des deux est introuvable → retour discriminé `{ sourceNotFound:
     true }` / `{ targetNotFound: true }`.
   - Si `source.mergedIntoPatientId` ou `target.mergedIntoPatientId` déjà
     renseigné → retour `{ alreadyMerged: true, patient }`.
2. Snapshots `sourceSnapshot` / `targetSnapshotBefore` via `toEntitySnapshot`
   (déjà utilisé par `PatientSubscriber`, réutilisable tel quel).
3. Construire l'objet de merge champ par champ :
   `valeur = champsAConserver?.section?.champ ?? target.champ ??
   source.champ` (dans cet ordre de priorité, cf. règle 2.2.4). Champs
   concernés : `nom, prenom, age, genre, dateNaissance, lieuNaissance,
   nomPere, nomMere, tuteur, numeroPere, numeroMere, numeroTuteur, email,
   numero, numeroSecondaire, contactUrgence, numSecuSocial,
   numIdentityNational, numeroPassport, numCMU`.
4. `this.merge(target, mergedFields)` puis `save` → déclenche
   `PatientSubscriber.afterUpdate` automatiquement (aucun changement requis).
5. Ré-attacher les `ArchivDossier` de la source :
   `archivDossierRepository.update({ patient: { id: source.id } }, { patient:
   target, dossierId: target.id })`, dans la **même transaction** (passer le
   `queryRunner`/`EntityManager` transactionnel à cette étape plutôt que
   d'utiliser le repository injecté globalement).
6. `source.mergedIntoPatientId = target.id` puis `softDelete` de la source
   (dans la transaction) → déclenche `PatientSubscriber.afterSoftRemove`
   automatiquement.
7. Insérer `PatientMergeLog` avec les deux snapshots + `targetSnapshotAfter`
   (recalculé après l'étape 4) + la liste des `ArchivDossier.id` déplacés.
8. Retourner `{ target: patientFusionné, mergeLog }`.

### 2.7 Service

Fichier : `src/modules/patient/services/patient.service.ts`

`fusionPatient(data: FusionPatientInput)` remplace le stub actuel : appelle
le repository, transforme chaque retour discriminé en `HttpException` dédiée
(cf. §2.8 nouveaux messages), sinon retourne le résultat.

Ajouter dans `src/helpers/messageError.ts` :

```ts
PATIENT_MERGE_SOURCE_NOT_FOUND: {
  MESSAGE: "le dossier source de la fusion est introuvable.",
  CODE: "PATIENT_MERGE_SOURCE_NOT_FOUND"
},
PATIENT_MERGE_TARGET_NOT_FOUND: {
  MESSAGE: "le dossier cible de la fusion est introuvable.",
  CODE: "PATIENT_MERGE_TARGET_NOT_FOUND"
},
PATIENT_ALREADY_MERGED: {
  MESSAGE: "ce dossier a déjà été fusionné dans un autre dossier.",
  CODE: "PATIENT_ALREADY_MERGED"
},
```

### 2.8 Controller / Endpoint

Fichier : `src/modules/patient/controllers/patient.controller.ts`

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/patient/fusion` | Fusionne `patientSourceId` dans `patientTargetId`, avec trace d'audit complète |

### 2.9 Lien avec la régularisation (§1.8)

`regularisePatient` continue de **seulement lever** `PATIENT_POSSIBLE_DUPLICATE`
(ne déclenche jamais de fusion automatique — la fusion reste un acte humain
distinct). Le staff, en recevant cette erreur avec `existingPatient` en
métadonnée, appelle ensuite `POST /patient/fusion` avec :
- `patientSourceId` = id du dossier provisoire qu'il tentait de régulariser,
- `patientTargetId` = `existingPatient.id`,
- `champsAConserver` = les données qu'il venait de saisir dans le formulaire
  de régularisation (pour ne pas les perdre au profit des anciennes données
  de la cible),
- `motifFusion` = `"DOUBLON_REGULARISATION"`.

### 2.10 Résumé des fichiers impactés

- `entities/patient.entity.ts` — nouveau champ `mergedIntoPatientId`
- `entities/patientMergeLog.entity.ts` — nouvelle entité
- `helpers/messageError.ts` — nouveaux messages
- `validator/patient.validator.ts` — nouveau schéma `FusionPatientSchema`
- `dto/patient.dto.ts` — nouveau DTO `FusionPatientDto`
- `repositories/patient.repository.ts` — méthode `fusionPatient` (transaction)
- `services/patient.service.ts` — implémentation de `fusionPatient` (stub existant)
- `controllers/patient.controller.ts` — route `POST /patient/fusion`
- `patient.module.ts` — enregistrer `PatientMergeLog` dans `DatabaseModule.forRoot([...])`

---

## 3. 🟡 Détection automatique de doublons par similarité (cron + alertes)

### 3.1 Contexte et objectif

Complément proactif de la fusion (§2) : au lieu d'attendre qu'un doublon soit
découvert au moment d'une régularisation (§1.4), une tâche planifiée scanne
**tous les dossiers actifs** (provisoires et définitifs) en arrière-plan pour
détecter des paires de patients probablement identiques, même quand aucune
régularisation n'est en cours (ex. deux créations `createPatient` classiques
pour la même personne, orthographiée légèrement différemment). Le résultat
est stocké comme une **alerte consultable par le personnel**, qui décide
ensuite de fusionner (§2), d'ignorer, ou de marquer faux positif.

Ceci répond directement au besoin exprimé : *"un cron automatique qui scan
en arrière-plan chaque patient pour détecter les scores de similarité très
proches entre deux patients et leur donne le résultat, un peu comme des
notifications"*.

### 3.2 Dépendance : `@nestjs/schedule`

Comme noté en §1.11, `@nestjs/schedule` n'est pas installé. C'est le moment
de l'ajouter : `pnpm add @nestjs/schedule --filter @org/Patient-Identity-Service`
puis `ScheduleModule.forRoot()` dans les `imports` de `patient.module.ts`.

### 3.3 Stratégie de performance (blocking)

Comparer **chaque patient à chaque autre** (O(n²)) n'est pas raisonnable dès
que la table grossit. On applique une stratégie de *blocking* : on ne compare
deux dossiers que s'ils partagent au moins une **clé de rapprochement
grossière**, calculée en SQL directement (pas en boucle JS) :

- même `dateNaissance` exacte, **ou**
- mêmes 3 premières lettres de `nom` (insensible à la casse), **ou**
- même `numero` ou `email` exact (déjà quasi-certain, mais on laisse le score
  le confirmer plutôt que de court-circuiter).

Implémentation via `QueryBuilder` (`patientRepository.createQueryBuilder`) —
auto-jointure `Patient a JOIN Patient b ON a.id < b.id` (évite les doublons
symétriques et les paires avec soi-même), filtrée par les conditions
ci-dessus, en excluant :
- les dossiers `deletedAt IS NOT NULL` (déjà fusionnés/supprimés),
- les paires ayant déjà une ligne dans `PatientSimilarityAlert` (déjà
  traitées, quel que soit leur statut — cf. §3.9 pour la nuance sur le
  re-scan),

et paginée par lots (`take`/`skip`, ex. 500 paires par exécution) pour ne
jamais charger toute la base en mémoire d'un coup.

### 3.4 Algorithme de scoring de similarité

Pour chaque paire candidate remontée par le blocking, calcul d'un score
pondéré 0-100 en JS (pas besoin d'extension Postgres type `pg_trgm` pour la
v1, mais à envisager plus tard si la volumétrie l'exige) :

| Champ comparé | Méthode | Poids |
|---|---|---|
| `nom` | ratio de similarité de chaînes (Levenshtein normalisé, ex. lib `fastest-levenshtein` déjà légère) | 25 |
| `prenom` | idem | 25 |
| `dateNaissance` | égalité exacte → 100, sinon 0 | 30 |
| `genre` | égalité exacte → 100, sinon 0 | 5 |
| `email` **ou** `numero` | égalité exacte sur au moins un des deux → 100, sinon 0 | 15 |

**Règles de calcul** :
- Un champ est exclu du calcul (numérateur **et** dénominateur des poids) si
  l'une des deux fiches ne le renseigne pas (fréquent pour un dossier
  `PROVISOIRE` avec des champs vides) — on ne pénalise jamais un dossier
  provisoire incomplet, on compare seulement ce qui est comparable des deux
  côtés.
- Si **moins de 2 champs comparables** sont disponibles sur les deux fiches,
  la paire est ignorée (pas assez d'information pour juger).
- `score = 100 * Σ(poids_i × score_i) / Σ(poids_i)` sur les champs
  comparables uniquement.
- Seuil de flag : `score >= 75` → alerte créée. On distingue un niveau
  `"FORTE"` (`score >= 90`) d'un niveau `"MODEREE"` (`75 <= score < 90`) pour
  aider le personnel à prioriser sa file d'attente.

### 3.5 Modèle de données

Nouvelle entité `entities/patientSimilarityAlert.entity.ts` :

| Champ | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | |
| `patientAId` | uuid | toujours le plus petit des deux `id` (ordre stable, évite les doublons (A,B)/(B,A)) |
| `patientBId` | uuid | |
| `numeroDossierA` / `numeroDossierB` | varchar | `uniquePatientId` des deux, pour affichage direct sans jointure |
| `score` | integer | 0-100 |
| `niveau` | enum `"MODEREE" \| "FORTE"` | dérivé du score, stocké pour filtrage rapide |
| `matchedFields` | jsonb | détail par champ, ex. `{ nom: 92, prenom: 100, dateNaissance: 100 }`, utile pour que le staff comprenne *pourquoi* l'alerte existe |
| `status` | enum `"EN_ATTENTE" \| "CONFIRMEE_FUSION" \| "IGNOREE" \| "FAUX_POSITIF"` | défaut `"EN_ATTENTE"` |
| `detectedAt` | `@CreateDateColumn()` | |
| `reviewedAt` | timestamp, nullable | |
| `reviewedBy` | uuid, nullable | |

Contrainte unique composite `(patientAId, patientBId)` — le scan fait un
*upsert* (met à jour `score`/`matchedFields`/`detectedAt` si une exécution
suivante retrouve une paire déjà en `EN_ATTENTE`, mais n'écrase jamais une
paire déjà `CONFIRMEE_FUSION`/`IGNOREE`/`FAUX_POSITIF` — la décision humaine
est définitive tant qu'elle n'est pas explicitement rouverte).

### 3.6 Le job cron

Nouveau fichier `services/patientSimilarity.service.ts` :

```ts
@Injectable()
export class PatientSimilarityService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly similarityAlertRepository: PatientSimilarityAlertRepository,
  ) {}

  @Cron(process.env.PATIENT_SIMILARITY_CRON || CronExpression.EVERY_DAY_AT_2AM)
  async scanForDuplicates() {
    // 1. récupérer les paires candidates via blocking SQL (§3.3), par lots
    // 2. pour chaque paire, calculer le score (§3.4)
    // 3. si score >= 75, upsert PatientSimilarityAlert (§3.5)
  }
}
```

Le cron expression est lue depuis l'env (`PATIENT_SIMILARITY_CRON`), pour
pouvoir la resserrer en environnement de test/démo sans redéployer du code.
Par défaut, une exécution quotidienne nocturne (2h) — un scan de doublons
n'est pas une opération urgente seconde-par-seconde, contrairement à la
création/régularisation qui reste, elle, instantanée.

Nouveau repository `repositories/patientSimilarityAlert.repository.ts` :
- `findCandidatePairs(batchSize, offset)` — la requête de blocking (§3.3).
- `upsertAlert(data)` — insère ou met à jour selon la règle ci-dessus.
- `findAlerts(query)` — liste filtrable par `status`/`niveau`, triée par
  `score DESC`.
- `reviewAlert(id, decision, reviewedBy)` — met à jour `status`, `reviewedAt`,
  `reviewedBy`.

### 3.7 Validation / DTO / Endpoints

Fichier : `src/modules/patient/validator/patient.validator.ts`

```ts
export const SearchSimilarityAlertSchema = z.object({
  status: z.enum(["EN_ATTENTE", "CONFIRMEE_FUSION", "IGNOREE", "FAUX_POSITIF"]).optional(),
  niveau: z.enum(["MODEREE", "FORTE"]).optional(),
  page: z.coerce.number().positive().int().default(1),
  limit: z.coerce.number().int().min(5).max(50).default(10),
});

export const ReviewSimilarityAlertSchema = z.object({
  alertId: z.uuid(),
  decision: z.enum(["IGNORER", "FAUX_POSITIF"]),
  reviewedBy: z.uuid(),
});
```

> Notez que `decision` n'inclut **pas** `"FUSION"` directement : confirmer une
> fusion revient à appeler `POST /patient/fusion` (§2.8) avec `motifFusion:
> "DOUBLON_DETECTE_SIMILARITE"` — c'est cet appel qui, en interne, doit aussi
> marquer l'alerte correspondante `CONFIRMEE_FUSION` (le repository de
> fusion, §2.6, prend alors en paramètre optionnel l'`alertId` d'origine s'il
> existe, pour la faire passer à `CONFIRMEE_FUSION` dans la même transaction).

Fichier : nouveau `src/modules/patient/controllers/patientSimilarity.controller.ts`
(contrôleur séparé — ressource distincte du dossier patient lui-même) :

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/patient/similarite` | Liste des alertes ("notifications"), filtrable par `status`/`niveau`, triée par score décroissant |
| `PUT` | `/patient/similarite/decision` | Le staff marque une alerte `IGNOREE` ou `FAUX_POSITIF` |

### 3.8 Lien avec la fusion (§2)

`POST /patient/fusion` (§2.8) accepte un champ optionnel `alertId` dans son
schéma (`FusionPatientSchema`) : s'il est fourni, la transaction de fusion
(§2.6) fait aussi passer `PatientSimilarityAlert.status =
"CONFIRMEE_FUSION"` + `reviewedAt`/`reviewedBy` en une seule opération
atomique — pas d'étape manuelle supplémentaire pour le staff qui a cliqué
depuis la liste d'alertes.

### 3.9 Limites de la v1 / améliorations futures

- **Pas de notification push réelle** (email/SMS/Slack) en v1 — même choix
  que pour les dossiers en retard (§1.11) : pas d'infrastructure de
  notification centralisée dans le repo actuellement (aucun
  `@nestjs/event-emitter`, pas de service de messagerie). La "notification"
  v1 est **consultable via `GET /patient/similarite`**, à charge du
  front-end de l'afficher comme un badge/compteur pour le personnel. Le jour
  où un service de notification centralisé existera, il suffira de
  publier un événement à la fin de `scanForDuplicates()` plutôt que de tout
  redessiner.
- **Pas de rouverture automatique** des alertes `IGNOREE`/`FAUX_POSITIF` même
  si un scan ultérieur retrouve un score plus élevé — à réévaluer si ça pose
  un problème en pratique (le personnel pourrait vouloir qu'un score qui
  grimpe fortement rouvre le dossier).
- **Scoring déterministe simple** (pondération fixe) plutôt qu'un modèle
  probabiliste/ML — suffisant pour un MPI hospitalier de taille modérée ;
  à réévaluer seulement si le taux de faux positifs/négatifs observé en
  production le justifie.

### 3.10 Résumé des fichiers impactés

- `package.json` (Patient-Identity-Service) — ajout `@nestjs/schedule`
- `patient.module.ts` — `ScheduleModule.forRoot()`, enregistrement de
  `PatientSimilarityAlert` dans `DatabaseModule.forRoot([...])`, nouveaux
  providers/controller
- `entities/patientSimilarityAlert.entity.ts` — nouvelle entité
- `repositories/patientSimilarityAlert.repository.ts` — nouveau repository
- `services/patientSimilarity.service.ts` — nouveau service + `@Cron`
- `validator/patient.validator.ts` — 2 nouveaux schémas
- `dto/patient.dto.ts` — 2 nouveaux DTO
- `controllers/patientSimilarity.controller.ts` — nouveau contrôleur, 2 routes
- `validator/patient.validator.ts` (`FusionPatientSchema`, §2.4) — ajout du
  champ optionnel `alertId`
- `repositories/patient.repository.ts` (`fusionPatient`, §2.6) — prise en
  compte de `alertId` dans la même transaction

---

## 4. 🟡 Emplacement réservé — prochaines fonctionnalités

*(Section à compléter au fil des demandes suivantes — toute nouvelle
fonctionnalité discutée sera ajoutée ici avec la même structure : contexte,
règles métier, modèle de données, validation, repository/service/controller,
fichiers impactés.)*

---

# Plan d'implémentation — Détection de doublons par similarité (cron)

Document de suivi technique pour la fonctionnalité §3 de
`plan_fonctionnalites_patient_identity.md` (racine du repo), centré
uniquement sur le scan automatique de similarité et ses alertes. Portée :
`Patient-Identity-Service` uniquement.

> Statut : 🟡 à faire · 🟢 fait · 🔵 en cours

---

## 0. Vue d'ensemble

Un job planifié (`@Cron`) scanne périodiquement les dossiers `Patient`
actifs (non supprimés, `PROVISOIRE` ou `DEFINITIF`), détecte les paires
probablement identiques via un algorithme de scoring pondéré, et stocke le
résultat dans `PatientSimilarityAlert` pour revue humaine. Aucune fusion
n'est automatique : le cron **propose**, le personnel **décide**.

## 1. 🟢 Entité `PatientSimilarityAlert`

Fichier : `src/modules/patient/entities/patientSimilarityAlert.entity.ts`

Créée. Une ligne = une paire `(patientAId, patientBId)` (contrainte unique
composite, `patientAId` toujours le plus petit `id` des deux pour éviter les
doublons symétriques), avec `score`, `niveau` (`MODEREE`/`FORTE`),
`matchedFields` (jsonb, détail par champ) et `status`
(`EN_ATTENTE`/`CONFIRMEE_FUSION`/`IGNOREE`/`FAUX_POSITIF`).

Reste à faire, hors scope de ce document mais nécessaire avant que l'entité
soit utilisable :
- l'enregistrer dans `DatabaseModule.forRoot([...])` (`patient.module.ts`),
  en même temps que `PatientMergeLog` (déjà créée mais pas encore
  enregistrée non plus).

## 2. 🟡 Dépendances

- `@nestjs/schedule` : déjà présent dans `package.json` racine (workspace) et
  déjà importé/`forRoot()`-é dans `patient.module.ts`. Rien à faire ici.
- Lib de similarité de chaînes pour le scoring `nom`/`prenom` : à ajouter,
  ex. `fastest-levenshtein` (légère, sans dépendance native) —
  `pnpm add fastest-levenshtein --filter Patient-Identity-Service`.

## 3. 🟡 Stratégie de blocking (candidats de paires)

Comparer chaque patient à chaque autre est O(n²) — inutilisable dès que la
table grossit. On ne compare deux dossiers que s'ils partagent une clé de
rapprochement grossière, calculée en SQL (pas en boucle JS) :

- même `dateNaissance` exacte, **ou**
- mêmes 3 premières lettres de `nom` (insensible à la casse), **ou**
- même `numero` ou `email` exact.

Implémentation : auto-jointure `Patient a JOIN Patient b ON a.id < b.id` via
`patientRepository.createQueryBuilder`, filtrée par les conditions
ci-dessus, en excluant :
- les dossiers avec `deletedAt IS NOT NULL`,
- les paires déjà présentes dans `PatientSimilarityAlert` (quel que soit le
  `status` — cf. §6 pour la nuance sur le re-scan),

paginée par lots (`take`/`skip`, ex. 500 paires par exécution) pour ne
jamais charger toute la base en mémoire.

Fichier : `repositories/patientSimilarityAlert.repository.ts` (à créer) —
méthode `findCandidatePairs(batchSize, offset)`.

## 4. 🟡 Algorithme de scoring

Pour chaque paire candidate, score pondéré 0-100 calculé en JS :

| Champ comparé | Méthode | Poids |
|---|---|---|
| `nom` | ratio de similarité (Levenshtein normalisé) | 25 |
| `prenom` | idem | 25 |
| `dateNaissance` | égalité exacte → 100, sinon 0 | 30 |
| `genre` | égalité exacte → 100, sinon 0 | 5 |
| `email` **ou** `numero` | égalité exacte sur au moins un des deux → 100, sinon 0 | 15 |

Règles :
- Un champ est exclu du calcul (numérateur **et** dénominateur) si l'une des
  deux fiches ne le renseigne pas — ne jamais pénaliser un dossier
  `PROVISOIRE` incomplet, on ne compare que ce qui est comparable des deux
  côtés.
- Si moins de 2 champs comparables sont disponibles, la paire est ignorée.
- `score = 100 * Σ(poids_i × score_i) / Σ(poids_i)` sur les champs
  comparables uniquement.
- Seuil de flag : `score >= 75` → alerte créée. `niveau = "FORTE"` si
  `score >= 90`, sinon `"MODEREE"`.

Fichier : `services/patientSimilarity.service.ts` (à créer) — fonction pure
`computeSimilarityScore(a: Patient, b: Patient): { score: number; matchedFields: Record<string, number> } | null`
(retourne `null` si moins de 2 champs comparables), testable indépendamment
du cron.

## 5. 🟡 Le job cron

Fichier : `services/patientSimilarity.service.ts`

```ts
@Injectable()
export class PatientSimilarityService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly similarityAlertRepository: PatientSimilarityAlertRepository,
  ) {}

  @Cron(process.env.PATIENT_SIMILARITY_CRON || CronExpression.EVERY_DAY_AT_2AM)
  async scanForDuplicates() {
    // 1. récupérer les paires candidates via blocking SQL (§3), par lots
    // 2. pour chaque paire, calculer le score (§4)
    // 3. si score >= 75, upsert PatientSimilarityAlert (§6)
  }
}
```

Expression cron lue depuis `PATIENT_SIMILARITY_CRON` (env), pour pouvoir la
resserrer en test/démo sans redéployer. Défaut : quotidien à 2h — pas une
opération urgente seconde-par-seconde, contrairement à la
création/régularisation de dossier.

## 6. 🟡 Règle d'upsert des alertes

`upsertAlert(data)` dans `patientSimilarityAlert.repository.ts` :
- si aucune ligne `(patientAId, patientBId)` n'existe → insertion ;
- si une ligne existe avec `status = "EN_ATTENTE"` → mise à jour de
  `score`/`matchedFields`/`detectedAt` (le scan suivant peut affiner le
  score) ;
- si une ligne existe avec `status` dans
  `["CONFIRMEE_FUSION", "IGNOREE", "FAUX_POSITIF"]` → **ne jamais écraser** :
  la décision humaine est définitive tant qu'elle n'est pas explicitement
  rouverte (pas de rouverture automatique en v1, cf. §8).

## 7. 🟡 Validation / DTO / Endpoints de consultation

Fichier : `validator/patient.validator.ts`

```ts
export const SearchSimilarityAlertSchema = z.object({
  status: z.enum(["EN_ATTENTE", "CONFIRMEE_FUSION", "IGNOREE", "FAUX_POSITIF"]).optional(),
  niveau: z.enum(["MODEREE", "FORTE"]).optional(),
  page: z.coerce.number().positive().int().default(1),
  limit: z.coerce.number().int().min(5).max(50).default(10),
});

export const ReviewSimilarityAlertSchema = z.object({
  alertId: z.uuid(),
  decision: z.enum(["IGNORER", "FAUX_POSITIF"]),
  reviewedBy: z.uuid(),
});
```

> `decision` n'inclut pas `"FUSION"` : confirmer une fusion passe par
> `POST /patient/fusion` (déjà spécifié en §2 du plan global) avec
> `motifFusion: "DOUBLON_DETECTE_SIMILARITE"` — c'est cet appel qui doit
> marquer l'alerte correspondante `CONFIRMEE_FUSION` dans la même
> transaction (paramètre optionnel `alertId` sur `FusionPatientSchema`, à
> ajouter quand `fusionPatient` sera implémenté).

Fichiers à créer :
- `dto/patient.dto.ts` — `SearchSimilarityAlertDto`, `ReviewSimilarityAlertDto`
  (`@UseZodSchema`, même pattern que les DTO existants).
- `controllers/patientSimilarity.controller.ts` — contrôleur séparé
  (ressource distincte du dossier patient) :

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/patient/similarite` | Liste des alertes, filtrable par `status`/`niveau`, triée par `score DESC` |
| `PUT` | `/patient/similarite/decision` | Le staff marque une alerte `IGNOREE` ou `FAUX_POSITIF` |

## 8. Limites de la v1 (assumées, non bloquantes)

- Pas de notification push réelle (email/SMS/Slack) — la "notification" v1
  est consultable via `GET /patient/similarite`, à charge du front de
  l'afficher comme badge/compteur.
- Pas de rouverture automatique des alertes `IGNOREE`/`FAUX_POSITIF` même si
  un scan ultérieur trouve un score plus élevé.
- Scoring déterministe simple (pondération fixe), pas de `pg_trgm` ni de
  modèle probabiliste — suffisant pour la volumétrie visée, à réévaluer
  seulement si le taux de faux positifs/négatifs observé le justifie.

## 9. Ordre d'implémentation suggéré

1. Enregistrer `PatientSimilarityAlert` (et `PatientMergeLog`) dans
   `patient.module.ts` (`DatabaseModule.forRoot([...])`).
2. `patientSimilarityAlert.repository.ts` : `findCandidatePairs`,
   `upsertAlert`, `findAlerts`, `reviewAlert`.
3. `computeSimilarityScore` (fonction pure, §4) — facile à tester isolément.
4. `PatientSimilarityService.scanForDuplicates` (§5) — branche blocking +
   scoring + upsert.
5. `SearchSimilarityAlertSchema`/`ReviewSimilarityAlertSchema` + DTO (§7).
6. `patientSimilarity.controller.ts` + enregistrement dans
   `patient.module.ts` (`controllers`, `providers`).
7. Vérifier manuellement : créer 2 patients quasi-identiques, forcer le
   cron (`PATIENT_SIMILARITY_CRON=* * * * *` en local ou appel direct de
   `scanForDuplicates()`), vérifier l'alerte via `GET /patient/similarite`.

## 10. Résumé des fichiers impactés

- `entities/patientSimilarityAlert.entity.ts` — 🟢 fait
- `patient.module.ts` — enregistrement entité + `PatientMergeLog`, nouveaux providers/controller
- `repositories/patientSimilarityAlert.repository.ts` — nouveau
- `services/patientSimilarity.service.ts` — nouveau, `@Cron`
- `validator/patient.validator.ts` — 2 nouveaux schémas
- `dto/patient.dto.ts` — 2 nouveaux DTO
- `controllers/patientSimilarity.controller.ts` — nouveau
- `package.json` (Patient-Identity-Service) — `fastest-levenshtein`

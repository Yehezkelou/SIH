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

Un stub vide existe déjà : `patient.service.ts:149` `async fusionPatient(){}`.
C'est le complément direct de la régularisation d'un dossier provisoire
(§1.8) quand un doublon est détecté : il faut pouvoir fusionner le dossier
provisoire (et ses `ArchivDossier` liés) dans le dossier définitif existant,
tout en conservant une trace d'audit de la fusion (qui, quand, quel dossier
absorbé). À concevoir en détail quand §1 sera implémenté, car les deux
fonctionnalités sont couplées.

---

## 3. 🟡 Emplacement réservé — prochaines fonctionnalités

*(Section à compléter au fil des demandes suivantes — toute nouvelle
fonctionnalité discutée sera ajoutée ici avec la même structure : contexte,
règles métier, modèle de données, validation, repository/service/controller,
fichiers impactés.)*

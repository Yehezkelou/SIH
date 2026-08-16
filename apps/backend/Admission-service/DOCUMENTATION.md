# Documentation - Admission-service

# Plan d'implémentation — Admission-service

Document vivant listant les fonctionnalités à implémenter dans le
microservice `Admission-service`, avec pour chacune : le contexte métier,
les règles, et le détail technique (fichiers à créer/modifier), en suivant
les conventions déjà en place côté `Patient-Identity-Service` (NestJS,
TypeORM, Zod via `@UseZodSchema`, repository pattern, subscriber pour
l'audit trail) quand c'est pertinent.

Contexte métier de référence : `desc.txt` (workflow interne du service) et
`cahier_des_charges_admissions_consultation.md` (racine du repo, section
"Module: Admissions", schéma exhaustif de l'ancien système — sert de
référence champ par champ, pas de schéma à copier tel quel : le modèle a
déjà été redessiné et normalisé dans `src/modules/entities/`).

> Statut des fonctionnalités : 🟡 à faire · 🟢 fait · 🔵 en cours

---

## 0. État des lieux

### 0.1 Modèle de données — 🟢 fait (le "plan des tables")

Les entités TypeORM sont déjà créées dans `src/modules/entities/` :

| Entité | Fichier | Rôle |
|---|---|---|
| `Admission` | `admission.entity.ts` | dossier d'admission, relié au `patientId` (Patient-Identity-Service) |
| `Encounter` | `encounter.entity.ts` | séjour actif (1-1 avec `Admission`), position courante (département/chambre/lit) |
| `EncounterMovement` | `encounterMovement.entity.ts` | historique des déplacements d'un `Encounter` |
| `AdmissionCompanion` | `admissionCompanion.entity.ts` | accompagnant/contact du patient |
| `AdmissionDocument` | `admissionDocument.entity.ts` | pièce jointe (CNI, carte d'assurance...) |
| `AdmissionPayer` | `admissionPayer.entity.ts` | payeur (patient/assurance/entreprise), plusieurs possibles par admission |

Enums centralisés dans `entities/admission.enum.ts` (`AdmissionStatus`,
`AdmissionType`, `AdmissionDocumentType`, `AdmissionPayerType`,
`MovementType`, `EncounterStatus`), redéclarés en objets `as const` dans
`validator/admission.enum.ts` pour être consommés par Zod (`z.enum(...)`).

### 0.2 Câblage technique — 🟡 à faire (bloquant pour tout le reste)

`src/modules/app.module.ts` est **vide** (`@Module({})`). Rien n'est
enregistré : pas de `DatabaseModule.forRoot([...])`, pas de
`LoggerModuleGlobale`, pas de controller, pas de provider. Le service ne
démarre donc aucune route utilisable en l'état, même si
`createNewAdmission` existe déjà côté repository (§1).

À faire, à l'image de `Patient-Identity-Service/src/modules/patient/patient.module.ts` :
- `DatabaseModule.forRoot([Admission, Encounter, EncounterMovement, AdmissionCompanion, AdmissionDocument, AdmissionPayer, AdmissionHistory])` (alias `@org/database` disponible dans `tsconfig.base.json`, plus direct que le chemin relatif utilisé côté Patient-Identity-Service),
- `LoggerModuleGlobale.forRoot('AdmissionService')`,
- `APP_FILTER` (filtre d'exception dédié, cf. `patient.filter.ts`) et
  `APP_PIPE` (validation Zod globale, cf. `patient.pipe.ts`) — à répliquer
  ou factoriser dans un lib partagée si plusieurs services en ont besoin.

### 0.3 Points d'attention techniques (à corriger avant `synchronize`)

Plusieurs colonnes des entités existantes utilisent des `type` invalides
pour TypeORM/Postgres (`"string"` et `"number"` ne sont pas des types de
colonne reconnus — il faut `"varchar"` et `"numeric"`/`"float"`/`"int"`) :
- `admission.entity.ts` → `encounterId` (`type: "string"`)
- `admissionCompanion.entity.ts` → `firstName`, `lastName`, `phoneNumber`, `relationship`, `address`
- `admissionDocument.entity.ts` → `url`
- `admissionPayer.entity.ts` → `name`, `policyNumber`, `coveragePercentage`, `coverageLimit` (`"number"`)

Tant que ces colonnes ne sont pas corrigées, `synchronize: true` (actif en
dev, cf. `libs/database/src/lib/database.module.ts`) échouera au démarrage
dès que le module sera enregistré (§0.2). À corriger en même temps que le
câblage du module, avant toute autre fonctionnalité.

---

## 1. 🔵 Création d'une admission (enregistrement du patient)

### 1.1 Contexte métier

Cf. `desc.txt` étapes 1-5 : à l'arrivée du patient, on crée en une seule
opération le dossier `Admission`, son `Encounter` associé, et
optionnellement ses accompagnants, documents et payeurs.

### 1.2 État actuel

`repositories/admission.repository.ts` (classe `AdmissionService extends
Repository<Admission>` — nommage à clarifier, cf. §7) contient déjà
`createNewAdmission(data: CreateAdmissionInput)` :
- vérifie qu'aucune admission active n'existe déjà pour ce `patientId`
  (statuts dans `admit[]`) → sinon `HttpException 400`,
- transaction : crée `Admission` (statut `PENDING`), puis
  `AdmissionDocument[]`, `AdmissionPayer[]`, `AdmissionCompanion[]` si
  fournis, puis `Encounter` (statut `ENCOUNTER_PENDING`).

`validator/admission.validator.ts` contient déjà `CreateAdmissionSchema` /
`UpdateAdmissionSchema`.

### 1.3 Manque encore

- `encounterId` métier (readable, cf. `helpers/GeneratedUniqueEncounter.ts`
  → `GeneratedEncouterId()`) n'est **pas utilisé** dans
  `createNewAdmission` : ni assigné à `Admission.encounterId`, ni stocké
  sur `Encounter`. À décider : soit `Encounter` porte son propre numéro
  lisible, soit `Admission.encounterId` est peuplé après création de
  l'`Encounter` (actuellement `Admission.encounterId` reste toujours
  `undefined`).
- Pas de `DTO` (`dto/admission.dto.ts` à créer, `CreateAdmissionDto
  implements CreateAdmissionInput` décoré `@UseZodSchema(CreateAdmissionSchema)`,
  suivant le pattern `Patient-Identity-Service/src/modules/patient/dto/patient.dto.ts`).
- Pas de `service` séparé ni de `controller` — rien n'expose
  `createNewAdmission` en HTTP (cf. §7 et §9).
- Pas de vérification que `patientId` existe réellement côté
  `Patient-Identity-Service` (appel HTTP inter-service ou confiance
  aveugle au payload ? à trancher — actuellement aucune vérification).
- `admissionType` est `.optional()` dans `CreateAdmissionSchema` alors que
  l'entité le déclare `nullable: false` — à aligner (probablement rendre
  `admissionType` obligatoire côté Zod, une admission sans type n'a pas de
  sens métier).

### 1.4 Endpoint prévu

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission` | Crée une admission + encounter (+ companions/documents/payers optionnels) |

---

## 2. 🟡 Consultation / recherche des admissions

### 2.1 Contexte métier

Le personnel doit pouvoir retrouver une admission par id, par
`patientId` (admission active en cours), ou lister/filtrer par statut,
service, date.

### 2.2 État actuel

`findAdmission()` existe dans le repository mais est **vide** (stub).
`validator/admission.validator.ts` a un stub vide `admissionQuerySchema`.

### 2.3 À faire

- `admissionQuerySchema` (Zod) : filtres `patientId?`, `admissionStatus?`,
  `admissionType?`, `serviceId?` (si applicable), pagination
  `page`/`limit` (cf. pattern `SearchPatientSchema` côté
  Patient-Identity-Service).
- Repository :
  - `findAdmissionById(id)`,
  - `findActiveAdmissionByPatient(patientId)` (réutilise la même liste de
    statuts `admit[]` que `createNewAdmission`, à en extraire en constante
    partagée plutôt que de la dupliquer),
  - `findAdmissions(query)` (liste filtrée/paginée).
- Service + controller : exposer en lecture.

### 2.4 Endpoints prévus

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/admission/:id` | Détail d'une admission (avec `encounter`, `companions`, `documents`, `payers`) |
| `GET` | `/admission/patient/:patientId/active` | Admission active en cours pour un patient |
| `GET` | `/admission` | Liste/recherche filtrée |

---

## 3. 🟡 Déplacements du patient (Encounter Movements / transferts)

### 3.1 Contexte métier

Cf. `desc.txt` étape 3 : un patient hospitalisé change de
département/chambre/lit au cours de son séjour (ex. Urgences → Chambre →
Bloc Opératoire). Chaque changement doit être tracé (`EncounterMovement`)
et la position courante de l'`Encounter` mise à jour.

### 3.2 Règles métier

1. Un transfert ne peut être créé que sur un `Encounter` dont le statut
   n'est pas déjà `ENCOUNTER_DISCHARGED`/`ENCOUNTER_CLOSED`/`ENCOUNTER_CANCELLED`.
2. `fromDepartmentId`/`fromRoomId`/`fromBedId` sont dérivés automatiquement
   de la position courante de l'`Encounter` **avant** modification (pas
   fournis en confiance par le client) — seuls `toDepartmentId`/`toRoomId`/
   `toBedId` sont fournis par l'appelant.
3. Opération atomique (transaction) : insertion `EncounterMovement` +
   mise à jour `Encounter.currentDepartmentId`/`currentRoom`/`currentBed`.

### 3.3 Modèle de données

Déjà couvert par `EncounterMovement` (§0.1) — aucune évolution requise.

### 3.4 Validation Zod

`validator/admission.validator.ts` — nouveau schéma :

```ts
export const CreateMovementSchema = z.object({
  encounterId: z.uuid(),
  movementType: z.enum(MovementType),
  toDepartmentId: z.uuid().optional(),
  toRoomId: z.uuid().optional(),
  toBedId: z.uuid().optional(),
  movementBy: z.uuid(),
  reason: z.string().optional(),
});
```

### 3.5 Repository / Service / Controller

- `repositories/encounterMovement.repository.ts` (nouveau) :
  `createMovement(data)` (transaction, cf. §3.2.3).
- Service : traduit les cas d'erreur (`Encounter` introuvable/déjà clos) en
  `HttpException` dédiée.
- Controller :

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/encounter/:encounterId/movement` | Enregistre un déplacement et met à jour la position courante |
| `GET` | `/admission/encounter/:encounterId/movement` | Historique des déplacements d'un séjour |

---

## 4. 🟡 Gestion des accompagnants (post-création)

### 4.1 Contexte métier

Les accompagnants peuvent être saisis à la création (§1) mais aussi
ajoutés/modifiés/retirés plus tard (ex. un proche arrive après coup).

### 4.2 À faire

- Validation : `AddCompanionSchema`, `UpdateCompanionSchema`.
- Repository : `addCompanion(admissionId, data)`,
  `updateCompanion(id, data)`, `removeCompanion(id)`.
- Controller :

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/companion` | Ajoute un accompagnant |
| `PUT` | `/admission/companion/:companionId` | Modifie un accompagnant |
| `DELETE` | `/admission/companion/:companionId` | Retire un accompagnant |

---

## 5. 🟡 Gestion des documents (post-création)

### 5.1 Contexte métier

Mêmes besoins que §4 mais pour `AdmissionDocument` — upload possible après
la création initiale (ex. la carte d'assurance est retrouvée plus tard).
Réutiliser le pattern Multer déjà en place côté
`Patient-Identity-Service` (`helpers/config/multer.config.ts`,
`@UsePatientFile`) plutôt que de le réinventer — à généraliser dans une
lib partagée si les deux services doivent uploader des fichiers de façon
identique.

### 5.2 À faire

- Validation : `AddDocumentSchema`.
- Repository : `addDocument(admissionId, data)`, `removeDocument(id)`.
- Controller :

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/document` | Attache un document (upload) |
| `DELETE` | `/admission/document/:documentId` | Retire un document |

---

## 6. 🟡 Gestion des payeurs (post-création)

### 6.1 Contexte métier

Un payeur (assurance, entreprise) peut être ajouté ou mis à jour après la
création (ex. numéro de police confirmé plus tard, changement de taux de
couverture).

### 6.2 À faire

- Validation : `AddPayerSchema`, `UpdatePayerSchema`.
- Repository : `addPayer(admissionId, data)`, `updatePayer(id, data)`,
  `removePayer(id)`.
- Controller :

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/payer` | Ajoute un payeur |
| `PUT` | `/admission/payer/:payerId` | Modifie un payeur |
| `DELETE` | `/admission/payer/:payerId` | Retire un payeur |

---

## 7. 🟡 Sortie du patient (Discharge)

### 7.1 Contexte métier

Cf. `desc.txt` étape 6 : fin de la prise en charge, le patient rentre chez
lui (ou est transféré/décède — cf. `info_sorties` dans le cahier des
charges legacy pour les motifs de sortie possibles, à réévaluer si le
métier en a besoin dès la v1 ou plus tard).

### 7.2 Règles métier

1. Seule une admission dont le statut est "en cours" (cf. liste `admit[]`
   §1.2, à extraire en constante partagée — besoin déjà identifié en §2.3)
   peut être déchargée.
2. Opération atomique : `Admission.actualDischarge = now`,
   `Admission.admissionStatus = "DISCHARGED"`,
   `Encounter.endDate = now`, `Encounter.encounterStatus =
   "ENCOUNTER_DISCHARGED"`, insertion d'un dernier `EncounterMovement`
   (`movementType: "DISCHARGE"`) pour clôturer la traçabilité des
   déplacements.

### 7.3 Validation Zod

```ts
export const DischargePatientSchema = z.object({
  admissionId: z.uuid(),
  dischargedBy: z.uuid(),
  reason: z.string().optional(),
});
```

### 7.4 Repository / Service / Controller

- Repository : `dischargePatient(data)` (transaction, cf. §7.2.2).
- Controller :

| Méthode | Route | Description |
|---|---|---|
| `PUT` | `/admission/:id/discharge` | Termine l'admission et clôt le séjour |

---

## 8. 🟡 Historique / audit trail

### 8.1 Contexte métier

`Patient-Identity-Service` trace automatiquement chaque
création/modification/suppression via `PatientHistory` +
`PatientSubscriber` (traçabilité obligatoire sur des données de santé).
`Admission-service` n'a **aucun** équivalent actuellement — à ajouter par
cohérence avant la mise en production, pas nécessairement dans la première
itération fonctionnelle.

### 8.2 À faire (plus tard, non bloquant pour §1-7)

- `entities/admission.history.entity.ts` (même structure que
  `PatientHistory` : `admissionId`, `oldData`, `newData`, `action`,
  `changeBy`, `createdAt`).
- `entities/admission.subscriber.ts` (`@EventSubscriber`, réutilise
  `helpers/entitySnapshot.ts` en le déplaçant dans une lib partagée, ou en
  dupliquant la fonction comme fait actuellement pour d'autres helpers
  entre services).

---

## 9. 🟡 Câblage NestJS final

Une fois §1-8 avancés :

- `src/modules/app.module.ts` : remplir `@Module({...})` avec
  `imports`/`controllers`/`providers` (cf. §0.2).
- `helpers/messageError.ts` (nouveau, même pattern que
  `Patient-Identity-Service/src/helpers/messageError.ts`) : centraliser les
  messages d'erreur au lieu des `HttpException` inline actuelles
  (`"PATIENT ALREADY ADMITTED"` en dur dans le repository, cf. §1.2).
- `shared/filters/admission.filter.ts` + `shared/pipes/admission.pipe.ts`
  (mêmes rôles que côté Patient-Identity-Service).
- Clarifier le nommage `AdmissionService` (classe repository) — soit la
  renommer `AdmissionRepository` et créer un vrai
  `services/admission.service.ts` séparé (pattern
  repository/service de `Patient-Identity-Service`), soit assumer
  consciemment un seul fichier repository+service pour ce microservice.
  À trancher avant d'ajouter les autres méthodes (§2-7) pour ne pas
  mélanger les deux styles.

---

## 10. Résumé des fichiers impactés (toutes sections)

- `entities/*.entity.ts` — 🟢 fait, correction des types de colonnes invalides à faire (§0.3)
- `entities/admission.history.entity.ts` — nouveau (§8)
- `entities/admission.subscriber.ts` — nouveau (§8)
- `helpers/GeneratedUniqueEncounter.ts` — à brancher dans `createNewAdmission` (§1.3)
- `helpers/messageError.ts` — nouveau (§9)
- `validator/admission.validator.ts` — compléter `admissionQuerySchema`, ajouter `CreateMovementSchema`, `AddCompanionSchema`/`UpdateCompanionSchema`, `AddDocumentSchema`, `AddPayerSchema`/`UpdatePayerSchema`, `DischargePatientSchema`
- `dto/admission.dto.ts` — nouveau, tous les DTO (§1-7)
- `repositories/admission.repository.ts` — compléter `findAdmission`, ajouter `findAdmissionById`, `findActiveAdmissionByPatient`, `findAdmissions`, `dischargePatient` ; extraire la liste de statuts "actifs" en constante partagée
- `repositories/encounterMovement.repository.ts` — nouveau (§3)
- `repositories/admissionCompanion.repository.ts`, `admissionDocument.repository.ts`, `admissionPayer.repository.ts` — nouveaux (§4-6), ou méthodes ajoutées directement sur `admission.repository.ts` selon la décision prise en §9
- `services/admission.service.ts` — nouveau si on sépare repository/service (§9)
- `controllers/admission.controller.ts` — nouveau, toutes les routes (§1-7)
- `shared/filters/admission.filter.ts`, `shared/pipes/admission.pipe.ts` — nouveaux (§9)
- `app.module.ts` — câblage complet (§0.2, §9)

---

# Revue des entités Admission-service — corrections apportées

Analyse de la question : les entités actuelles (`Admission`, `Encounter`,
`EncounterMovement`, `AdmissionCompanion`, `AdmissionDocument`,
`AdmissionPayer`) modélisent-elles correctement un système d'admission
hospitalière moderne de taille modérée ? Verdict : la base était saine
(séparation Admission/Encounter, `EncounterMovement` pour la traçabilité
des déplacements, plusieurs payeurs possibles) mais il manquait des
éléments considérés comme **standards** dans ce domaine — traçabilité
médico-légale et identifiant métier lisible. Corrections appliquées
ci-dessous, avec justification pour chacune.

## 1. Ajout de la suppression douce + audit (`createdBy`/`updatedBy`/`deletedAt`/`deletedBy`)

**Entités concernées :** `Admission`, `Encounter`, `AdmissionCompanion`,
`AdmissionDocument`, `AdmissionPayer`.

**Pourquoi.** Un dossier d'admission (et tout ce qui s'y rattache :
accompagnants, documents, payeurs) est une pièce administrative et parfois
médico-légale. Elle ne doit jamais être supprimée physiquement, et toute
création/modification/suppression doit être imputable à un utilisateur —
c'est déjà la règle appliquée à `Patient` et `ArchivDossier` dans
`Patient-Identity-Service` (`@DeleteDateColumn` + `createdBy`/`updatedBy`/
`deletedBy`). Sans ça, un `DELETE /admission/companion/:id` (prévu au
plan frontend/backend) supprimerait l'information sans laisser de trace de
qui l'a fait ni quand — inacceptable pour un dossier patient.

**Non appliqué à `EncounterMovement`, volontairement.** Un mouvement
(transfert de lit/service) est un événement de journal, pas un enregistrement
qu'on modifie ou retire — même logique que `PatientHistory` côté
Patient-Identity-Service, qui n'a ni suppression douce ni `createdBy`/
`updatedBy` (l'acteur y est déjà porté par un champ dédié, `changeBy`).
`EncounterMovement` a son équivalent : `movementBy`. Ajouter un audit
générique par-dessus aurait été redondant.

## 2. Ajout de `Admission.admissionNumber` (identifiant métier lisible)

**Pourquoi.** Le seul identifiant d'une admission était jusqu'ici l'`id`
technique (UUID) — imprononçable et inutilisable sur un document papier,
au téléphone, ou pour recouper un dossier avec la facturation. C'est
exactement le rôle que joue déjà `Patient.uniquePatientId` côté
Patient-Identity-Service, et celui que jouait `num_admission` dans
l'ancien système (référencé par la quasi-totalité des tables satellites du
cahier des charges legacy : `engagement`, `info_sorties`,
`mutation_caution`, `delai_attente`...). Sans ce champ, le service aurait
été moins utilisable en pratique que le système qu'il remplace.

**État :** colonne `unique`, indexée, mais **laissée `nullable` pour
l'instant** — comme d'autres champs du service (`encounterId` avant
correction ci-dessous), rien ne la génère encore côté repository. La
génération (ex. `ADM-2026-XXXXXXXX`, sur le modèle de
`GeneratedEncouterId()` déjà présent dans
`helpers/GeneratedUniqueEncounter.ts`) est un travail de repository/service,
hors scope d'une revue d'entités — à câbler dans `createNewAdmission` en
même temps que le reste du plan §1.

## 3. Suppression de `Admission.encounterId`

**Pourquoi.** Ce champ (`varchar`, jamais peuplé par le repository) faisait
doublon avec la relation `OneToOne` désormais correcte entre `Admission` et
`Encounter` (`Admission.encounters` / `Encounter.admission`, cette dernière
portant la vraie colonne `admissionId`). Garder les deux aurait entretenu
une ambiguïté : quelle est la source de vérité du lien Admission ↔
Encounter ? Un seul mécanisme (la relation) doit exister.

## 4. Défaut explicite sur `Admission.admissionStatus`

**Pourquoi.** `Encounter.encounterStatus` a déjà un défaut
(`ENCOUNTER_PENDING`) ; `Admission.admissionStatus` n'en avait pas alors
que la logique métier (`createNewAdmission`) part toujours de `PENDING`.
Défaut ajouté (`AdmissionStatus.PENDING`) par cohérence et comme filet de
sécurité si une ligne est un jour insérée sans passer par le repository.

## 5. Renommage `Encounter.currentRoom`/`currentBed` → `currentRoomId`/`currentBedId`

**Pourquoi.** Toutes les autres colonnes de position/référence du service
sont suffixées `Id` pour signaler explicitement "ceci est une clé
étrangère, pas l'objet" (`currentDepartmentId`,
`EncounterMovement.fromRoomId/toRoomId/fromBedId/toBedId`...). Seules
`currentRoom`/`currentBed` dérogeaient à la convention, ce qui pouvait
laisser penser à tort qu'il s'agissait de champs texte libres (numéro de
chambre saisi à la main) plutôt que de références `uuid` vers une autre
ressource (service Ressources/Bâtiment, hors périmètre actuel). Aucun
autre fichier du service ne référençait ces deux champs — renommage sans
impact ailleurs (vérifié par recherche dans tout `src/`).

## Ce qui n'a délibérément **pas** été changé

- **Pas de `serviceId`/`departmentId` séparé sur `Admission`.** La
  position (service, chambre, lit) est déjà portée par `Encounter`, créé
  systématiquement en même temps que l'admission. Dupliquer l'information
  sur `Admission` aurait cassé la séparation des responsabilités déjà en
  place : `Admission` = pourquoi/qui, `Encounter` = où se trouve le
  patient maintenant. Ce découpage était déjà correct.
- **Pas d'ordre de priorité (`isPrimary`) sur `AdmissionPayer`** malgré
  plusieurs payeurs possibles : utile pour la facturation, mais c'est une
  règle métier à trancher avec le module Facturation (à venir), pas un
  défaut de structure de table à corriger maintenant. Noté ici pour
  mémoire plutôt qu'ajouté sans besoin exprimé.
- **Pas de type/priorité sur `AdmissionCompanion`** (accompagnant présent
  vs. simple contact à joindre) : `desc.txt` mélange les deux usages sans
  trancher — à clarifier avec le métier avant de figer un enum, plutôt que
  d'en inventer un.

## Vérification

`tsc --noEmit` sur `Admission-service` ne remonte aucune erreur liée aux
entités après ces changements (seuls les imports inutilisés préexistants
de `admission.repository.ts`, hors scope, subsistent).

---

# Revue de `createNewAdmission` — bugs trouvés et corrections

Revue de la fonction `createNewAdmission` (`repository/admission.repository.ts`)
telle qu'écrite avant cette passe. Plusieurs bugs auraient empêché le
fonctionnement correct dès le premier appel réel, et il n'y avait aucune
gestion d'erreur exploitable par un futur controller. Détail ci-dessous,
avec la correction apportée pour chacun.

## Bugs bloquants

### 1. `manager.save(companions/documents/payers)` plantait sur le cas le plus courant

```ts
const companions = data.companions?.map(...)   // undefined si data.companions absent
...
await Promise.all([
    manager.save(companions),   // manager.save(undefined) !
    manager.save(documents),
    manager.save(payers)
])
```

`companions`, `documents` et `payers` sont **optionnels** dans le schéma
Zod (`CreateAdmissionSchema`). Dès qu'une admission est créée sans
accompagnant — le cas le plus fréquent, ex. une consultation externe seule
— `data.companions` est `undefined`, donc `data.companions?.map(...)` vaut
aussi `undefined`, et `manager.save(undefined)` est appelé. TypeORM ne gère
pas cet appel proprement : la transaction échoue avec une erreur brute non
gérée, remontée en 500 générique au client (aucun filtre du repo ne
traduit ce cas). **Toute admission sans accompagnant, document ou payeur
échouait.**

**Correction :** `(data.companions ?? []).map(...)` (idem documents/payers)
— `manager.save([])` est un no-op valide.

### 2. La vérification "patient déjà admis" bloquait le retour d'un patient déjà sorti

```ts
admissionStatus : In([
    AdmissionStatus.PENDING, AdmissionStatus.ADMITTED, AdmissionStatus.CANCELLED,
    AdmissionStatus.DISCHARGED, AdmissionStatus.PRE_ADMITTED, AdmissionStatus.REGISTERED,
    AdmissionStatus.TRANSFERED, AdmissionStatus.DISCHARGED_PENDING,
])
```

Cette liste couvrait quasiment tous les statuts existants, y compris
`CANCELLED` et `DISCHARGED` — des statuts **terminaux**. Résultat : un
patient qui a déjà été hospitalisé une fois (et donc sorti,
`DISCHARGED`) ne pouvait plus jamais être ré-admis, puisque
`createNewAdmission` trouvait toujours son ancienne admission "terminée"
et la traitait comme un conflit actif. Un hôpital où les patients ne
peuvent revenir qu'une seule fois dans leur vie n'est pas un système
fonctionnel.

**Correction :** liste réduite aux statuts réellement "actifs"
(`PENDING`, `PRE_ADMITTED`, `REGISTERED`, `ADMITTED`, `TRANSFERED`,
`DISCHARGED_PENDING`), extraite en constante `ACTIVE_ADMISSION_STATUSES`
pour éviter qu'elle diverge silencieusement d'une future méthode qui en
aurait besoin.

### 3. `admissionType` obligatoire en base, optionnel côté validation

L'entité `Admission.admissionType` est `nullable: false`, mais
`CreateAdmissionSchema` le déclarait `.optional()`. Une requête sans
`admissionType` passait la validation Zod (donc le pipe global la laissait
passer), puis échouait à l'insertion SQL avec une violation `NOT NULL` —
une erreur Postgres brute renvoyée au client plutôt qu'un message de
validation clair à 400.

**Correction :** `admissionType` rendu obligatoire dans
`CreateAdmissionSchema`, avec message d'erreur dédié
(`"Le type d'admission est requis"`), pour que l'erreur soit détectée
*avant* la base de données, avec un message exploitable.

### 4. `payers` incohérent par rapport à `companions`/`documents`

```ts
payers : z.array(z.object({...}).optional()),
```

Ici c'est l'**élément** du tableau qui était optionnel (un payeur peut être
`undefined` au milieu du tableau — non-sens), et le tableau lui-même **ne
l'était pas** : omettre complètement `payers` dans la requête faisait
échouer la validation ("expected array, received undefined"), alors que
`companions`/`documents` pouvaient être omis sans problème.

**Correction :** `.optional()` déplacé sur le tableau entier, retiré de
l'élément — cohérent avec `companions`/`documents`.

## Bugs silencieux (pas de crash, mais mauvais comportement)

### 5. `reason` (motif d'admission) jamais enregistré

`data.admission.reason` était validé par Zod mais jamais passé à
`manager.create(Admission, {...})` — l'information saisie par le personnel
était silencieusement perdue. Ajouté à l'insertion.

### 6. `admissionDate` pouvait rester `null` sans raison

Champ `.optional()` côté validation, et rien ne le complétait côté
serveur si absent — une admission pouvait n'avoir aucune date de début,
ce qui casse tout tri/filtrage ultérieur par date. Corrigé :
`admissionDate: data.admission.admissionDate ?? new Date()`.

### 7. `admissionNumber` fourni par le client, jamais vérifié

Le schéma exigeait `admissionNumber` du client, sans aucune vérification
d'unicité avant insertion (la seule protection étant la contrainte
`unique` en base, qui aurait renvoyé une erreur Postgres brute en cas de
collision). C'est aussi incohérent avec le seul autre identifiant métier
du système : `Patient.uniquePatientId`, que le client ne fournit jamais —
il est **généré côté serveur** par `patient.repository.ts` (boucle de
génération + vérification d'unicité, jusqu'à 5 tentatives).

**Correction :** `admissionNumber` retiré du payload client. Génération
serveur via un nouveau `GeneratedAdmissionNumber()`
(`helpers/UniqueNumero.ts`, renommé de l'ancien `GeneratedEncouterId` —
son nom ne correspondait pas à ce qu'il produisait), avec la même boucle
de vérification d'unicité que côté patient (5 tentatives). Même
traitement pour `Encounter.encounterNumber`, qui était accepté du client
sans jamais être vérifié : maintenant généré côté serveur via
`GeneratedEncounterNumber()` (pas de boucle d'unicité ici, la collision
n'aurait pas de conséquence bloquante identifiée pour un simple numéro de
séjour — à réévaluer si un jour ce numéro sert de clé d'accès externe).

### 8. Forme de retour incohérente entre le cas "conflit" et le cas "succès"

Avant : `{ exist: true, admission }` (conflit) vs.
`{ id, patientId, admission: { admission, companions, documents, payers } }`
(succès) — la clé `admission` désignait tantôt l'entité, tantôt un objet 
englobant tout. Un futur controller n'aurait pas pu discriminer proprement
les deux cas sans connaître ce détail par cœur.

**Correction :** retour aplati et discriminé par `exist` :
`{ exist: true, admission }` vs.
`{ exist: false, admission, companions, documents, payers, encounter }`
— même convention que `patient.repository.ts` (`"exist" in patientCreated`).

## Absence totale de gestion d'erreur HTTP

Le repository ne levait plus aucune `HttpException` (une version
antérieure le faisait directement dans le repository ; cette logique avait
disparu sans être déplacée ailleurs). Un futur appelant recevait un objet
`{ exist: true, ... }` en cas de conflit — à charge pour lui de deviner
qu'il fallait le transformer en réponse d'erreur.

**Correction, alignée sur la convention `Patient-Identity-Service`**
(repository = données + retours discriminés, service = traduction en
`HttpException`) :

- `helpers/messageError.ts` (nouveau) : messages centralisés
  `ADMISSION_PATIENT_ALREADY_ACTIVE` (409) et
  `ADMISSION_NUMBER_GENERATION_FAILED` (409, cas extrême où 5 tentatives de
  génération collisionnent toutes).
- `services/admission.service.ts` (nouveau) : `AdmissionService.createNewAdmission`
  appelle le repository et lève l'`HttpException` correspondante selon le
  discriminant du retour, sinon renvoie le résultat.
- `repository/admission.repository.ts` : la classe s'appelait `AdmissionService`
  alors que le fichier est `admission.repository.ts` et qu'elle hérite de
  `Repository<Admission>` — collision de nom directe avec le vrai service
  business qu'il fallait créer. **Renommée `AdmissionRepository`.**
- Les deux sont enregistrés comme `providers` dans `app.module.ts` (ils ne
  l'étaient pas du tout auparavant — aucune injection de dépendance
  n'aurait fonctionné).

## Non modifié, à trancher plus tard

- Toujours pas de vérification que `patientId` existe réellement côté
  `Patient-Identity-Service` (appel inter-service ou confiance au
  payload) — déjà noté dans `PLAN_FONCTIONNALITES_ADMISSION.md` §1.3,
  toujours vrai.
- La condition "encounter créé seulement si `ADMITTED`/`REGISTERED`" a été
  conservée telle quelle : elle a du sens métier (pas de séjour actif à
  positionner tant que le patient n'est pas physiquement pris en charge),
  mais implique qu'il faudra une méthode dédiée plus tard pour créer
  l'`Encounter` a posteriori quand une admission `PENDING`/`PRE_ADMITTED`
  passe à `ADMITTED`/`REGISTERED` — cette méthode n'existe pas encore
  (`findAdmission` est toujours un stub vide).

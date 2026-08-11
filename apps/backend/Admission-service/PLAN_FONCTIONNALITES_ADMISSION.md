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

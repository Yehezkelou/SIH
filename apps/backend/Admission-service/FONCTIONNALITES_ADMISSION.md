# Fonctionnalités — Admission-service (vue globale)

Recensement **exhaustif** des fonctionnalités du microservice `Admission-service`,
de l'arrivée du patient à l'hôpital jusqu'à sa sortie. Ce document décrit le
**périmètre cible complet** et l'état réel du code au moment de la rédaction.

Conventions de référence : `Patient-Identity-Service` (NestJS, TypeORM,
validation Zod via `@UseZodSchema`, pattern repository → service → controller,
suppression douce + audit, subscriber pour l'historique).

Références métier : `desc.txt` (workflow interne) et `CAHIER_DES_CHARGES_SIH.md`
(racine du repo, section « Module: Admissions » — schéma legacy servant de
référence champ par champ, pas de modèle à copier tel quel).

> Légende statut : 🟢 fait · 🔵 en cours / partiel · 🟡 à faire · ⚪ optionnel / plus tard

---

## 0. Socle technique

| # | Élément | Statut | Détail |
|---|---|---|---|
| 0.1 | Modèle de données (entités TypeORM) | 🟢 | `Admission`, `Encounter`, `EncounterMovement`, `AdmissionCompanion`, `AdmissionDocument`, `AdmissionPayer` créées, types de colonnes corrigés, suppression douce + audit (`createdBy`/`updatedBy`/`deletedAt`/`deletedBy`) sur les entités persistantes |
| 0.2 | Enums centralisés | 🟢 | `entities/admission.enum.ts` + redéclaration `as const` pour Zod dans `validator/` |
| 0.3 | Câblage NestJS (`app.module.ts`) | 🟢 | `DatabaseModule.forRoot([...])`, `LoggerModuleGlobale`, `APP_PIPE` (Zod), `APP_FILTER`, providers `AdmissionRepository` + `AdmissionService` |
| 0.4 | Générateurs de numéros lisibles | 🟢 | `helpers/UniqueNumero.ts` → `GeneratedAdmissionNumber()` (`AD-<année><hex>`), `GeneratedEncounterNumber()` |
| 0.5 | Messages d'erreur centralisés | 🔵 | `helpers/messageError.ts` — seulement 2 codes (`ADMISSION_PATIENT_ALREADY_ACTIVE`, `ADMISSION_NUMBER_GENERATION_FAILED`), à compléter au fil des fonctionnalités |
| 0.6 | Pipe de validation + Filtre d'exception | 🟢 | `shared/pipes/admission.pipe.ts`, `shared/filters/admission.filter.ts` |
| 0.7 | Upload de fichiers (Multer) | 🔵 | `helpers/config/multer.config.ts` + `helpers/decorator/AdmissionFile.decorator.ts` présents mais **pas encore branchés** sur une route |
| 0.8 | **Aucun controller n'existe** | 🟡 | **Point bloquant majeur** : aucune route HTTP n'est exposée. Même `createNewAdmission`, déjà codé côté service/repository, est inaccessible en HTTP |
| 0.9 | **Aucun DTO n'existe** | 🟡 | `dto/admission.dto.ts` à créer (`@UseZodSchema`), sur le modèle de `patient.dto.ts` |

---

## 1. 🔵 Création d'une admission

**Contexte** (`desc.txt` §1-5) : à l'arrivée du patient, création en une seule
opération du dossier `Admission`, de son `Encounter` (si statut le justifie), et
optionnellement de ses accompagnants, documents et payeurs.

**Fait** :
- `AdmissionRepository.createNewAdmission` (transaction) : vérifie l'absence
  d'admission active (`ACTIVE_ADMISSION_STATUSES`), génère `admissionNumber`
  unique (5 tentatives), crée `Admission` + `Encounter` (si `ADMITTED`/`REGISTERED`)
  + companions/documents/payers.
- `AdmissionService.createNewAdmission` : traduit conflit / échec de génération
  en `HttpException`.
- `CreateAdmissionSchema` (Zod) complet.

**À faire** :
- 🟡 `dto/admission.dto.ts` → `CreateAdmissionDto implements CreateAdmissionInput` décoré `@UseZodSchema(CreateAdmissionSchema)`.
- 🟡 `controllers/admission.controller.ts` → route `POST /admission`.
- ⚪ Vérifier que `patientId` existe réellement (appel inter-service vers `Patient-Identity-Service`, ou confiance au payload) — **à trancher**.
- ⚪ Créer l'`Encounter` a posteriori quand une admission `PENDING`/`PRE_ADMITTED` passe à `ADMITTED`/`REGISTERED` (aujourd'hui l'encount er n'est créé qu'à la création si le statut le permet).

| Méthode | Route | Description 
|---|---|---|
| `POST` | `/admission` | Crée une admission + encounter (+ companions/documents/payers optionnels) |

---

## 2. 🟡 Consultation / recherche des admissions

**Contexte** : retrouver une admission par `id`, par `patientId` (admission
active en cours), ou lister/filtrer par statut, type, service, date.

**État** : `findAdmission()` est un **stub vide** ; `admissionQuerySchema` est un
**stub vide**.

**À faire** :
- 🟡 `admissionQuerySchema` : filtres `patientId?`, `admissionStatus?`, `admissionType?`, `doctorId?`, plage de dates, pagination `page`/`limit` (cf. `SearchPatientSchema`).
- 🟡 Repository : `findAdmissionById(id)` (avec relations `encounter`/`companions`/`documents`/`payers`), `findActiveAdmissionByPatient(patientId)` (réutilise `ACTIVE_ADMISSION_STATUSES`), `findAdmissions(query)` (liste filtrée + paginée).
- 🟡 Service + controller.

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/admission/:id` | Détail complet d'une admission |
| `GET` | `/admission/patient/:patientId/active` | Admission active en cours d'un patient |
| `GET` | `/admission` | Liste / recherche filtrée + paginée |

---

'## 3. 🟡 Mise à jour d'une admission

**Contexte** : corriger/compléter les informations d'un dossier (médecin, motif,
date de sortie prévue, statut).

**État** : `UpdateAdmissionSchema` existe ; **aucune** méthode repository/service/route.

**À faire** :
- 🟡 Repository `updateAdmission(id, data, updatedBy)` (renseigne `updatedBy`).
- 🟡 Gestion des transitions de statut valides (ex. `PENDING → REGISTERED → ADMITTED → DISCHARGED_PENDING → DISCHARGED`), refuser les transitions incohérentes.
- 🟡 Service + controller.

| Méthode | Route | Description |
|---|---|---|
| `PUT` | `/admission/:id` | Met à jour les champs d'une admission |
| `PATCH` | `/admission/:id/status` | Change le statut (avec contrôle de transition) |

---'

## 4. 🟡 Déplacements du patient (Encounter Movements / transferts)

**Contexte** (`desc.txt` §3) : un patient hospitalisé change de
département/chambre/lit (Urgences → Chambre → Bloc). Chaque changement est tracé
(`EncounterMovement`) et la position courante de l'`Encounter` mise à jour.

**Règles** :
1. Transfert interdit si l'`Encounter` est `ENCOUNTER_DISCHARGED`/`ENCOUNTER_CLOSED`/`ENCOUNTER_CANCELLED`.
2. `from*` dérivés automatiquement de la position courante **avant** modification (jamais fournis par le client) ; seuls `to*` viennent de l'appelant.
3. Opération atomique : insertion `EncounterMovement` + mise à jour `Encounter.currentDepartmentId`/`currentRoomId`/`currentBedId`.

**État** : entité `EncounterMovement` 🟢 ; **aucune** logique / route.

**À faire** :
- 🟡 `CreateMovementSchema` (`encounterId`, `movementType`, `toDepartmentId?/toRoomId?/toBedId?`, `movementBy`, `reason?`).
- 🟡 Repository `createMovement(data)` (transaction) + `findMovements(encounterId)`.
- 🟡 Service (traduction erreurs : encounter introuvable / déjà clos) + controller.

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/encounter/:encounterId/movement` | Enregistre un déplacement + met à jour la position |
| `GET` | `/admission/encounter/:encounterId/movement` | Historique des déplacements d'un séjour |

---

## 5. 🟡 Gestion des accompagnants (post-création)

**Contexte** : les accompagnants peuvent être saisis à la création (§1) mais aussi
ajoutés/modifiés/retirés plus tard.

**État** : entité 🟢, insertion à la création 🟢 ; **aucune** gestion post-création.

**À faire** :
- 🟡 `AddCompanionSchema`, `UpdateCompanionSchema`.
- 🟡 Repository `addCompanion(admissionId, data)`, `updateCompanion(id, data)`, `removeCompanion(id)` (suppression douce + `deletedBy`).
- 🟡 Service + controller.

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/companion` | Ajoute un accompagnant |
| `PUT` | `/admission/companion/:companionId` | Modifie un accompagnant |
| `DELETE` | `/admission/companion/:companionId` | Retire un accompagnant (soft delete) |

---

## 6. 🟡 Gestion des documents (post-création + upload)

**Contexte** (`desc.txt` §4) : scanner/attacher des pièces (CNI, carte
d'assurance, ordonnance…), y compris après la création initiale.

**État** : entité 🟢, insertion à la création 🟢, Multer configuré 🔵 (non branché) ;
**aucune** route d'upload.

**À faire** :
- 🟡 `AddDocumentSchema`.
- 🟡 Brancher `@UseAdmissionFile` (décorateur + `multer.config.ts`) sur la route d'upload.
- 🟡 Repository `addDocument(admissionId, data)`, `removeDocument(id)` (soft delete).
- 🟡 Service + controller.

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/document` | Attache un document (upload multipart) |
| `GET` | `/admission/:id/document` | Liste les documents d'une admission |
| `DELETE` | `/admission/document/:documentId` | Retire un document (soft delete) |

---

## 7. 🟡 Gestion des payeurs (post-création)

**Contexte** (`desc.txt` §5) : plusieurs payeurs possibles (patient, assurance,
entreprise). Ajout/mise à jour après création (police confirmée plus tard,
changement de taux…).

**État** : entité 🟢, insertion à la création 🟢 ; **aucune** gestion post-création.

**À faire** :
- 🟡 `AddPayerSchema`, `UpdatePayerSchema`.
- 🟡 Repository `addPayer(admissionId, data)`, `updatePayer(id, data)`, `removePayer(id)` (soft delete).
- 🟡 Service + controller.
- ⚪ Notion de payeur principal (`isPrimary`) — à trancher avec le module Facturation.

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/admission/:id/payer` | Ajoute un payeur |
| `PUT` | `/admission/payer/:payerId` | Modifie un payeur |
| `DELETE` | `/admission/payer/:payerId` | Retire un payeur (soft delete) |

---

## 8. 🟡 Sortie du patient (Discharge)

**Contexte** (`desc.txt` §6) : fin de prise en charge — retour au domicile,
transfert, ou décès.

**Règles** :
1. Seule une admission « active » (`ACTIVE_ADMISSION_STATUSES`) peut être déchargée.
2. Opération atomique : `Admission.actualDischarge = now`, `Admission.admissionStatus = DISCHARGED`, `Encounter.endDate = now`, `Encounter.encounterStatus = ENCOUNTER_DISCHARGED`, + dernier `EncounterMovement` (`movementType = DISCHARGE`) pour clôturer la traçabilité.

**État** : 🟡 rien.

**À faire** :
- 🟡 `DischargePatientSchema` (`admissionId`, `dischargedBy`, `reason?`, éventuellement motif de sortie : domicile/transfert/décès).
- 🟡 Repository `dischargePatient(data)` (transaction) + service + controller.

| Méthode | Route | Description |
|---|---|---|
| `PUT` | `/admission/:id/discharge` | Termine l'admission et clôt le séjour |

---

## 9. 🟡 Annulation / suppression douce d'une admission

**Contexte** : une admission créée par erreur, ou un patient qui ne se présente
pas, doit pouvoir être annulée (`CANCELLED`) sans être supprimée physiquement.

**À faire** :
- 🟡 Repository `cancelAdmission(id, cancelledBy, reason)` → `admissionStatus = CANCELLED`, encounter éventuel → `ENCOUNTER_CANCELLED`.
- 🟡 `softDeleteAdmission(id, deletedBy)` (`@DeleteDateColumn` + `deletedBy`), sur le modèle du soft delete patient.
- 🟡 Service + controller.

| Méthode | Route | Description |
|---|---|---|
| `PATCH` | `/admission/:id/cancel` | Annule une admission |
| `DELETE` | `/admission/:id` | Suppression douce d'une admission |

---

## 10. ⚪ Historique / audit trail

**Contexte** : `Patient-Identity-Service` trace automatiquement chaque
création/modification/suppression (`PatientHistory` + `PatientSubscriber`).
`Admission-service` n'a **aucun** équivalent — à ajouter avant mise en production
(non bloquant pour §1-9).

**À faire** :
- ⚪ `entities/admission.history.entity.ts` (`admissionId`, `oldData`, `newData`, `action`, `changeBy`, `createdAt`).
- ⚪ `entities/admission.subscriber.ts` (`@EventSubscriber`, réutilise le helper de snapshot d'entité — à mutualiser dans une lib partagée plutôt qu'à dupliquer).
- ⚪ Enregistrer l'entité history dans `DatabaseModule.forRoot([...])`.

--- // done

## 11. ⚪ Intégrations inter-services (à cadrer)

- ⚪ Vérification de l'existence du `patientId` auprès de `Patient-Identity-Service` (§1).
- ⚪ Résolution des références de localisation `departmentId`/`roomId`/`bedId` auprès d'un futur service Ressources/Bâtiment (aujourd'hui simples `uuid` non validés).
- ⚪ Exposition d'événements (patient admis / transféré / sorti) pour la Facturation et les autres modules.
- ⚪ Génération de documents imprimables (fiche d'admission, bordereau d'engagement, étiquettes patient — cf. cahier des charges), probablement porté par un service dédié.

---

## 12. Récapitulatif des fichiers à créer / compléter

| Fichier | Action |
|---|---|
| `dto/admission.dto.ts` | **Créer** — tous les DTO (§1-9) |
| `controllers/admission.controller.ts` | **Créer** — toutes les routes (§1-9) |
| `validator/admission.validator.ts` | Compléter `admissionQuerySchema`, ajouter `CreateMovementSchema`, `AddCompanionSchema`/`UpdateCompanionSchema`, `AddDocumentSchema`, `AddPayerSchema`/`UpdatePayerSchema`, `DischargePatientSchema` |
| `repository/admission.repository.ts` | Implémenter `findAdmission*`, `updateAdmission`, `dischargePatient`, `cancelAdmission`, `softDeleteAdmission` |
| `repository/encounterMovement.repository.ts` | **Créer** (§4) |
| `repository/admissionCompanion.repository.ts` / `admissionDocument.repository.ts` / `admissionPayer.repository.ts` | **Créer** (§5-7) — ou méthodes sur le repository principal |
| `services/admission.service.ts` | Étendre avec toutes les méthodes métier + traductions d'erreur |
| `helpers/messageError.ts` | Ajouter les codes des §2-9 |
| `helpers/decorator/AdmissionFile.decorator.ts` | Brancher sur la route d'upload (§6) |
| `entities/admission.history.entity.ts` + `admission.subscriber.ts` | **Créer** (§10, plus tard) |
| `app.module.ts` | Déclarer le controller ; ajouter l'entité history quand elle existe |

---

## 13. Ordre d'implémentation recommandé

1. **§1 exposé en HTTP** (DTO + controller `POST /admission`) — débloque tout le reste et permet de tester.
2. **§2 consultation** (find by id / active / liste) — indispensable pour l'usage et le debug.
3. **§4 déplacements** + **§8 sortie** — cœur du cycle de vie du séjour.
4. **§3 update / §9 annulation-suppression** — complètent le cycle de vie de l'admission.
5. **§5-7 companions / documents / payers** post-création.
6. **§10 audit trail** avant la mise en production.
7. **§11 intégrations inter-services** selon l'avancement des autres modules.

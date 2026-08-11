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

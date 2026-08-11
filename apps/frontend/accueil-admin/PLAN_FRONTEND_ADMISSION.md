# Plan frontend — Module Admission (`accueil-admin`)

Document expliquant l'arborescence de dossiers créée pour porter tout le
frontend du module Admission (enregistrement, suivi, sortie du patient),
côté application `accueil-admin` (Next.js App Router). À ce stade, **seuls
les dossiers sont créés** (avec `.gitkeep`) — aucun composant/page n'est
encore implémenté. Ce plan sert de guide pour savoir quoi placer où au fur
et à mesure de l'implémentation, en miroir de
`apps/backend/Admission-service/PLAN_FONCTIONNALITES_ADMISSION.md`.

> Pourquoi `accueil-admin` et pas `emergency` : ce module correspond au
> parcours "accueil/réception" du patient (enregistrement de l'admission,
> accompagnants, payeurs, suivi de séjour, sortie) — c'est le pendant
> frontend du `Admission-service`. `emergency` reste dédié au parcours
> urgences / dossier provisoire côté `Patient-Identity-Service`.

## Principe d'architecture : séparation routes / feature

Deux arborescences distinctes, volontairement découplées :

- **`src/app/`** — uniquement le routing Next.js (App Router). Chaque
  dossier = une URL. Les fichiers `page.tsx`/`layout.tsx` qui y vivront
  restent fins : ils orchestrent les composants de `src/features/admission/`,
  sans logique métier ni appel API direct.
- **`src/features/admission/`** — toute la logique et l'UI réutilisable du
  module Admission (composants, hooks, appels API, types, validation).
  Ce découpage permet de réutiliser un composant (ex. `AdmissionForm`) dans
  plusieurs routes (ex. création classique vs. pré-admission) sans dupliquer
  de code, et de tester la logique indépendamment du routing.

## Dossiers créés sous `src/app/`

Chaque dossier correspond à une route, alignée sur les endpoints prévus en
§1-2-7 du plan backend :

| Dossier | Route | Backend correspondant |
|---|---|---|
| `admissions/` | `GET /admissions` — liste/recherche des admissions | §2 (`GET /admission`) |
| `admissions/nouvelle/` | `POST` — formulaire de création d'admission (+ accompagnants/documents/payeurs) | §1 (`POST /admission`) |
| `admissions/[id]/` | `GET /admissions/:id` — détail d'une admission (encounter, mouvements, accompagnants, documents, payeurs) | §2 (`GET /admission/:id`) |
| `admissions/[id]/transfert/` | formulaire de déplacement du patient (département/chambre/lit) | §3 (`POST /admission/encounter/:encounterId/movement`) |
| `admissions/[id]/sortie/` | formulaire de sortie (discharge) | §7 (`PUT /admission/:id/discharge`) |

La gestion des accompagnants/documents/payeurs (§4-6 backend) ne nécessite
pas de route dédiée : ce sont des sections/formulaires intégrés directement
dans `admissions/[id]/` (édition inline), pas des pages séparées.

## Dossiers créés sous `src/features/admission/`

| Dossier | Contenu prévu |
|---|---|
| `api/` | Client HTTP vers `Admission-service` : une fonction par endpoint (`createAdmission`, `getAdmission`, `listAdmissions`, `createMovement`, `dischargePatient`, `addCompanion`/`addDocument`/`addPayer`...). Aucune logique React ici, uniquement des fonctions `fetch`/`axios` typées. |
| `components/` | Composants UI du module : `AdmissionForm`, `AdmissionList`, `AdmissionCard`, `CompanionFieldset`, `DocumentUploader`, `PayerFieldset`, `MovementTimeline`, `DischargeForm`. Composants "bêtes" (props in, JSX out), pas d'appel réseau direct. |
| `hooks/` | Hooks React reliant `api/` à l'UI (`useAdmission(id)`, `useAdmissions(query)`, `useCreateAdmission()`, `useTransferPatient()`, `useDischargePatient()`) — gèrent chargement/erreur/cache. |
| `types/` | Types TypeScript miroir des DTO backend (`Admission`, `Encounter`, `EncounterMovement`, `AdmissionCompanion`, `AdmissionDocument`, `AdmissionPayer`, enums de statut) — tant qu'aucun contrat partagé n'existe dans `libs/contracts`, ces types sont dupliqués ici et à garder synchronisés manuellement avec `apps/backend/Admission-service/src/modules/entities/*`. |
| `schemas/` | Schémas de validation (Zod) côté client pour les formulaires — mêmes règles que les schémas backend (`validator/admission.validator.ts`) afin de donner un retour immédiat à l'utilisateur avant l'appel API. |
| `utils/` | Fonctions pures : formatage de dates, libellés lisibles pour les enums (`AdmissionStatus`, `EncounterStatus`...), calculs d'affichage (ex. durée de séjour). |
| `store/` | État partagé du parcours de création multi-étapes (si le formulaire d'admission est découpé en plusieurs écrans : identité → accompagnants → documents → payeurs avant soumission finale). À n'utiliser que si le formulaire dépasse une seule page ; sinon le state local React suffit. |

## Ordre d'implémentation suggéré

1. `features/admission/types/` — poser les types en premier, tout le reste en dépend.
2. `features/admission/api/` — client HTTP, une fois le backend §1 (création) exposé.
3. `features/admission/schemas/` + `components/AdmissionForm` + `hooks/useCreateAdmission` → `app/admissions/nouvelle/page.tsx`.
4. `components/AdmissionList` + `hooks/useAdmissions` → `app/admissions/page.tsx` (nécessite backend §2).
5. `app/admissions/[id]/page.tsx` (détail) + sections accompagnants/documents/payeurs inline.
6. `components/MovementTimeline` + `app/admissions/[id]/transfert/page.tsx` (nécessite backend §3).
7. `app/admissions/[id]/sortie/page.tsx` (nécessite backend §7).

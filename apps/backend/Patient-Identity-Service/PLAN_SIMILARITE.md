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

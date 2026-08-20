# Urgency-Service — Fonctionnalités à construire

Feuille de route fonctionnelle du microservice **Urgences** du SIH.
Elle couvre l'ensemble du parcours patient aux urgences, de l'accueil à la
sortie, ainsi que les indicateurs de pilotage (Time to Admission, DMS) et les
évolutions futures.

> Contexte : le module Urgence n'avait pas de table dédiée en legacy (il
> s'appuyait sur `admissions`). Ici il est modélisé en propre autour de
> `EmergencyEncounter` + `Triage`, `WaitDelay`, `PatientMovement`,
> `BedOccupancy`, `DischargeInfo`, `Provenance` et `UrgencyHistory`.

## Légende

**Priorité**
- 🔴 **P0 — Indispensable** : sans ça le service ne fonctionne pas (MVP).
- 🟠 **P1 — Important** : nécessaire à une exploitation réelle et sereine.
- 🟢 **P2 — Évolution future** : valeur ajoutée, non bloquant au démarrage.

**Complexité** : ⚙️ simple · ⚙️⚙️ moyenne · ⚙️⚙️⚙️ élevée

---

## 1. Accueil & enregistrement du passage

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 1.1 | Créer un passage aux urgences | 🔴 P0 | ⚙️ | Création d'un `EmergencyEncounter` (patient connu ou provisoire), `arrivalDate`, `arrivalMode`, motif. |
| 1.2 | Génération du numéro de passage | 🔴 P0 | ⚙️⚙️ | `urgencyNumber` unique et lisible, séquence journalière avec compteur transactionnel (cf. pattern `compteur_admission`). Anti-collision sous concurrence. |
| 1.3 | Passage anonyme / patient non identifié | 🔴 P0 | ⚙️⚙️ | Prise en charge immédiate d'un inconnu (coma, détresse) avec identité provisoire, puis rattachement/fusion au dossier réel. |
| 1.4 | Rattacher un passage à un dossier patient | 🟠 P1 | ⚙️⚙️ | Résolution via `Patient-Identity-Service` (patientId + numeroPatient), réconciliation identité provisoire → définitive. |
| 1.5 | Enregistrer la provenance | 🟠 P1 | ⚙️ | CRUD `Provenance` (particulier/entreprise/institution) et lien au passage. |
| 1.6 | Mode d'arrivée & transport | 🟠 P1 | ⚙️ | `ArrivalMode` (walk-in, ambulance, SAMU, pompiers, police, transfert). |
| 1.7 | Modifier / clôturer / annuler un passage | 🔴 P0 | ⚙️ | Transitions de `UrgencyStatus`, contrôles de cohérence. |

## 2. Triage IOA (Infirmier Organisateur de l'Accueil)

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 2.1 | Réaliser un triage | 🔴 P0 | ⚙️⚙️ | Création d'un `Triage` : niveau (`TriageLevel` 1→5), plainte principale, `triagedBy`, `triagedAt`. |
| 2.2 | Relevé des constantes vitales | 🔴 P0 | ⚙️ | Température, FC, FR, TA sys/dia, SpO2, douleur (0-10), Glasgow. |
| 2.3 | Re-triage / réévaluation | 🟠 P1 | ⚙️⚙️ | Plusieurs triages par passage, historisés ; le dernier niveau remonte sur `EmergencyEncounter.triageLevel`. |
| 2.4 | Priorisation de la file d'attente | 🔴 P0 | ⚙️⚙️ | Tri par gravité + ancienneté ; le niveau 1 passe devant. Vue « qui voir maintenant ». |
| 2.5 | Calcul automatique du score de triage | 🟢 P2 | ⚙️⚙️⚙️ | Aide à la décision à partir des constantes (algorithme type FRENCH/ESI), suggestion de niveau. |
| 2.6 | Alerte détresse vitale | 🟠 P1 | ⚙️⚙️ | Déclenchement d'un événement/notification immédiat si niveau 1 ou constantes critiques. |

## 3. Prise en charge & parcours de soins

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 3.1 | Attribution médecin / soignant | 🔴 P0 | ⚙️ | `doctorId`, `triageNurseId`, prise en charge → `careStartDate`. |
| 3.2 | File d'attente temps réel par zone | 🟠 P1 | ⚙️⚙️ | Liste des patients en attente / en cours par zone (déchoc, box, UHCD). |
| 3.3 | Suivi du statut du passage | 🔴 P0 | ⚙️ | Machine à états `UrgencyStatus` (waiting → in_triage → in_care → … → discharged) avec transitions contrôlées. |
| 3.4 | Zone d'observation (UHCD) | 🟢 P2 | ⚙️⚙️ | Statut `OBSERVATION`, durée max, réévaluation programmée. |
| 3.5 | Départ sans attendre les soins | 🟠 P1 | ⚙️ | Statut `LEFT_WITHOUT_BEING_SEEN`, traçabilité (indicateur qualité). |

## 4. Mouvements & localisation

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 4.1 | Enregistrer un mouvement | 🔴 P0 | ⚙️ | `PatientMovement` : entrée/sortie, service origine/destination, motif, diagnostic. |
| 4.2 | Localisation courante du patient | 🔴 P0 | ⚙️ | `currentZoneId` / `currentBedId` mis à jour à chaque mouvement. |
| 4.3 | Historique de parcours complet | 🟠 P1 | ⚙️⚙️ | Timeline reconstituée à partir des mouvements (traçabilité médico-légale). |
| 4.4 | Transfert inter-services / vers hospitalisation | 🟠 P1 | ⚙️⚙️ | Mouvement de sortie + événement vers `Admission-service`. |

## 5. Gestion des lits & capacité

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 5.1 | Occupation / libération d'un lit | 🔴 P0 | ⚙️ | `BedOccupancy` : `occupiedAt`, `releasedAt`, `bedId`. |
| 5.2 | Plan de charge des urgences | 🟠 P1 | ⚙️⚙️ | Vue capacité (lits occupés/libres) en temps réel. |
| 5.3 | Alerte saturation | 🟢 P2 | ⚙️⚙️ | Seuil d'occupation dépassé → notification / plan blanc. |
| 5.4 | Réservation / affectation intelligente de lit | 🟢 P2 | ⚙️⚙️⚙️ | Suggestion du lit selon gravité, isolement, spécialité. |

## 6. Sortie & orientation

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 6.1 | Enregistrer la sortie | 🔴 P0 | ⚙️ | `DischargeInfo` : `outcome` (`DischargeOutcome`), destination, description, `dischargeDate`. |
| 6.2 | Orientation vers hospitalisation | 🔴 P0 | ⚙️⚙️ | Devenir `ADMITTED` → création/lien `admissionId` (event `Admission-service`). |
| 6.3 | Transfert externe | 🟠 P1 | ⚙️ | Établissement/service externe de destination, motif. |
| 6.4 | Déclaration de décès aux urgences | 🟠 P1 | ⚙️⚙️ | Statut `DECEASED`, circuit spécifique et traçabilité. |
| 6.5 | Compte rendu de passage (CRP) | 🟠 P1 | ⚙️⚙️ | Génération d'un document de sortie / consignes patient (PDF). |

## 7. Indicateurs & pilotage (temps urgence)

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 7.1 | Time to Admission (TA) | 🔴 P0 | ⚙️⚙️ | Délai arrivée → décision/admission ; calcul + stockage `timeToAdmission`. |
| 7.2 | Durée Moyenne de Séjour (DMS) | 🔴 P0 | ⚙️⚙️ | Durée passage arrivée → sortie ; `lengthOfStay` + agrégats. |
| 7.3 | Délai porte → triage / triage → médecin | 🟠 P1 | ⚙️⚙️ | Indicateurs intermédiaires calculés depuis `WaitDelay` et `Triage`. |
| 7.4 | Tableau de bord urgences | 🟠 P1 | ⚙️⚙️⚙️ | Stats agrégées : affluence, DMS, répartition par niveau de triage, taux LWBS. |
| 7.5 | Export / reporting réglementaire | 🟢 P2 | ⚙️⚙️ | Extractions périodiques (RPU-like), CSV/JSON. |
| 7.6 | Prévision d'affluence | 🟢 P2 | ⚙️⚙️⚙️ | Modèle prédictif (historique + saisonnalité) pour anticiper les pics. |

## 8. Intégrations inter-microservices

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 8.1 | Résolution d'identité patient | 🔴 P0 | ⚙️⚙️ | Appel `Patient-Identity-Service` (recherche, création provisoire). |
| 8.2 | Bascule vers admission | 🔴 P0 | ⚙️⚙️ | Émission d'un événement de création d'admission (`Admission-service`). |
| 8.3 | Bus d'événements / messagerie | 🟠 P1 | ⚙️⚙️⚙️ | Pub/sub (RabbitMQ/Kafka/NestJS microservices) pour découpler les services. |
| 8.4 | Saga / cohérence distribuée | 🟢 P2 | ⚙️⚙️⚙️ | Transactions distribuées passage↔admission↔facturation, compensation. |
| 8.5 | Réception SAMU / SMUR (pré-admission) | 🟢 P2 | ⚙️⚙️⚙️ | Annonce d'un patient avant arrivée, réservation ressources. |

## 9. Audit, sécurité & conformité

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 9.1 | Historisation des modifications | 🔴 P0 | ⚙️⚙️ | `UrgencyHistory` (old/new data JSONB) via subscriber TypeORM, comme `AdmissionHistory`. |
| 9.2 | Soft-delete généralisé | 🔴 P0 | ⚙️ | `deletedAt`/`deletedBy` sur toutes les entités (aucune suppression physique). |
| 9.3 | Traçabilité auteur | 🔴 P0 | ⚙️ | `createdBy`/`updatedBy`/`deletedBy` renseignés systématiquement. |
| 9.4 | Contrôle d'accès par rôle (RBAC) | 🟠 P1 | ⚙️⚙️ | IOA, médecin, agent d'accueil, cadre : permissions différenciées. |
| 9.5 | Journal d'activité (log_activity) | 🟠 P1 | ⚙️ | Trace des connexions/actions sensibles. |
| 9.6 | Confidentialité & anonymisation | 🟢 P2 | ⚙️⚙️ | Masquage des données pour statistiques, RGPD/secret médical. |

## 10. Socle technique & API

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 10.1 | Couche repository/service/controller | 🔴 P0 | ⚙️⚙️ | Même structure que `Admission-service` (modules controllers/services/repository). |
| 10.2 | Configuration TypeORM + migrations | 🔴 P0 | ⚙️⚙️ | `TypeOrmModule.forFeature([...])`, `DatabaseModule`, migrations versionnées. |
| 10.3 | Validation des entrées (DTO) | 🔴 P0 | ⚙️ | `class-validator` sur chaque endpoint, à l'image des validators existants. |
| 10.4 | Gestion d'erreurs normalisée | 🔴 P0 | ⚙️ | `messageError` centralisé (pattern déjà en place côté admission). |
| 10.5 | Documentation OpenAPI/Swagger | 🟠 P1 | ⚙️ | Description des endpoints. |
| 10.6 | Pagination / filtres / tri | 🟠 P1 | ⚙️⚙️ | Sur les listes (file d'attente, historique) via lib `Filter`. |
| 10.7 | Tests unitaires & e2e | 🟠 P1 | ⚙️⚙️ | Couverture services + parcours (le projet e2e `urgency-service-e2e` existe déjà). |
| 10.8 | Observabilité (logs/metrics/health) | 🟠 P1 | ⚙️⚙️ | Logger commun, healthcheck, métriques Prometheus. |

## 11. Fonctionnalités avancées / évolution future

| # | Fonctionnalité | Priorité | Cplx. | Détails |
|---|---|---|---|---|
| 11.1 | Tableau de bord temps réel (WebSocket) | 🟢 P2 | ⚙️⚙️⚙️ | Mise à jour live de la file, des lits et des alertes. |
| 11.2 | Interopérabilité HL7 / FHIR | 🟢 P2 | ⚙️⚙️⚙️ | Ressource `Encounter` FHIR, échange avec SI externes. |
| 11.3 | Notifications multi-canal | 🟢 P2 | ⚙️⚙️ | Push/SMS/e-mail (détresse, saturation, patient prêt). |
| 11.4 | Étiquettes / bracelets & QR code | 🟢 P2 | ⚙️⚙️ | Impression bracelet patient, scan pour identitovigilance. |
| 11.5 | Aide à la décision clinique | 🟢 P2 | ⚙️⚙️⚙️ | Suggestions protocoles selon triage/constantes. |
| 11.6 | Plan blanc / gestion de crise | 🟢 P2 | ⚙️⚙️⚙️ | Mode afflux massif (attentat, épidémie) : sur-triage, capacité étendue. |
| 11.7 | Intégration liste d'attente lits hôpital | 🟢 P2 | ⚙️⚙️⚙️ | Vue temps réel des lits d'aval pour fluidifier les admissions. |
| 11.8 | Satisfaction patient | 🟢 P2 | ⚙️ | Recueil post-passage (champs satisfaction déjà présents côté admissions). |

---

## Ordre de construction recommandé (MVP → cible)

1. **Socle** (10.1 → 10.4) + enregistrement passage (1.1, 1.2, 1.7).
2. **Triage** (2.1, 2.2, 2.4) et **statuts** (3.1, 3.3).
3. **Mouvements & lits** (4.1, 4.2, 5.1) + **sortie** (6.1, 6.2).
4. **Indicateurs** TA/DMS (7.1, 7.2) + **audit/historisation** (9.1 → 9.3).
5. **Intégrations** identité & admission (8.1, 8.2), puis bus d'événements (8.3).
6. **Pilotage** (7.3, 7.4), RBAC (9.4), tests/observabilité (10.7, 10.8).
7. **Évolutions** de la section 11 selon les besoins terrain.

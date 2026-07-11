# Cahier des Charges Détaillé - SIH (Patient & Urgences)

Ce document liste les champs et structures de base de données nécessaires à la construction des microservices **Identity / Master Patient Index (Dossiers)** et **Urgences**.

> [!NOTE]
> Le module Urgence ne possède pas de table propre dans l'architecture actuelle. Les données des urgences s'appuient sur l'entité `admissions` complétée par des processus de gestion de temps (Time to Admission - TA, Durée Moyenne de Séjour - DMS) via le contrôleur d'urgences. L'implémentation de la table `admissions` se trouve dans le cahier des charges Admissions.

## Module: Patient (Dossiers)

### Entité : `archiv_dossier`

**Table Principale :** `archiv_dossier`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `taille` | varchar | Non | 145 | - |
| `extension` | varchar | Non | 145 | - |
| `name` | varchar | Non | 145 | - |
| `type_doc` | varchar | Non | - | - |
| `type_doc_id` | int | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `date` | datetime | Non | - | - |
| `description` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |

### Entité : `compteur_dossier`

**Table Principale :** `compteur_dossier`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `date_c` | date | Oui | - | - |
| `nbr` | int | Oui | - | Def: 0 |

### Entité : `dossiers`

**Table Principale :** `dossiers`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `num_dossier` | varchar | Non | 45 | - |
| `ancien_num` | varchar | Non | 145 | - |
| `nom` | varchar | Oui | 45 | - |
| `prenom` | varchar | Oui | 145 | - |
| `tel` | varchar | Non | 20 | - |
| `tel_deux` | varchar | Non | 20 | - |
| `tel_parent` | varchar | Non | 145 | - |
| `email` | varchar | Non | 145 | - |
| `photo` | varchar | Non | 145 | - |
| `date_naiss` | date | Non | - | - |
| `lieu_naiss` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `sexe` | tinyint | Non | - | Def: 0 |
| `nom_pere` | varchar | Non | 145 | - |
| `nom_mere` | varchar | Non | 145 | - |
| `num_secu` | varchar | Non | 145 | - |
| `contact_parents` | varchar | Non | 145 | - |
| `liens_parents_id` | int | Non | - | - |
| `nationnalite_id` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `habitation_id` | int | Non | - | - |
| `civilite` | tinyint | Non | - | Def: 0 |
| `scanner` | int | Non | - | Def: 0 |
| `profession_id` | int | Non | - | - |
| `cagnotte` | int | Non | - | Def: 0 |
| `consultation_first_updated` | tinyint | Non | - | Def: 0 |

### Entité : `dossiers_select`

**Table Principale :** `dossiers`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `num_dossier` | varchar | Non | 45 | - |
| `ancien_num` | varchar | Non | 145 | - |
| `nom` | varchar | Oui | 45 | - |
| `prenom` | varchar | Oui | 145 | - |
| `tel` | varchar | Non | 20 | - |
| `tel_deux` | varchar | Non | 20 | - |
| `email` | varchar | Non | 145 | - |
| `photo` | varchar | Non | 145 | - |
| `date_naiss` | date | Non | - | - |
| `lieu_naiss` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `sexe` | tinyint | Non | - | Def: 0 |
| `nom_pere` | varchar | Non | 145 | - |
| `nom_mere` | varchar | Non | 145 | - |
| `num_secu` | varchar | Non | 145 | - |
| `liens_parents_id` | int | Non | - | - |
| `nationnalite_id` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `habitation_id` | int | Non | - | - |
| `civilite` | tinyint | Non | - | Def: 0 |
| `tel_parent` | varchar | Non | 145 | - |
| `contact_parents` | varchar | Non | 145 | - |
| `scanner` | int | Non | - | - |
| `profession_id` | int | Non | - | - |
| `value` | varchar | Non | 450 | - |

### Entité : `liens_parents`

**Table Principale :** `liens_parents`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `designation` | varchar | Oui | 145 | - |

### Entité : `log_activity`

**Table Principale :** `log_activity`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `logconnexion` | varchar | Oui | 50 | - |
| `log` | longtext | Oui | - | - |
| `created_at` | datetime | Non | - | - |

### Entité : `mouvementpatients`

**Table Principale :** `mouvementpatients`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `entreesortie` | tinyint | Non | - | Def: 1 |
| `dateheure` | date | Oui | - | - |
| `service_id` | int | Oui | - | - |
| `admission_id` | int | Oui | - | - |
| `service_id_provenance` | int | Non | - | - |
| `motif` | varchar | Non | 50 | - |
| `diagnostic` | varchar | Non | 50 | - |
| `provenance` | tinyint | Non | - | Def: 1 |

### Entité : `rdv_import`

**Table Principale :** `rdv_import`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `periode_type` | int | Non | - | - |
| `periode_nbr` | int | Non | - | - |
| `services_id` | int | Non | - | - |
| `dossier_id` | int | Non | - | - |
| `civilite` | int | Non | - | - |
| `sexe` | int | Non | - | - |
| `rdv` | int | Non | - | - |
| `nom_patient` | varchar | Oui | 145 | - |
| `prenom_patient` | varchar | Oui | 145 | - |
| `date_naiss` | date | Non | - | - |
| `age_patient` | int | Non | - | - |
| `lieu_naiss` | varchar | Non | 145 | - |
| `nationnalite_id` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `profession_id` | int | Non | - | - |
| `commune_id` | int | Non | - | - |
| `nom_pere` | varchar | Non | 145 | - |
| `nom_mere` | varchar | Non | 145 | - |
| `assurances_id` | int | Non | - | - |
| `taux_id` | int | Non | - | - |
| `etablissement_externe_id` | int | Non | - | - |
| `medecin_externe_id` | int | Non | - | - |
| `pathologie_id` | int | Non | - | - |
| `specialite_id` | int | Oui | - | - |
| `personne_a_contacter` | varchar | Non | 145 | - |
| `tel_parent` | varchar | Non | 11 | - |
| `acte_id` | int | Non | - | - |
| `acte_montant` | int | Non | - | - |
| `periode_id` | int | Non | - | - |
| `consultation_privee` | int | Oui | - | - |
| `consultation_public` | int | Oui | - | - |
| `nbre_rdv` | int | Oui | - | - |
| `medecin_id` | int | Oui | - | - |
| `date_rdv` | date | Oui | - | - |
| `heure_rdv` | time | Oui | - | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `file_attente` | tinyint | Non | - | Def: 0 |
| `statut_rdv` | tinyint | Non | - | Def: 0 |
| `num_rdv` | varchar | Non | 145 | - |
| `facture_id` | int | Non | - | - |
| `date_facturation` | datetime | Non | - | - |
| `date_encaissement` | datetime | Non | - | - |
| `numero_dossier` | varchar | Non | 145 | - |
| `patient` | varchar | Non | 255 | - |
| `medecin_consultant` | varchar | Non | 255 | - |
| `civilite_lib` | varchar | Non | 15 | - |

### Entité : `type_doc`

**Table Principale :** `type_doc`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `code` | varchar | Non | 100 | - |
| `designation` | varchar | Non | 145 | - |


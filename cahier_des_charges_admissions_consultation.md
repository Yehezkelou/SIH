# Cahier des Charges Détaillé - SIH (Admissions & Consultations)

Ce document constitue les spécifications fonctionnelles et techniques exhaustives pour les services d'Admission et de Consultation du Système d'Information Hospitalier (SIH).

## Documents Utilisés et Générés

### Module Admissions
- **Fiche d'Admission / Fiche Signalétique** : Imprimée lors de l'enregistrement du patient. Contient les données démographiques, informations sur l'assurance et le service ciblé.
- **Bordereaux d'engagement** : Pour les patients avec assurance, généré pour la prise en charge financière (cf. `engagement.dao`).
- **Compte-rendu d'Hospitalisation** : Édité à l'issue de l'admission ou lors de la sortie (`compterendu.classic.php`).
- **Étiquettes Patient** : Pour les dossiers physiques et prélèvements.

### Module Consultations
- **Ordonnances (Internes / Externes)** : Générées à partir de `ordonnanceinternes.classic.php` et `ordonnanceexternes.classic.php`.
- **Demandes d'Examens** : Bilans biologiques (`biologies.classic.php`), Examens d'imagerie (`imageries.classic.php`), Explorations fonctionnelles.
- **Compte-rendu de Consultation** : Résumé syndromique, antécédents, anamnèse, diagnostics et plan thérapeutique.
- **Correspondances Médicales** : Lettres d'orientation ou compte-rendus adressés aux confrères (`correspondance_patient.classic.php`).

---

## Modèles de Données et Champs (Schéma Exhaustif)

Les tableaux ci-dessous listent, pour chaque entité du système, les champs utilisés, leur type, leur caractère obligatoire et les liens avec les autres tables du système.

## Module: Admissions

### Entité : `admissions`

**Table Principale :** `admissions`

**Liens / Clés Étrangères :**
- Table liée : `assurances` (Clé : `assurances_id`)
- Table liée : `assureurs` (Clé : `assureurs_id`)
- Table liée : `taux` (Clé : `taux_id`)
- Table liée : `services` (Clé : `services_id`)
- Table liée : `dossiers` (Clé : `dossiers_id`)

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `num_admission` | varchar | Oui | 45 | - |
| `matricule` | varchar | Non | 125 | - |
| `date_debut` | date | Oui | - | - |
| `heure_debut` | time | Oui | - | - |
| `date_fin` | date | Non | - | - |
| `heure_fin` | time | Non | - | - |
| `hospitalisation` | tinyint | Non | - | Def: 0 |
| `nbr_jr` | int | Non | - | Def: 0 |
| `nom_patient` | varchar | Oui | 45 | Def: xxxxxx |
| `prenom_patient` | varchar | Oui | 145 | Def: xxxxxx |
| `date_naiss` | date | Non | - | - |
| `age_patient` | int | Non | - | - |
| `assurances_id` | int | Non | - | - |
| `assureurs_id` | int | Non | - | - |
| `verifdeces` | tinyint | Non | - | Def: 0 |
| `pas_satisfait` | tinyint | Non | - | Def: 0 |
| `moyennement_satisfait` | tinyint | Non | - | Def: 0 |
| `satisfait` | tinyint | Non | - | Def: 0 |
| `verif_evalue` | tinyint | Non | - | Def: 0 |
| `verif_bon_etat` | tinyint | Non | - | Def: 0 |
| `verif_transfert` | tinyint | Non | - | Def: 0 |
| `taux_id` | int | Non | - | - |
| `services_id` | int | Non | - | - |
| `profession_id` | int | Non | - | - |
| `provenance_id` | int | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `etablissement_externe_id` | int | Non | - | Def: 0 |
| `medecin_externe_id` | int | Non | - | Def: 0 |
| `serv_chirurgie` | int | Non | - | - |
| `id_updated_login_reception_urgence` | int | Non | - | - |
| `created_login` | varchar | Non | 255 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `deleted_login` | varchar | Non | 145 | - |
| `ferme` | tinyint | Non | - | Def: 0 |
| `termine` | tinyint | Non | - | Def: 0 |
| `cloture` | tinyint | Non | - | Def: 0 |
| `sexe` | tinyint | Non | - | Def: 0 |
| `montant_chambre` | int | Non | - | - |
| `chambre_id` | int | Non | - | Def: 0 |
| `type_examen` | tinyint | Non | - | Def: 0 |
| `prescription_id` | int | Non | - | - |
| `facture_complete_id` | int | Non | - | Def: 0 |
| `fichecomptable_id` | int | Non | - | Def: 0 |
| `Commentaire_satisfac` | varchar | Non | 200 | - |
| `rdv_id` | int | Non | - | - |
| `created_serv_id` | int | Non | - | - |
| `nom_pere` | varchar | Non | 145 | - |
| `nom_mere` | varchar | Non | 145 | - |
| `email` | varchar | Non | 145 | - |
| `tel` | varchar | Non | 30 | - |
| `tel_deux` | varchar | Non | 30 | - |
| `nationnalite_id` | int | Non | - | - |
| `habitation_id` | int | Non | - | - |
| `service_solicite` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `civilite` | tinyint | Non | - | Def: 0 |
| `transfert` | tinyint | Non | - | Def: 0 |
| `sejour_id` | int | Non | - | Def: 0 |
| `exclure_indicateur` | int | Non | - | Def: 0 |
| `date_exclusion` | date | Non | - | - |
| `id_exclu_par` | int | Non | - | - |
| `operer` | tinyint | Non | - | Def: 0 |
| `assure` | tinyint | Non | - | Def: 2 |
| `chang_lit` | tinyint | Non | - | Def: 0 |
| `assurance` | varchar | Non | - | ExtTable: assurances |
| `assureur` | varchar | Non | - | ExtTable: assureurs |
| `taux` | varchar | Non | - | ExtTable: taux |
| `service` | varchar | Non | - | ExtTable: services |
| `service_hospi` | int | Non | - | ExtTable: services |
| `service_marche` | int | Non | - | ExtTable: services |
| `service_consult` | int | Non | - | ExtTable: services |
| `service_urgence` | int | Non | - | ExtTable: services |
| `service_laboratoire_privee` | int | Non | - | ExtTable: services |
| `service_laboratoire` | int | Non | - | ExtTable: services |
| `service_imagerie` | int | Non | - | ExtTable: services |
| `service_imagerie_privee` | int | Non | - | ExtTable: services |
| `service_exploration` | int | Non | - | ExtTable: services |
| `service_pharmacie` | int | Non | - | ExtTable: services |
| `service_kine` | int | Non | - | ExtTable: services |
| `consultation` | int | Non | - | ExtTable: services |
| `dossier` | varchar | Non | - | ExtTable: dossiers |
| `ancien_num` | varchar | Non | - | ExtTable: dossiers |

### Entité : `admissions_select`

**Table Principale :** `admissions`

**Liens / Clés Étrangères :**
- Table liée : `assurances` (Clé : `assurances_id`)
- Table liée : `assureurs` (Clé : `assureurs_id`)
- Table liée : `taux` (Clé : `taux_id`)
- Table liée : `actes` (Clé : `chambre_id`)
- Table liée : `services` (Clé : `services_id`)
- Table liée : `dossiers` (Clé : `dossiers_id`)
- Table liée : `prescriptions` (Clé : `prescription_id`)
- Table liée : `profession` (Clé : `profession_id`)

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `num_admission` | varchar | Oui | 45 | - |
| `date_debut` | date | Oui | - | - |
| `date_fin` | date | Non | - | - |
| `hospitalisation` | tinyint | Non | - | Def: 0 |
| `nbr_jr` | int | Non | - | Def: 0 |
| `nom_patient` | varchar | Oui | 45 | Def: xxxxxx |
| `prenom_patient` | varchar | Oui | 145 | Def: xxxxxx |
| `date_naiss` | date | Non | - | - |
| `age_patient` | int | Non | - | - |
| `assurances_id` | int | Non | - | - |
| `assureurs_id` | int | Non | - | - |
| `taux_id` | int | Non | - | - |
| `services_id` | int | Non | - | - |
| `profession_id` | int | Non | - | - |
| `provenance_id` | int | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `ferme` | tinyint | Non | - | Def: 0 |
| `termine` | tinyint | Non | - | Def: 0 |
| `cloture` | tinyint | Non | - | Def: 0 |
| `verifdeces` | tinyint | Non | - | Def: 0 |
| `verif_transfert` | tinyint | Non | - | Def: 0 |
| `verif_bon_etat` | tinyint | Non | - | Def: 0 |
| `verif_evalue` | tinyint | Non | - | Def: 0 |
| `satisfait` | tinyint | Non | - | Def: 0 |
| `moyennement_satisfait` | tinyint | Non | - | Def: 0 |
| `pas_satisfait` | tinyint | Non | - | Def: 0 |
| `chambre_id` | int | Non | - | - |
| `montant_chambre` | int | Non | - | - |
| `type_examen` | tinyint | Non | - | Def: 0 |
| `Commentaire_satisfac` | varchar | Non | 150 | - |
| `rdv_id` | int | Non | - | - |
| `sexe` | tinyint | Non | - | Def: 0 |
| `tel` | varchar | Non | 30 | - |
| `tel_deux` | varchar | Non | 30 | - |
| `nom_pere` | varchar | Non | 145 | - |
| `nom_mere` | varchar | Non | 145 | - |
| `transfert` | tinyint | Non | - | Def: 0 |
| `civilite` | tinyint | Non | - | Def: 0 |
| `habitation_id` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `nationnalite_id` | int | Non | - | - |
| `sejour_id` | int | Non | - | Def: 0 |
| `matricule` | varchar | Non | 125 | - |
| `serv_chirurgie` | int | Non | - | - |
| `chang_lit` | tinyint | Non | - | Def: 0 |
| `consultation` | int | Non | - | ExtTable: services |
| `assurance` | varchar | Non | - | ExtTable: assurances |
| `assureur` | varchar | Non | - | ExtTable: assureurs |
| `taux` | varchar | Non | - | ExtTable: taux |
| `chambre` | varchar | Non | - | ExtTable: actes |
| `service` | varchar | Non | - | ExtTable: services |
| `service_hospi` | varchar | Non | - | ExtTable: services |
| `service_consult` | varchar | Non | - | ExtTable: services |
| `profession` | varchar | Non | - | ExtTable: profession |
| `dossier` | varchar | Non | - | ExtTable: dossiers |
| `an_dossier` | varchar | Non | - | ExtTable: dossiers |
| `prescrition_biologie` | tinyint | Non | - | ExtTable: prescriptions |
| `prescrition_radiologie` | tinyint | Non | - | ExtTable: prescriptions |

### Entité : `compteur_admission`

**Table Principale :** `compteur_admission`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `date_c` | date | Oui | - | - |
| `nbr` | int | Oui | - | Def: 0 |

### Entité : `delai_attente`

**Table Principale :** `delai_attente`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date_reception` | datetime | Oui | - | - |
| `id_admission` | int | Oui | - | - |
| `num_admission` | varchar | Oui | 255 | - |
| `id_personnel` | int | Oui | - | - |
| `id_updated_login_reception_urgence` | int | Non | - | - |

### Entité : `engagement`

**Table Principale :** `engagement`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Oui | - | - |
| `nom` | varchar | Oui | 145 | - |
| `prenom` | varchar | Oui | 145 | - |
| `tel` | varchar | Non | 20 | - |
| `montant_total` | int | Oui | - | - |
| `montant_paye` | int | Oui | - | - |
| `reste` | int | Oui | - | - |
| `num_admission` | varchar | Oui | 45 | - |
| `facture_complete_id` | int | Non | - | - |
| `date` | datetime | Non | - | - |
| `tel_deux` | varchar | Non | 20 | - |
| `liens_parents_id` | int | Non | - | - |

### Entité : `historique_black_liste`

**Table Principale :** `historique_black_liste`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `black_liste_id` | int | Non | - | - |
| `dossier_id` | int | Non | - | - |
| `created_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `status` | tinyint | Non | - | Def: 0 |
| `action` | varchar | Non | 145 | - |

### Entité : `info_sorties`

**Table Principale :** `info_sorties`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `deces` | tinyint | Non | - | Def: 0 |
| `transfert` | tinyint | Non | - | Def: 0 |
| `guerison` | tinyint | Non | - | Def: 0 |
| `evade` | tinyint | Non | - | Def: 0 |
| `autre` | tinyint | Non | - | Def: 0 |
| `etablissementexterne_id` | int | Non | 50 | Def:   |
| `serviceexterne_id` | int | Non | - | - |
| `serviceinterne_id` | int | Non | - | - |
| `description` | varchar | Non | 250 | - |
| `diagnostic_id` | int | Non | - | - |
| `autremotif_id` | int | Non | - | - |
| `date_sortie` | date | Non | - | - |
| `id_admission` | int | Oui | - | - |
| `num_admission` | varchar | Oui | 255 | - |
| `suppr` | int | Non | - | Def: 0 |
| `chang_lit` | tinyint | Non | - | Def: 0 |
| `created_login` | varchar | Non | 145 | - |

### Entité : `logtransfertdossier`

**Table Principale :** `logtransfertdossier`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `dossiers_idInitial` | int | Oui | - | - |
| `dossiers_idCible` | int | Oui | - | - |
| `id_personnel` | int | Oui | - | - |
| `date` | datetime | Oui | - | - |

### Entité : `log_activity`

**Table Principale :** `log_activity`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `logconnexion` | varchar | Oui | 50 | - |
| `log` | longtext | Oui | - | - |
| `created_at` | datetime | Non | - | - |

### Entité : `mutation_caution`

**Table Principale :** `mutation_caution`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `num_admin_origine` | varchar | Non | 255 | - |
| `num_admin_nouveau` | varchar | Non | 255 | - |
| `num_caution` | varchar | Non | 255 | - |
| `montant_caution` | int | Oui | - | Def: 0 |
| `id_personnel` | int | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `created_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 245 | - |
| `annuler_le` | datetime | Non | - | - |
| `aunnuler_par` | varchar | Non | 245 | - |
| `motif_annulation` | varchar | Non | 245 | - |
| `suppr` | tinyint | Non | - | Def: 0 |

### Entité : `occupation_lit`

**Table Principale :** `occupation_lit`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `admission_id` | int | Oui | - | - |
| `lit_id` | int | Oui | - | - |

### Entité : `provenance`

**Table Principale :** `provenance`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `provenance` | varchar | Oui | 145 | - |
| `tel` | varchar | Oui | 30 | - |
| `entreprise` | tinyint | Oui | - | Def: 0 |

### Entité : `table_black_liste`

**Table Principale :** `table_black_liste`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `dossier_id` | int | Non | - | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `status` | tinyint | Non | - | - |

### Entité : `table_compte_rendu_hospit`

**Table Principale :** `table_compte_rendu_hospit`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `dossier_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `taille` | int | Non | - | - |
| `medecin_id` | int | Non | - | - |
| `nom_medecin` | varchar | Non | 245 | - |
| `mode_entrer` | varchar | Non | 245 | - |
| `motif_hospit` | varchar | Non | 245 | - |
| `mode_sortie` | varchar | Non | 245 | - |
| `antecedent` | varchar | Non | 245 | - |
| `historique` | varchar | Non | 245 | - |
| `num_admission` | varchar | Non | 245 | - |
| `examen_clinique` | varchar | Non | 245 | - |
| `resultats_biologique` | varchar | Non | 245 | - |
| `resultats_complementaire` | varchar | Non | 245 | - |
| `diagnostic_principal` | varchar | Non | 245 | - |
| `diagnostic_associe` | varchar | Non | 245 | - |
| `traitement_transfusion` | varchar | Non | 245 | - |
| `evolution` | varchar | Non | 245 | - |
| `evenement_indesirable` | varchar | Non | 245 | - |
| `acte_medicaux` | varchar | Non | 245 | - |
| `prescription_sortie` | varchar | Non | 245 | - |
| `recommandation_medecin` | varchar | Non | 245 | - |
| `conclusion` | varchar | Non | 245 | - |

### Entité : `verrou_pharmacie`

**Table Principale :** `verrou_pharmacie`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `num_admission` | varchar | Oui | 45 | - |
| `verrou` | tinyint | Oui | - | - |

## Module: Consultation

### Entité : `allergies`

**Table Principale :** `allergies`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Non | - | - |
| `type_id` | int | Non | - | - |
| `produit_id` | int | Non | - | - |
| `allergie_id` | int | Non | - | - |
| `num_admission` | varchar | Oui | 255 | - |
| `dossiers_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |

### Entité : `anamnese_patient`

**Table Principale :** `anamnese_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `anamnese` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `antecedent_carnet`

**Table Principale :** `antecedent_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `hta` | tinyint | Non | - | - |
| `anciennete_hta` | int | Non | - | - |
| `traitement` | varchar | Non | 145 | - |
| `tabac` | tinyint | Non | - | - |
| `nbre_paquet_tabac` | int | Non | - | - |
| `diabete` | tinyint | Non | - | - |
| `anciennete_diabete` | int | Non | - | - |
| `type` | tinyint | Non | - | - |
| `traitement_diabete` | varchar | Non | 255 | - |
| `dyslipidemie` | tinyint | Non | - | - |
| `alcool` | tinyint | Non | - | - |
| `ulcere_gd` | tinyint | Non | - | - |
| `asthme` | tinyint | Non | - | - |
| `autre_type` | varchar | Non | 255 | - |
| `chirurgicaux` | varchar | Non | 255 | - |
| `menopause` | tinyint | Non | - | - |
| `contraception` | tinyint | Non | - | - |
| `precisez_contraception` | varchar | Non | 255 | - |
| `gestite` | varchar | Non | 145 | - |
| `parite` | varchar | Non | 145 | - |
| `apgar` | varchar | Non | 255 | - |
| `pn` | varchar | Non | 145 | - |
| `pc` | varchar | Non | 145 | - |
| `tn` | varchar | Non | 145 | - |
| `grossesse` | tinyint | Non | - | - |
| `precisez_grossesse` | varchar | Non | 255 | - |
| `accouchement` | tinyint | Non | - | - |
| `morbilite` | varchar | Non | 255 | - |
| `hta_bebe` | tinyint | Non | - | - |
| `accident_cardio` | varchar | Non | 255 | - |
| `autre` | varchar | Non | 255 | - |
| `date` | date | Oui | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `obesite` | tinyint | Non | - | - |
| `sedentarite` | tinyint | Non | - | - |
| `stress` | tinyint | Non | - | - |
| `alitement_prolonge` | tinyint | Non | - | - |
| `voyage_prolonge` | tinyint | Non | - | - |
| `cancer` | tinyint | Non | - | - |
| `chirurgie_recente` | tinyint | Non | - | - |
| `hta_familial` | tinyint | Non | - | - |
| `diabete_familial` | tinyint | Non | - | - |
| `avc_familial` | tinyint | Non | - | - |
| `mort_subite_familial` | tinyint | Non | - | - |
| `thrombophilie_familial` | tinyint | Non | - | - |
| `polyarthralgie` | tinyint | Non | - | - |
| `angine_a_repetition` | tinyint | Non | - | - |
| `prostate` | tinyint | Non | - | - |

### Entité : `antecedent_carnet_rattrapage`

**Table Principale :** `antecedent_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `hta` | tinyint | Non | - | - |
| `anciennete_hta` | int | Non | - | - |
| `traitement` | varchar | Non | 145 | - |
| `tabac` | tinyint | Non | - | - |
| `nbre_paquet_tabac` | int | Non | - | - |
| `diabete` | tinyint | Non | - | - |
| `anciennete_diabete` | int | Non | - | - |
| `type` | tinyint | Non | - | - |
| `traitement_diabete` | varchar | Non | 255 | - |
| `dyslipidemie` | tinyint | Non | - | - |
| `alcool` | tinyint | Non | - | - |
| `ulcere_gd` | tinyint | Non | - | - |
| `asthme` | tinyint | Non | - | - |
| `autre_type` | varchar | Non | 255 | - |
| `chirurgicaux` | varchar | Non | 255 | - |
| `menopause` | tinyint | Non | - | - |
| `contraception` | tinyint | Non | - | - |
| `precisez_contraception` | varchar | Non | 255 | - |
| `gestite` | varchar | Non | 145 | - |
| `parite` | varchar | Non | 145 | - |
| `apgar` | varchar | Non | 255 | - |
| `pn` | varchar | Non | 145 | - |
| `pc` | varchar | Non | 145 | - |
| `tn` | varchar | Non | 145 | - |
| `grossesse` | tinyint | Non | - | - |
| `precisez_grossesse` | varchar | Non | 255 | - |
| `accouchement` | tinyint | Non | - | - |
| `morbilite` | varchar | Non | 255 | - |
| `hta_bebe` | tinyint | Non | - | - |
| `accident_cardio` | varchar | Non | 255 | - |
| `autre` | varchar | Non | 255 | - |
| `date` | date | Oui | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `obesite` | tinyint | Non | - | - |
| `sedentarite` | tinyint | Non | - | - |
| `stress` | tinyint | Non | - | - |
| `alitement_prolonge` | tinyint | Non | - | - |
| `voyage_prolonge` | tinyint | Non | - | - |
| `cancer` | tinyint | Non | - | - |
| `chirurgie_recente` | tinyint | Non | - | - |
| `hta_familial` | tinyint | Non | - | - |
| `diabete_familial` | tinyint | Non | - | - |
| `avc_familial` | tinyint | Non | - | - |
| `mort_subite_familial` | tinyint | Non | - | - |
| `thrombophilie_familial` | tinyint | Non | - | - |
| `polyarthralgie` | tinyint | Non | - | - |
| `angine_a_repetition` | tinyint | Non | - | - |
| `prostate` | tinyint | Non | - | - |

### Entité : `autre_exploration`

**Table Principale :** `autre_exploration`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `autre_exploration` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `complication_patient`

**Table Principale :** `complication_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `complication` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `conclusion_carnet`

**Table Principale :** `conclusion_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `conclusion` | varchar | Non | 255 | - |
| `date` | date | Non | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `conclusion_id` | int | Non | - | - |

### Entité : `constantes`

**Table Principale :** `constantes`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `poids` | decimal | Non | - | - |
| `taille` | decimal | Non | - | - |
| `temp` | decimal | Non | - | - |
| `poul` | decimal | Non | - | - |
| `ta_a_bg` | int | Non | - | - |
| `ta_a_bd` | int | Non | - | - |
| `ta_b_bg` | int | Non | - | - |
| `ta_b_bd` | int | Non | - | - |
| `sa_o_2` | decimal | Non | - | - |
| `durese` | decimal | Non | - | - |
| `i_m_c` | decimal | Non | - | - |
| `f_r` | decimal | Non | - | - |
| `date` | datetime | Non | - | - |
| `admission_id` | int | Oui | - | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |

### Entité : `consultation`

**Table Principale :** `consultation`

**Liens / Clés Étrangères :**
- Table liée : `prescriptions` (Clé : `id`)

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `code` | varchar | Oui | 45 | - |
| `valeur` | longtext | Oui | - | - |
| `qte_prescr` | varchar | Non | 255 | - |
| `posologie` | varchar | Non | 255 | - |
| `frequence` | varchar | Non | 255 | - |
| `duree` | varchar | Non | 255 | - |
| `constante` | tinyint | Non | - | Def: 0 |
| `antecedent` | tinyint | Non | - | Def: 0 |
| `symptome` | tinyint | Non | - | Def: 0 |
| `ex_cliniq` | tinyint | Non | - | Def: 0 |
| `diagnostic` | tinyint | Non | - | Def: 0 |
| `allergie` | tinyint | Non | - | Def: 0 |
| `biologie` | tinyint | Non | - | - |
| `imagerie` | tinyint | Non | - | Def: 0 |
| `expl_fonct` | tinyint | Non | - | Def: 0 |
| `traitement` | tinyint | Non | - | Def: 0 |
| `acte_medic` | tinyint | Non | - | Def: 0 |
| `ord_int` | tinyint | Non | - | Def: 0 |
| `ord_ext` | tinyint | Non | - | Def: 0 |
| `evolution` | tinyint | Non | - | Def: 0 |
| `conclusion` | tinyint | Non | - | Def: 0 |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `admission_id` | int | Oui | - | - |
| `diagnostic_id` | int | Non | - | - |
| `diagnostic_traitement_id` | int | Non | - | - |
| `diagnostic_type` | tinyint | Non | - | - |
| `facture_id` | int | Non | - | - |
| `commentaire` | varchar | Non | 255 | - |
| `incident` | tinyint | Non | - | Def: 0 |
| `incident_medicament` | tinyint | Non | - | Def: 0 |
| `num_admission` | varchar | Non | 45 | - |
| `chambre` | tinyint | Non | - | Def: 0 |
| `kine` | tinyint | Non | - | - |
| `hemo` | tinyint | Non | - | - |
| `service_id` | int | Non | - | - |
| `prelevement_id` | varchar | Non | - | ExtTable: prescriptions |

### Entité : `consultation_dietetique`

**Table Principale :** `consultation_dietetique`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `lundi` | varchar | Non | 255 | - |
| `mardi` | varchar | Non | 255 | - |
| `mercredi` | varchar | Non | 255 | - |
| `jeudi` | varchar | Non | 255 | - |
| `vendredi` | varchar | Non | 255 | - |
| `samedi` | varchar | Non | 255 | - |
| `dimanche` | varchar | Non | 255 | - |
| `suggestions` | varchar | Non | 255 | - |
| `motif_clinique` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | datetime | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `consultation_rattrapage`

**Table Principale :** `consultation`

**Liens / Clés Étrangères :**
- Table liée : `prescriptions` (Clé : `id`)

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `code` | varchar | Oui | 45 | - |
| `valeur` | longtext | Oui | - | - |
| `qte_prescr` | varchar | Non | 255 | - |
| `posologie` | varchar | Non | 255 | - |
| `frequence` | varchar | Non | 255 | - |
| `duree` | varchar | Non | 255 | - |
| `constante` | tinyint | Non | - | Def: 0 |
| `antecedent` | tinyint | Non | - | Def: 0 |
| `symptome` | tinyint | Non | - | Def: 0 |
| `ex_cliniq` | tinyint | Non | - | Def: 0 |
| `diagnostic` | tinyint | Non | - | Def: 0 |
| `allergie` | tinyint | Non | - | Def: 0 |
| `biologie` | tinyint | Non | - | - |
| `imagerie` | tinyint | Non | - | Def: 0 |
| `expl_fonct` | tinyint | Non | - | Def: 0 |
| `traitement` | tinyint | Non | - | Def: 0 |
| `acte_medic` | tinyint | Non | - | Def: 0 |
| `ord_int` | tinyint | Non | - | Def: 0 |
| `ord_ext` | tinyint | Non | - | Def: 0 |
| `evolution` | tinyint | Non | - | Def: 0 |
| `conclusion` | tinyint | Non | - | Def: 0 |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `updated_login` | varchar | Non | 145 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 145 | - |
| `suppr` | tinyint | Non | - | Def: 0 |
| `admission_id` | int | Oui | - | - |
| `diagnostic_id` | int | Non | - | - |
| `diagnostic_traitement_id` | int | Non | - | - |
| `diagnostic_type` | tinyint | Non | - | - |
| `facture_id` | int | Non | - | - |
| `commentaire` | varchar | Non | 255 | - |
| `incident` | tinyint | Non | - | Def: 0 |
| `incident_medicament` | tinyint | Non | - | Def: 0 |
| `num_admission` | varchar | Non | 45 | - |
| `chambre` | tinyint | Non | - | Def: 0 |
| `kine` | tinyint | Non | - | - |
| `hemo` | tinyint | Non | - | - |
| `service_id` | int | Non | - | - |
| `prelevement_id` | varchar | Non | - | ExtTable: prescriptions |

### Entité : `consultation_suivante`

**Table Principale :** `consultation_suivante`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | datetime | Non | - | - |
| `poids` | int | Non | - | - |
| `sf` | varchar | Non | 255 | - |
| `ta_couche_bg` | int | Non | - | - |
| `ta_couche_bd` | int | Non | - | - |
| `ta_debout_bg` | int | Non | - | - |
| `ta_debout_bd` | int | Non | - | - |
| `valeur_ta_couche_bg_a` | int | Non | - | - |
| `valeur_ta_couche_bd_a` | int | Non | - | - |
| `valeur_ta_debout_bg_a` | int | Non | - | - |
| `valeur_ta_debout_bd_a` | int | Non | - | - |
| `valeur_ta_couche_bg_b` | int | Non | - | - |
| `valeur_ta_couche_bd_b` | int | Non | - | - |
| `valeur_ta_debout_bg_b` | int | Non | - | - |
| `valeur_ta_debout_bd_b` | int | Non | - | - |
| `frequence_cardiaque` | varchar | Non | 255 | - |
| `pouls` | tinyint | Non | - | - |
| `precisez_pouls` | varchar | Non | 255 | - |
| `insuffisance_cardiaque` | tinyint | Non | - | - |
| `precisez_insuffisance_cardiaque` | varchar | Non | 255 | - |
| `bdc` | varchar | Non | 255 | - |
| `autre` | varchar | Non | 255 | - |
| `total` | varchar | Non | 255 | - |
| `traitement_propose` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | datetime | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `consultation_termine`

**Table Principale :** `consultation_termine`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `prescriptions_id` | int | Oui | - | - |
| `statut_termine` | tinyint | Oui | - | Def: 0 |
| `date_fin_consult` | datetime | Non | - | - |
| `carnet_correctement_renseigne` | tinyint | Oui | - | Def: 0 |
| `rdv_id` | int | Non | - | Def: NULL |

### Entité : `correspondance_echanger`

**Table Principale :** `correspondance_echanger`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `correspondance` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `diagnostic_carnet`

**Table Principale :** `diagnostic_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `diagnostic` | int | Oui | - | - |
| `type` | tinyint | Oui | - | Def: 0 |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `diagnostic_definitif_patient`

**Table Principale :** `diagnostic_definitif_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `diagnostic_definitif` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `diagnostic_lesionnel_patient`

**Table Principale :** `diagnostic_lesionnel_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `diagnostic_lesionnel` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `ecg_realiser`

**Table Principale :** `ecg_realiser`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | datetime | Oui | - | - |
| `interpretation` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 255 | - |
| `dossiers_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | datetime | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |

### Entité : `electrocardiogramme_patient`

**Table Principale :** `electrocardiogramme_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `electrocardiogramme` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `etat_general_patient`

**Table Principale :** `etat_general_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `etat_general` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `evenement_indesirable_grave`

**Table Principale :** `evenement_indesirable_grave`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `admission_id` | int | Oui | - | - |
| `num_admission` | varchar | Oui | 255 | - |
| `jour_id` | int | Oui | - | - |
| `date` | datetime | Oui | - | - |
| `infections_nosocomiales` | int | Oui | - | Def: 0 |
| `accidents_medicamenteux` | int | Oui | - | Def: 0 |
| `accidents_transfusionnels` | int | Oui | - | Def: 0 |
| `accidents_exploration_au_sang` | int | Oui | - | Def: 0 |
| `autres_a_preciser` | int | Oui | - | Def: 0 |
| `services_id` | int | Oui | - | - |
| `suppr` | int | Oui | - | Def: 0 |
| `created_at` | datetime | Non | - | - |
| `updated_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 255 | - |
| `updated_login` | varchar | Non | 255 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 255 | - |

### Entité : `examen_biologique_patient`

**Table Principale :** `examen_biologique_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `examen_biologique` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `examen_carnet`

**Table Principale :** `examen_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | datetime | Non | - | - |
| `etat_general` | tinyint | Non | - | - |
| `pediatrie` | tinyint | Non | - | - |
| `poids` | int | Non | - | - |
| `taille` | int | Non | - | - |
| `conjonctive` | tinyint | Non | - | - |
| `ta_couche_bg` | int | Non | - | - |
| `ta_couche_bd` | int | Non | - | - |
| `ta_debout_bg` | int | Non | - | - |
| `ta_debout_bd` | int | Non | - | - |
| `valeur_ta_couche_bg_a` | int | Non | - | - |
| `valeur_ta_couche_bd_a` | int | Non | - | - |
| `valeur_ta_debout_bg_a` | int | Non | - | - |
| `valeur_ta_debout_bd_a` | int | Non | - | - |
| `valeur_ta_couche_bg_b` | int | Non | - | - |
| `valeur_ta_couche_bd_b` | int | Non | - | - |
| `valeur_ta_debout_bg_b` | int | Non | - | - |
| `valeur_ta_debout_bd_b` | int | Non | - | - |
| `frequence_cardiaque` | varchar | Non | 255 | - |
| `pouls` | tinyint | Non | - | - |
| `precisez_pouls` | varchar | Non | 255 | - |
| `insuffisance_cardiaque` | tinyint | Non | - | - |
| `precisez_insuffisance_cardiaque` | varchar | Non | 255 | - |
| `ausculation` | varchar | Non | 255 | - |
| `autre` | varchar | Non | 255 | - |
| `ecg` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | datetime | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `examen_physique_patient`

**Table Principale :** `examen_physique_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `examen_physique` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `histoire_maladie`

**Table Principale :** `histoire_maladie`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `histoire` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `hypothese_patient`

**Table Principale :** `hypothese_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `positif` | varchar | Oui | 255 | - |
| `negatif` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `log_activity`

**Table Principale :** `log_activity`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `logconnexion` | varchar | Oui | 50 | - |
| `log` | longtext | Oui | - | - |
| `created_at` | datetime | Non | - | - |

### Entité : `motif_patient`

**Table Principale :** `motif_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Non | - | - |
| `motif` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 255 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |
| `motif_id` | int | Non | - | - |

### Entité : `nature_soin_patient`

**Table Principale :** `nature_soin_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `nature_soin` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `objectif_therapeutique_patient`

**Table Principale :** `objectif_therapeutique_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `objectif_therapeutique` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `observation_infirmier`

**Table Principale :** `observation_infirmier`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `observation` | varchar | Oui | 255 | - |
| `date_heure` | datetime | Oui | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |

### Entité : `orientation_patient`

**Table Principale :** `orientation_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `orientation` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `probleme_patient`

**Table Principale :** `probleme_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `probleme` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `prochain_rdv`

**Table Principale :** `prochain_rdv`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `periode_id` | int | Non | - | - |
| `date_rdv` | date | Oui | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Oui | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `radiographie_patient`

**Table Principale :** `radiographie_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `radiographie` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `resume_syndromique_patient`

**Table Principale :** `resume_syndromique_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `resume` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `sdi_analyse`

**Table Principale :** `sdi_analyse`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `autonome_toilette` | tinyint | Oui | - | Def: 0 |
| `partiel_toilette` | tinyint | Oui | - | Def: 0 |
| `dependant_toilette` | tinyint | Oui | - | Def: 0 |
| `autonome_bouche` | tinyint | Oui | - | Def: 0 |
| `dependant_bouche` | tinyint | Oui | - | Def: 0 |
| `cheveux_phanere` | tinyint | Oui | - | Def: 0 |
| `ongles_phanere` | tinyint | Oui | - | Def: 0 |
| `barbe_phanere` | tinyint | Oui | - | Def: 0 |
| `autonome_mobilite` | tinyint | Oui | - | Def: 0 |
| `aide_mobilite` | tinyint | Oui | - | Def: 0 |
| `alite_mobilite` | tinyint | Oui | - | Def: 0 |
| `prevention` | tinyint | Oui | - | Def: 0 |
| `mobilisation` | tinyint | Oui | - | Def: 0 |
| `normal_regime` | tinyint | Oui | - | Def: 0 |
| `hyposode_regime` | tinyint | Oui | - | Def: 0 |
| `diabetique_regime` | tinyint | Oui | - | Def: 0 |
| `autre_regime` | tinyint | Oui | - | Def: 0 |
| `precision_regime` | varchar | Non | 255 | - |
| `normal_consistance` | tinyint | Oui | - | Def: 0 |
| `semi_liquide_consistance` | tinyint | Oui | - | Def: 0 |
| `liquide_consistance` | tinyint | Oui | - | Def: 0 |
| `autonome_autonomie` | tinyint | Oui | - | Def: 0 |
| `aide_autonomie` | tinyint | Oui | - | Def: 0 |
| `autonome_mode` | tinyint | Oui | - | Def: 0 |
| `aide_mode` | tinyint | Oui | - | Def: 0 |
| `urinal_mode` | tinyint | Oui | - | Def: 0 |
| `bassin_mode` | tinyint | Oui | - | Def: 0 |
| `couche_mode` | tinyint | Oui | - | Def: 0 |
| `peniflo_incontinence` | tinyint | Oui | - | Def: 0 |
| `sonde_incontinence` | tinyint | Oui | - | Def: 0 |
| `poche_incontinence` | tinyint | Oui | - | Def: 0 |
| `couche_incontinence` | tinyint | Oui | - | Def: 0 |
| `autonome_modalite` | tinyint | Oui | - | Def: 0 |
| `oxygene_modalite` | tinyint | Oui | - | Def: 0 |
| `intubation_modalite` | tinyint | Oui | - | Def: 0 |
| `tracheotomie_modalite` | tinyint | Oui | - | Def: 0 |
| `ventilation_modalite` | tinyint | Oui | - | Def: 0 |
| `aspiration_geste` | tinyint | Oui | - | Def: 0 |
| `aerosol_geste` | tinyint | Oui | - | Def: 0 |
| `conscient_etat` | tinyint | Oui | - | Def: 0 |
| `inconscient_etat` | tinyint | Oui | - | Def: 0 |
| `verbal_langage` | tinyint | Oui | - | Def: 0 |
| `signe_langage` | tinyint | Oui | - | Def: 0 |
| `cooperatif_etat` | tinyint | Oui | - | Def: 0 |
| `agressif_etat` | tinyint | Oui | - | Def: 0 |
| `dossiers_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `date_heure` | datetime | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | datetime | Non | - | - |
| `toilette` | tinyint | Oui | - | Def: 0 |
| `soins_de_bouche` | tinyint | Oui | - | Def: 0 |
| `soins_des_phanere` | tinyint | Oui | - | Def: 0 |
| `mobilite` | tinyint | Oui | - | Def: 0 |
| `confort` | tinyint | Oui | - | Def: 0 |
| `regime` | tinyint | Oui | - | Def: 0 |
| `consistance` | tinyint | Oui | - | Def: 0 |
| `autonomie` | tinyint | Oui | - | Def: 0 |
| `mode` | tinyint | Oui | - | Def: 0 |
| `incontinence` | tinyint | Oui | - | Def: 0 |
| `modalite` | tinyint | Oui | - | Def: 0 |
| `geste` | tinyint | Oui | - | Def: 0 |
| `etat` | tinyint | Oui | - | Def: 0 |
| `langage` | tinyint | Oui | - | Def: 0 |
| `relationnel` | tinyint | Oui | - | Def: 0 |

### Entité : `sdm_patient`

**Table Principale :** `sdm_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `nom_patient` | varchar | Oui | 255 | - |
| `prenom_patient` | varchar | Oui | 255 | - |
| `groupe_resus` | varchar | Non | 255 | - |
| `sexe` | int | Non | - | - |
| `date_naiss` | date | Non | - | - |
| `taille` | int | Non | - | - |
| `medecin_id` | int | Non | - | - |
| `date_arrivee` | datetime | Non | - | - |
| `num_admission` | varchar | Non | 145 | - |
| `referent_choix` | tinyint | Non | - | - |
| `referent` | varchar | Non | 255 | - |
| `provenance_choix` | tinyint | Oui | - | - |
| `etablissement_choix` | tinyint | Non | - | - |
| `etablissement` | varchar | Non | 255 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `profession_id` | int | Non | - | - |
| `age_patient` | int | Non | - | - |
| `tel` | varchar | Non | 30 | - |
| `nationnalite_id` | int | Non | - | - |
| `habitation_id` | int | Non | - | - |
| `ethnie_id` | int | Non | - | - |
| `adresse_par` | varchar | Non | 145 | - |
| `email` | varchar | Non | 145 | - |
| `race` | tinyint | Non | - | - |

### Entité : `signe_fonctionnel`

**Table Principale :** `signe_fonctionnel`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `designation` | varchar | Non | 255 | - |
| `created_at` | datetime | Non | - | - |
| `created_login` | varchar | Non | 50 | - |
| `updated_at` | datetime | Non | - | - |
| `updated_login` | varchar | Non | 50 | - |
| `deleted_at` | datetime | Non | - | - |
| `deleted_login` | varchar | Non | 50 | - |
| `suppr` | tinyint | Non | - | Def: 0 |

### Entité : `signe_fonctionnel_donnees`

**Table Principale :** `signe_fonctionnel_donnees`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `signe_fonctionnel_id` | int | Non | - | - |
| `num_admission` | varchar | Non | 145 | - |
| `valeur` | varchar | Non | 145 | - |
| `created_at` | datetime | Non | - | - |
| `date` | date | Non | - | - |
| `created_login` | varchar | Non | 50 | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `personnel_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |

### Entité : `soin_patient`

**Table Principale :** `soin_patient`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `soin` | varchar | Oui | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `admission_id` | int | Non | - | - |

### Entité : `suivi_biologique`

**Table Principale :** `suivi_biologique`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Non | - | - |
| `nfs_gb` | varchar | Non | 255 | - |
| `nfs_hb` | varchar | Non | - | - |
| `nfs_dgm` | varchar | Non | 255 | - |
| `nfs_tcmh` | varchar | Non | 255 | - |
| `uree` | varchar | Non | 255 | - |
| `creat` | varchar | Non | 255 | - |
| `glycemie` | varchar | Non | 255 | - |
| `triglyc` | varchar | Non | 255 | - |
| `uricemie` | varchar | Non | 255 | - |
| `chol_total` | varchar | Non | 255 | - |
| `chol_hdl` | varchar | Non | 255 | - |
| `chol_ldl` | varchar | Non | 255 | - |
| `na_plus` | varchar | Non | 255 | - |
| `k_plus` | varchar | Non | 255 | - |
| `crp` | varchar | Non | 255 | - |
| `proteine` | varchar | Non | 255 | - |
| `glucosurie` | varchar | Non | 255 | - |
| `cetonurie` | varchar | Non | 255 | - |
| `hb_glyque` | varchar | Non | 255 | - |
| `asat` | varchar | Non | 255 | - |
| `alat` | varchar | Non | 255 | - |
| `ecbu` | varchar | Non | 255 | - |
| `autre` | varchar | Non | 255 | - |
| `num_admission` | varchar | Non | 145 | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 255 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 255 | - |
| `updated_at` | date | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Oui | - | - |
| `nom_prenom` | varchar | Oui | 145 | - |

### Entité : `suivi_ecg`

**Table Principale :** `suivi_ecg`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `observation` | varchar | Non | 255 | - |
| `traitement` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Oui | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `dossiers_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `suivi_echo`

**Table Principale :** `suivi_echo`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `vg_d` | varchar | Non | 145 | - |
| `vg_s` | varchar | Non | 145 | - |
| `og` | varchar | Non | 145 | - |
| `ps_d` | varchar | Non | 145 | - |
| `ps_s` | varchar | Non | 145 | - |
| `pp_d` | varchar | Non | 145 | - |
| `pp_s` | varchar | Non | 145 | - |
| `fd_n` | varchar | Non | 145 | - |
| `fd_alt` | varchar | Non | 145 | - |
| `fe` | varchar | Non | 145 | - |
| `fr` | varchar | Non | 145 | - |
| `autre` | varchar | Non | 145 | - |
| `conclusion` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `suivi_vasculaire`

**Table Principale :** `suivi_vasculaire`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `echo_veineux_menbre_inferieur` | varchar | Non | 255 | - |
| `echo_arteriel_membre_inferieur` | varchar | Non | 255 | - |
| `echo_tronc_supraaortique` | varchar | Non | 255 | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |

### Entité : `traitement_carnet`

**Table Principale :** `traitement_carnet`

| Nom du Champ | Type | Obligatoire | Longueur max | Notes |
|---|---|---|---|---|
| `id` | int | Non | - | AutoInc |
| `date` | date | Oui | - | - |
| `pathologie_id` | int | Non | - | - |
| `traitement_id` | int | Non | - | - |
| `num_admission` | varchar | Oui | 145 | - |
| `dossiers_id` | int | Non | - | - |
| `service_id` | int | Non | - | - |
| `personnel_id` | int | Non | - | - |
| `nom_prenom` | varchar | Non | 145 | - |
| `created_login` | varchar | Non | 145 | - |
| `created_at` | date | Non | - | - |
| `updated_login` | varchar | Non | 145 | - |
| `updated_at` | date | Non | - | - |




// niveau de triage / gravite a l'accueil des urgences (echelle a 5 niveaux type CCMU/CIMU)
export enum TriageLevel {
    LEVEL_1 = "LEVEL_1", // reanimation / detresse vitale immediate
    LEVEL_2 = "LEVEL_2", // tres urgent / atteinte fonctionnelle grave
    LEVEL_3 = "LEVEL_3", // urgent / etat stable pouvant se degrader
    LEVEL_4 = "LEVEL_4", // peu urgent / lesion localisee
    LEVEL_5 = "LEVEL_5", // non urgent / consultation simple
}

// statut du passage aux urgences
export enum UrgencyStatus {
    WAITING = "WAITING",                             // en salle d'attente (avant triage)
    IN_TRIAGE = "IN_TRIAGE",                          // en cours de triage IOA
    WAITING_FOR_CARE = "WAITING_FOR_CARE",           // triage fait, en attente de prise en charge
    IN_CARE = "IN_CARE",                             // en cours de prise en charge medicale
    OBSERVATION = "OBSERVATION",                     // en observation (UHCD)
    ADMITTED = "ADMITTED",                           // admis en hospitalisation
    DISCHARGED = "DISCHARGED",                       // sortie / retour domicile
    TRANSFERRED = "TRANSFERRED",                     // transfere vers un autre etablissement
    LEFT_WITHOUT_BEING_SEEN = "LEFT_WITHOUT_BEING_SEEN", // parti sans attendre les soins
    DECEASED = "DECEASED",                           // deces aux urgences
}

// mode d'arrivee du patient aux urgences
export enum ArrivalMode {
    WALK_IN = "WALK_IN",           // par ses propres moyens
    AMBULANCE = "AMBULANCE",       // ambulance
    SAMU = "SAMU",                 // SAMU / SMUR
    FIRE_BRIGADE = "FIRE_BRIGADE", // pompiers
    POLICE = "POLICE",             // police / gendarmerie
    TRANSFER = "TRANSFER",         // transfert d'un autre etablissement
    OTHER = "OTHER",
}

// devenir du patient a la sortie des urgences (equivalent info_sorties)
export enum DischargeOutcome {
    RECOVERED = "RECOVERED",     // guerison / retour domicile
    ADMITTED = "ADMITTED",       // hospitalisation
    TRANSFERRED = "TRANSFERRED", // transfert
    DECEASED = "DECEASED",       // deces
    ESCAPED = "ESCAPED",         // evade / parti
    OTHER = "OTHER",
}

// sens du mouvement du patient (equivalent entreesortie de mouvementpatients)
export enum MovementDirection {
    ENTRY = "ENTRY", // entree dans un service / une zone
    EXIT = "EXIT",   // sortie d'un service / d'une zone
}

// nature de la provenance du patient
export enum ProvenanceType {
    INDIVIDUAL = "INDIVIDUAL", // particulier
    COMPANY = "COMPANY",       // entreprise
    INSTITUTION = "INSTITUTION", // etablissement / institution
}

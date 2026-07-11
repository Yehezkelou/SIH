

// cela concerne le status de l'admission 
export enum AdmissionStatus  {
    PENDING = "PENDING", // en cours
    ADMITTED = "ADMITTED", // confirmé
    DISCHARGED = "DISCHARGED", // termine sortie
    CANCELLED  = "CANCELLED", // annulé
    PRE_ADMITTED = "PRE_ADMITTED", // pré-confirmé
    REGISTERED = "REGISTERED", // enregistré
    WAIT_FOR_CAR = "WAIT_FOR_CAR", // en attente de transport
    CLOSED = "CLOSED", // fermé
    DISCHARGED_PENDING = "DISCHARGED_PENDING", // en attente de sortie
    TRANSFERED = "TRANSFERED", // transféré
    
}

// cela concerne le type d'admission 
export enum AdmissionType  {
    INPATIENT = "INPATIENT",
    OUTPATIENT = "OUTPATIENT",
    EMERGENCY = "EMERGENCY",
}

// cela concerne le type de document d'admission
export enum AdmissionDocumentType {
    PIECE_IDENTIE = "PIECE_IDENTIE",
    CARTE_ASSURANCE = "CARTE_ASSURANCE",
    ORDONNANCE = "ORDONNANCE",
    AUTRE = "AUTRE",
}

// cela concerne le payeur de l'admission
export enum AdmissionPayerType {
    PATIENT = "PATIENT",
    INSURANCE = "INSURANCE",
    COMPANY = "COMPANY",
}


// cela concerne le type de mouvement de l'encounter 
export enum MovementType {
    ADMISSION = "ADMISSION",
    TRANSFER = "TRANSFER",
    DISCHARGE = "DISCHARGE",
}

export enum EncounterStatus{
    ENCOUNTER_PENDING = "ENCOUNTER_PENDING",
    ENCOUNTER_ADMITTED = "ENCOUNTER_ADMITTED",
    ENCOUNTER_DISCHARGED = "ENCOUNTER_DISCHARGED",
    ENCOUNTER_CANCELLED = "ENCOUNTER_CANCELLED",
    ENCOUNTER_PRE_ADMITTED = "ENCOUNTER_PRE_ADMITTED",
    ENCOUNTER_REGISTERED = "ENCOUNTER_REGISTERED",
    ENCOUNTER_WAIT_FOR_CAR = "ENCOUNTER_WAIT_FOR_CAR",
    ENCOUNTER_CLOSED = "ENCOUNTER_CLOSED",
    ENCOUNTER_DISCHARGED_PENDING = "ENCOUNTER_DISCHARGED_PENDING", 
    ENCOUNTER_TRANSFERED = "ENCOUNTER_TRANSFERED",
    
}
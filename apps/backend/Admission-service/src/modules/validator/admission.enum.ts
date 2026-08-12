

// cela concerne le status de l'admission 
export const  AdmissionStatus = {
    // PENDING : le dossier d'admission est en cours
    PENDING : "PENDING",

    // AMITTED : le patient est prise en charge par l'equipe soin
    ADMITTED : "ADMITTED",

    // le patient a quitté l'hopital
    DISCHARGED : "DISCHARGED",

    // le dossier d'admission a été annulé
    CANCELLED  : "CANCELLED",

    // PRE_ADMITTED : le dossier d'admission es programmé et planifiée a l'avance 
    PRE_ADMITTED : "PRE_ADMITTED",

    // REGISTERED : le patient est est arrivé physiquement
    REGISTERED : "REGISTERED",

    // le patient attend peut etre un taxi ou une famille avant de quitté 
    // WAIT_FOR_CAR : "WAIT_FOR_CAR",

    // le dossier est clo a tout les niveau 
    CLOSED : "CLOSED",

    // le medecin a validé la sortie mais le patient n'a pas encore quitté l'hopitale
    DISCHARGED_PENDING : "DISCHARGED_PENDING", 

    // TRANSFERED : le patient a ete transfére dans un autre service
    TRANSFERED : "TRANSFERED",
    
} as const 

// cela concerne le type d'admission 
// IN pour une hospitalisation 
// OUT pour une entré de consultation simplement
// EMER pour une urgence
export const AdmissionType = {
    INPATIENT : "INPATIENT",
    OUTPATIENT : "OUTPATIENT",
    EMERGENCY : "EMERGENCY",
} as const 

// cela concerne le type de document d'admission
export const AdmissionDocumentType = {
    PIECE_IDENTIE : "PIECE_IDENTIE",
    CARTE_ASSURANCE : "CARTE_ASSURANCE",
    ORDONNANCE : "ORDONNANCE",
    AUTRE : "AUTRE",
} as const 

// cela concerne le payeur de l'admission
export const AdmissionPayerType = {
    PATIENT : "PATIENT",
    INSURANCE : "INSURANCE",
    COMPANY : "COMPANY",
} as const 


// cela concerne le type de mouvement de l'encounter 
export const MovementType = {
    ADMISSION : "ADMISSION",
    TRANSFER : "TRANSFER",
    DISCHARGE : "DISCHARGE",
} as const 

// cela concerne le status de l'encounter 
export const EncounterStatus = {
    ENCOUNTER_PENDING : "ENCOUNTER_PENDING",
    ENCOUNTER_ADMITTED : "ENCOUNTER_ADMITTED",
    ENCOUNTER_DISCHARGED : "ENCOUNTER_DISCHARGED",
    ENCOUNTER_CANCELLED : "ENCOUNTER_CANCELLED",
    ENCOUNTER_PRE_ADMITTED : "ENCOUNTER_PRE_ADMITTED",
    ENCOUNTER_REGISTERED : "ENCOUNTER_REGISTERED",
    ENCOUNTER_WAIT_FOR_CAR : "ENCOUNTER_WAIT_FOR_CAR",
    ENCOUNTER_CLOSED : "ENCOUNTER_CLOSED",
    ENCOUNTER_DISCHARGED_PENDING : "ENCOUNTER_DISCHARGED_PENDING", 
    ENCOUNTER_TRANSFERED : "ENCOUNTER_TRANSFERED",
    
} as const 

export const Relationship = {
    FATHER : "FATHER",
    MOTHER : "MOTHER",
    SON : "SON",
    DAUTHER : "DAUTHER",
    HUSBAND : "HUSBAND",
    WIFE : "WIFE",
    BROTHER : "BROTHER",
    SISTER : "SISTER",
    OTHER : "OTHER"
} as const 
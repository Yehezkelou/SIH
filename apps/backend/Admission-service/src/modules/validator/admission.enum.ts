

// cela concerne le status de l'admission 
export const  AdmissionStatus = {
    PENDING : "PENDING",
    ADMITTED : "ADMITTED",
    DISCHARGED : "DISCHARGED",
    CANCELLED  : "CANCELLED",
    PRE_ADMITTED : "PRE_ADMITTED",
    REGISTERED : "REGISTERED",
    WAIT_FOR_CAR : "WAIT_FOR_CAR",
    CLOSED : "CLOSED",
    DISCHARGED_PENDING : "DISCHARGED_PENDING", 
    TRANSFERED : "TRANSFERED",
    
} as const 

// cela concerne le type d'admission 
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


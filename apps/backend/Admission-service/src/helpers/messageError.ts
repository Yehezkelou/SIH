
type T_MESSAGE_ERROR_ADMISSION =
    | "ADMISSION_PATIENT_ALREADY_ACTIVE"
    | "ADMISSION_NUMBER_GENERATION_FAILED"

// les messages d'erreur pour les admissions
export const MESSAGE_ERROR : Record<T_MESSAGE_ERROR_ADMISSION, {MESSAGE : string, CODE : string}> = {

    ADMISSION_PATIENT_ALREADY_ACTIVE : {
        MESSAGE : "ce patient a déjà une admission active en cours.",
        CODE : "ADMISSION_PATIENT_ALREADY_ACTIVE"
    },

    ADMISSION_NUMBER_GENERATION_FAILED : {
        MESSAGE : "impossible de générer un numéro d'admission unique, veuillez réessayer.",
        CODE : "ADMISSION_NUMBER_GENERATION_FAILED"
    },

}

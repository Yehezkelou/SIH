
type T_MESSAGE_ERROR_ADMISSION =
    | "ADMISSION_PATIENT_ALREADY_ACTIVE"
    | "ADMISSION_NUMBER_GENERATION_FAILED"
    | "ADMISSION_PATIENT_NOT_FOUND"

type T_MESSAGE_ERROR_INTEGRATION =
    | "INTEGRATION_PATIENT_NOT_FOUND"

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

    ADMISSION_PATIENT_NOT_FOUND : {
        MESSAGE : "Le patient specifié est introuvable ou inactif.",
        CODE : "ADMISSION_PATIENT_NOT_FOUND"
    }

}

export const MESSAGE_ERROR_INTEGRATION : Record<T_MESSAGE_ERROR_INTEGRATION, {MESSAGE : string, CODE : string}> = {
    INTEGRATION_PATIENT_NOT_FOUND : {
        MESSAGE : "le patient n'a pas été trouvé dans le microservice Patient-Identity-Service.",
        CODE : "INTEGRATION_PATIENT_NOT_FOUND"
    }
}


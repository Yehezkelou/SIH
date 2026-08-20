type T_MESSAGE_ERROR_ADMISSION =
    | "ADMISSION_PATIENT_ALREADY_ACTIVE"
    | "ADMISSION_NUMBER_GENERATION_FAILED"
    | "ADMISSION_PATIENT_NOT_FOUND"
    | "ADMISSION_NOT_FOUND"
    | "ADMISSION_LOCKED"
    | "ADMISSION_STATUS_TRANSITION_FORBIDDEN"
    | "ADMISSION_NOT_ACTIVE"
    | "COMPANION_NOT_FOUND"
    | "DOCUMENT_NOT_FOUND"
    | "PAYER_NOT_FOUND"
    | "ENCOUNTER_NOT_FOUND"
    | "ENCOUNTER_LOCKED"
    | "ENCOUNTER_STATUS_TRANSITION_FORBIDDEN"
    | "DOCUMENT_MOVE_FAILED"
    | "DOCUMENT_FILE_REQUIRED"

type T_MESSAGE_ERROR_INTEGRATION =
    | "INTEGRATION_PATIENT_NOT_FOUND"

// les messages d'erreur pour les admissions
export const MESSAGE_ERROR : Record<T_MESSAGE_ERROR_ADMISSION, {MESSAGE : string, CODE : string}> = {

    ADMISSION_PATIENT_ALREADY_ACTIVE : {
        MESSAGE : "Ce patient a déjà une admission active en cours.",
        CODE : "ADMISSION_PATIENT_ALREADY_ACTIVE"
    },

    ADMISSION_NUMBER_GENERATION_FAILED : {
        MESSAGE : "Impossible de générer un numéro d'admission unique, veuillez réessayer.",
        CODE : "ADMISSION_NUMBER_GENERATION_FAILED"
    },

    ADMISSION_PATIENT_NOT_FOUND : {
        MESSAGE : "Le patient spécifié est introuvable ou inactif.",
        CODE : "ADMISSION_PATIENT_NOT_FOUND"
    },

    ADMISSION_NOT_FOUND : {
        MESSAGE : "L'admission spécifiée est introuvable ou inactive.",
        CODE : "ADMISSION_NOT_FOUND"
    },

    ADMISSION_LOCKED : {
        MESSAGE : "L'admission ne peut pas être modifiée car elle est déjà admise, enregistrée ou close.",
        CODE : "ADMISSION_LOCKED"
    },

    ADMISSION_STATUS_TRANSITION_FORBIDDEN : {
        MESSAGE : "La transition de statut demandée pour cette admission est interdite.",
        CODE : "ADMISSION_STATUS_TRANSITION_FORBIDDEN"
    },

    ADMISSION_NOT_ACTIVE : {
        MESSAGE : "Seule une admission active en cours peut faire l'objet de cette opération.",
        CODE : "ADMISSION_NOT_ACTIVE"
    },

    COMPANION_NOT_FOUND : {
        MESSAGE : "Un ou plusieurs accompagnants spécifiés sont introuvables.",
        CODE : "COMPANION_NOT_FOUND"
    },

    DOCUMENT_NOT_FOUND : {
        MESSAGE : "Un ou plusieurs documents spécifiés sont introuvables.",
        CODE : "DOCUMENT_NOT_FOUND"
    },

    PAYER_NOT_FOUND : {
        MESSAGE : "Un ou plusieurs payeurs spécifiés sont introuvables.",
        CODE : "PAYER_NOT_FOUND"
    },

    ENCOUNTER_NOT_FOUND : {
        MESSAGE : "Le séjour (Encounter) spécifié est introuvable.",
        CODE : "ENCOUNTER_NOT_FOUND"
    },

    ENCOUNTER_LOCKED : {
        MESSAGE : "Le séjour (Encounter) ne peut pas être modifié car il est déjà clos, sorti ou annulé.",
        CODE : "ENCOUNTER_LOCKED"
    },

    ENCOUNTER_STATUS_TRANSITION_FORBIDDEN : {
        MESSAGE : "Impossible de réactiver un séjour déjà sorti, clos ou annulé.",
        CODE : "ENCOUNTER_STATUS_TRANSITION_FORBIDDEN"
    },

    DOCUMENT_MOVE_FAILED : {
        MESSAGE : "Impossible de déplacer ou d'archiver les anciens fichiers sur le serveur.",
        CODE : "DOCUMENT_MOVE_FAILED"
    },

    DOCUMENT_FILE_REQUIRED : {
        MESSAGE : "Aucun fichier n'a été fourni lors de l'envoi du document.",
        CODE : "DOCUMENT_FILE_REQUIRED"
    }

}

export const MESSAGE_ERROR_INTEGRATION : Record<T_MESSAGE_ERROR_INTEGRATION, {MESSAGE : string, CODE : string}> = {
    INTEGRATION_PATIENT_NOT_FOUND : {
        MESSAGE : "Le patient n'a pas été trouvé dans le microservice Patient-Identity-Service.",
        CODE : "INTEGRATION_PATIENT_NOT_FOUND"
    }
}

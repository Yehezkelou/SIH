
type T_MESSAGE_ERROR_PATIENT = 
    | "PATIENT_NOT_FOUND" 
    | "PATIENT_ALREADY_EXIST" 
    | "NUMERO_DE_DOSSIER_ALREADY_EXIST"
    | "PATIENT_PROVISOIR_NOT_FOUND" 
    | "PATIENT_IS_DEFINTIF"
    | "PATIENT_IS_PROVISOIR"
    | "PATIENT_POSSIBLE_DUPLICATE"
    | "DOSSIER_NOT_PROVISIONAL"

type T_MESSAGE_ERROR_ARCHIDOC = 
    | "DOSSIER_NOT_FOUND" 
    | "DOSSIER_NOT_FOUND_SIMPLE" 
    | "DOCUMENT_FOR_REPLACEMENT_ERROR" 
    | "DOCUMENT_FOR_DELETION_ERROR" 
    | "MOVE_ERROR" 



// les messages d'erreur pour les patients
export const MESSAGE_ERROR : Record<T_MESSAGE_ERROR_PATIENT, {MESSAGE : string, CODE : string}>= {
    
    PATIENT_NOT_FOUND : {
        MESSAGE : "le patient n'a pas été trouvé.",
        CODE : "PATIENT_NOT_FOUND"
    }, 

    PATIENT_ALREADY_EXIST : {
        MESSAGE : "le patient existe deja.",
        CODE : "PATIENT_ALREADY_EXIST"
    },

    PATIENT_POSSIBLE_DUPLICATE: {
        MESSAGE: "un patient correspondant existe déjà, une fusion est nécessaire avant régularisation.",
        CODE: "PATIENT_POSSIBLE_DUPLICATE"
    },

    NUMERO_DE_DOSSIER_ALREADY_EXIST : {
        MESSAGE  : "le numero de dossier existe deja.",
        CODE : "NUMERO_DE_DOSSIER_ALREADY_EXIST"
    },

    PATIENT_PROVISOIR_NOT_FOUND : {
        MESSAGE : "le patient provisoir n'a pas été trouvé.",
        CODE : "PATIENT_PROVISOIR_NOT_FOUND"
    },

    PATIENT_IS_DEFINTIF : {
        MESSAGE : "le patient est deja définitif.",
        CODE : "PATIENT_IS_DEFINTIF"
    },

    DOSSIER_NOT_PROVISIONAL: {
        MESSAGE: "ce dossier n'est pas un dossier provisoire ou a déjà été régularisé.",
        CODE: "DOSSIER_NOT_PROVISIONAL"
    },

    PATIENT_IS_PROVISOIR : {
        MESSAGE : "le patient est deja provisoir.",
        CODE : "PATIENT_IS_PROVISOIR"
    }

}

// les messages d'erreur pour les dossiers
export const MESSAGE_ERROR_ARCHIDOC : Record<T_MESSAGE_ERROR_ARCHIDOC, {MESSAGE : string, CODE : string}> = {
    DOSSIER_NOT_FOUND : {
        MESSAGE : "le document archivé demandé est introuvable ou n'appartient pas à ce patient.",
        CODE : "DOSSIER_NOT_FOUND"
    },
    DOSSIER_NOT_FOUND_SIMPLE : {
        MESSAGE : "le document archivé demandé est introuvable.",
        CODE : "DOSSIER_NOT_FOUND"
    },
    DOCUMENT_FOR_REPLACEMENT_ERROR : {
        MESSAGE : "le document dont le remplacement doit etre fait est introuvable.",
        CODE : "DOCUMENT_FOR_REPLACEMENT_ERROR"
    },
    DOCUMENT_FOR_DELETION_ERROR : {
        MESSAGE : "le document dont la suppression doit etre faite est introuvable.",
        CODE : "DOCUMENT_FOR_DELETION_ERROR"
    },
    MOVE_ERROR : {
        MESSAGE : "impossible de déplacer le fichier.",
        CODE : "MOVE_ERROR"
    }
}
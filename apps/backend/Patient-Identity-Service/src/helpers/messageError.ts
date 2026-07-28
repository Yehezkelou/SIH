



// les messages d'erreur pour les patients
export const MESSAGE_ERROR : Record<string, {MESSAGE : string, CODE : string}> = {
    
    PATIENT_NOT_FOUND : {
        MESSAGE : "le patient n'a pas été trouvé.",
        CODE : "PATIENT_NOT_FOUND"
    }, 

    PATIENT_ALREADY_EXIST : {
        MESSAGE : "le patient existe deja.",
        CODE : "PATIENT_ALREADY_EXIST"
    },

    NUMERO_DE_DOSSIER_ALREADY_EXIST : {
        MESSAGE  : "le numero de dossier existe deja.",
        CODE : "NUMERO_DE_DOSSIER_ALREADY_EXIST"
    },
}

// les messages d'erreur pour les dossiers
export const MESSAGE_ERROR_ARCHIDOC : Record<string, {MESSAGE : string, CODE : string}> = {
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
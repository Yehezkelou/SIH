import axios from 'axios';

export interface ParsedApiError {
    globalMessage: string;
    fieldErrors: Record<string, string>;
    code?: string;
    statusCode?: number;
    metadata?: unknown;
}

const ERROR_CODE_TRANSLATIONS: Record<string, string> = {
    PATIENT_NOT_FOUND: "Le dossier patient demandé est introuvable.",
    PATIENT_ALREADY_EXIST: "Un patient avec ce numéro d'identité (CNI, Passeport, CMU ou Sécurité Sociale) existe déjà dans le système.",
    NUMERO_DE_DOSSIER_ALREADY_EXIST: "Ce numéro de dossier patient (NDPU) est déjà attribué.",
    PATIENT_PROVISOIR_NOT_FOUND: "Le dossier patient provisoire est introuvable.",
    PATIENT_IS_DEFINTIF: "Ce dossier patient est déjà définitif et ne peut être enregistré comme provisoire.",
    PATIENT_IS_PROVISOIR: "Ce patient possède déjà un dossier provisoire actif.",
    PATIENT_POSSIBLE_DUPLICATE: "Un dossier patient avec des informations d'identité identiques existe déjà. Une procédure de fusion ou de rapprochement est requise.",
    DOSSIER_NOT_PROVISIONAL: "Ce dossier n'est pas un dossier provisoire ou a déjà été régularisé.",
    PATIENT_MERGE_SOURCE_NOT_FOUND: "Le dossier patient source à fusionner est introuvable.",
    PATIENT_MERGE_TARGET_NOT_FOUND: "Le dossier patient cible de la fusion est introuvable.",
    PATIENT_ALREADY_MERGED: "Ce dossier patient a déjà été absorbé par une fusion précédente.",
    FUSION_NOT_APPLICATE: "L'opération de fusion a échoué. Vérifiez la validité des deux dossiers.",
    DOSSIER_NOT_FOUND: "Le document archivé demandé est introuvable ou n'appartient pas à ce patient.",
    DOSSIER_NOT_FOUND_SIMPLE: "Le document archivé demandé est introuvable.",
    DOCUMENT_FOR_REPLACEMENT_ERROR: "Le document à remplacer est introuvable.",
    DOCUMENT_FOR_DELETION_ERROR: "Le document à supprimer est introuvable.",
    MOVE_ERROR: "Impossible d'enregistrer la pièce justificative sur le serveur.",
};

export function parseApiError(error: unknown): ParsedApiError {
    const result: ParsedApiError = {
        globalMessage: '',
        fieldErrors: {},
    };

    if (!error) {
        result.globalMessage = 'Une erreur inconnue est survenue.';
        return result;
    }

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        result.statusCode = status;

        const data = error.response?.data as {
            code?: string;
            message?: string;
            msg?: string;
            detail?: string;
            dataError?: string | Record<string, string>;
            errors?: string[];
            metadata?: unknown;
        } | undefined;

        result.code = data?.code;
        result.metadata = data?.metadata;

        // 1. Décodage des erreurs de validation Zod du backend (PatientPipeValidator)
        if (data?.dataError) {
            let errorMap: Record<string, string> = {};
            if (typeof data.dataError === 'string') {
                try {
                    errorMap = JSON.parse(data.dataError);
                } catch {
                    // Si ce n'est pas du JSON, garder comme message global
                    result.globalMessage = data.dataError;
                }
            } else if (typeof data.dataError === 'object' && data.dataError !== null) {
                errorMap = data.dataError;
            }

            for (const [path, message] of Object.entries(errorMap)) {
                // Enregistre à la fois le chemin qualifié ('identity.nom') et court ('nom')
                result.fieldErrors[path] = message;
                const shortKey = path.split('.').pop();
                if (shortKey && !result.fieldErrors[shortKey]) {
                    result.fieldErrors[shortKey] = message;
                }
            }

            if (Object.keys(result.fieldErrors).length > 0) {
                result.globalMessage = 'Certaines informations du formulaire sont invalides ou incomplètes.';
                return result;
            }
        }

        // 2. Erreur métier identifiée par code applicatif
        if (data?.code && ERROR_CODE_TRANSLATIONS[data.code]) {
            result.globalMessage = ERROR_CODE_TRANSLATIONS[data.code];
            if (data.detail) {
                result.globalMessage += ` (${data.detail})`;
            }
            return result;
        }

        // 3. Message direct renvoyé par le serveur
        if (typeof data?.message === 'string' && data.message.trim() && data.message !== 'SUCCEFULL') {
            result.globalMessage = data.message;
            return result;
        }

        // 4. Statuts HTTP génériques
        if (status === 401) {
            result.globalMessage = 'Votre session a expiré. Veuillez vous reconnecter au portail hospitalier.';
            return result;
        }

        if (status === 403) {
            result.globalMessage = "Vous ne disposez pas des habilitations requises (patient:CREATE / patient:UPDATE) pour réaliser cette action.";
            return result;
        }

        if (status === 404) {
            result.globalMessage = 'Le dossier patient ou le document demandé est introuvable.';
            return result;
        }

        if (status === 409) {
            result.globalMessage = "Conflit d'identitovigilance : un dossier patient avec ces identifiants existe déjà.";
            return result;
        }

        if (status && status >= 500) {
            result.globalMessage = "Le serveur d'identités patients est temporairement indisponible. Veuillez réessayer ultérieurement.";
            return result;
        }

        // 5. Erreurs réseau / API Gateway coupée
        if (error.code === 'ERR_NETWORK') {
            result.globalMessage = "Impossible de contacter l'API Gateway hospitalière. Vérifiez la connexion réseau.";
            return result;
        }
    }

    if (error instanceof Error) {
        result.globalMessage = error.message;
        return result;
    }

    result.globalMessage = "Une erreur inattendue est survenue lors de l'opération sur le dossier patient.";
    return result;
}

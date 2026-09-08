import axios from 'axios';

export interface ParsedApiError {
    globalMessage: string;
    fieldErrors: Record<string, string>;
    code?: string;
    statusCode?: number;
}

const ERROR_CODE_TRANSLATIONS: Record<string, string> = {
    ADMISSION_NOT_FOUND: "L'admission demandée est introuvable.",
    ADMISSION_ALREADY_EXIST: 'Une admission active existe déjà pour ce patient.',
    PATIENT_NOT_FOUND: "Le dossier patient rattaché est introuvable.",
    ENCOUNTER_NOT_FOUND: "Le séjour (encounter) associé est introuvable.",
    COMPANION_NOT_FOUND: "L'accompagnant demandé est introuvable.",
    PAYER_NOT_FOUND: 'Le payeur demandé est introuvable.',
    DOCUMENT_NOT_FOUND: 'Le document demandé est introuvable.',
    INVALID_STATUS_TRANSITION: "Ce changement de statut n'est pas autorisé depuis l'état actuel.",
    PERSONNEL_NOT_FOUND: "Le médecin sélectionné n'est pas un personnel valide.",
    MOVE_ERROR: 'Impossible de téléverser la pièce jointe sur le serveur.',
};

export function parseApiError(error: unknown): ParsedApiError {
    const result: ParsedApiError = { globalMessage: '', fieldErrors: {} };

    if (!error) {
        result.globalMessage = 'Une erreur inconnue est survenue.';
        return result;
    }

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        result.statusCode = status;

        const data = error.response?.data as
            | {
                  code?: string;
                  message?: string;
                  detail?: string;
                  dataError?: string | Record<string, string>;
              }
            | undefined;

        result.code = data?.code;

        // Erreurs de validation Zod du backend.
        if (data?.dataError) {
            let map: Record<string, string> = {};
            if (typeof data.dataError === 'string') {
                try {
                    map = JSON.parse(data.dataError);
                } catch {
                    result.globalMessage = data.dataError;
                }
            } else if (typeof data.dataError === 'object') {
                map = data.dataError;
            }

            for (const [path, message] of Object.entries(map)) {
                result.fieldErrors[path] = message;
                const short = path.split('.').pop();
                if (short && !result.fieldErrors[short]) result.fieldErrors[short] = message;
            }

            if (Object.keys(result.fieldErrors).length > 0) {
                result.globalMessage = 'Certaines informations du formulaire sont invalides ou incomplètes.';
                return result;
            }
        }

        if (data?.code && ERROR_CODE_TRANSLATIONS[data.code]) {
            result.globalMessage = ERROR_CODE_TRANSLATIONS[data.code];
            if (data.detail) result.globalMessage += ` (${data.detail})`;
            return result;
        }

        if (typeof data?.message === 'string' && data.message.trim()) {
            result.globalMessage = data.message;
            return result;
        }

        if (status === 401) {
            result.globalMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
            return result;
        }
        if (status === 403) {
            result.globalMessage = "Vous ne disposez pas des habilitations requises (admission:*) pour cette action.";
            return result;
        }
        if (status === 404) {
            result.globalMessage = "L'admission ou la ressource demandée est introuvable.";
            return result;
        }
        if (status === 409) {
            result.globalMessage = 'Conflit : cette opération entre en conflit avec un état existant.';
            return result;
        }
        if (status && status >= 500) {
            result.globalMessage = "Le service des admissions est temporairement indisponible.";
            return result;
        }
        if (error.code === 'ERR_NETWORK') {
            result.globalMessage = "Impossible de contacter l'API Gateway hospitalière.";
            return result;
        }
    }

    if (error instanceof Error) {
        result.globalMessage = error.message;
        return result;
    }

    result.globalMessage = "Une erreur inattendue est survenue.";
    return result;
}

import axios from 'axios';

export interface ParsedError {
    globalMessage: string;
    fieldErrors: Record<string, string>;
}

export function parseApiError(error: unknown): ParsedError {
    const result: ParsedError = {
        globalMessage: '',
        fieldErrors: {},
    };

    if (!error) return result;

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data as { code?: string; message?: string; errors?: string[] } | undefined;
        const code = data?.code;
        const serverMsg = data?.message;

        // 1. Conflits d'unicité (409 Conflict)
        if (code === 'AUTH_019' || serverMsg?.toLowerCase().includes('email')) {
            result.fieldErrors.email = 'Cette adresse email est déjà attribuée à un agent.';
            result.globalMessage = 'Un agent avec cette adresse email existe déjà.';
            return result;
        }

        if (code === 'AUTH_020' || serverMsg?.toLowerCase().includes('matricule')) {
            result.fieldErrors.matricule = 'Ce matricule RH est déjà utilisé.';
            result.globalMessage = 'Un agent avec ce matricule RH existe déjà.';
            return result;
        }

        // 2. Erreur d'autorisation (403 Forbidden)
        if (status === 403) {
            result.globalMessage = "Vous ne disposez pas des autorisations requises (user:CREATE) pour enregistrer un agent.";
            return result;
        }

        // 3. Session expirée (401 Unauthorized)
        if (status === 401) {
            result.globalMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
            return result;
        }

        // 4. Erreurs de validation (400 Bad Request)
        if (status === 400) {
            if (typeof serverMsg === 'string') {
                result.globalMessage = serverMsg;
            } else if (Array.isArray(data?.errors)) {
                result.globalMessage = data.errors.join(', ');
            } else {
                result.globalMessage = 'Les informations fournies sont invalides ou incomplètes.';
            }
            return result;
        }

        // 5. Erreurs serveur (500, 502, 503)
        if (status && status >= 500) {
            result.globalMessage = 'Le serveur hospitalier a rencontré une erreur interne. Veuillez réessayer.';
            return result;
        }

        // 6. Problème réseau / Gateway déconnectée
        if (error.code === 'ERR_NETWORK') {
            result.globalMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion réseau et l’API Gateway.';
            return result;
        }
    }

    if (error instanceof Error) {
        result.globalMessage = error.message;
        return result;
    }

    result.globalMessage = "Une erreur inattendue est survenue lors de l'enregistrement de l'agent.";
    return result;
}

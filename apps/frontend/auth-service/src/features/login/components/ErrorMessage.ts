import { useMemo } from "react";

export interface BackendErrorResponse {
    status: number;
    message: string | {
        statusCode?: number;
        message?: string | string[];
        error?: string;
        detail?: string;
    };
    data?: any;
    timestamp: string;
    path: string;
}

export function useErrorMessage(error: any): string | null {
    
    return useMemo(() => {
        if (!error) return null;

        // Récupère le corps de réponse JSON renvoyé par NestJS / SharedBaseExceptionFilter
        const errorData = error.response?.data as BackendErrorResponse | undefined;

        if (errorData) {
            const msgObj = errorData.message;

            // Cas 1 : message est directement une chaîne
            if (typeof msgObj === "string") {
                return msgObj;
            }

            if (msgObj && typeof msgObj === "object") {
                // Cas 2 : message.message est une chaîne (ex: erreurs personnalisées NestJS)
                if (typeof msgObj.message === "string") {
                    return msgObj.message;
                }
                // Cas 3 : message.message est un tableau (ex: erreurs de validation de champs)
                if (Array.isArray(msgObj.message)) {
                    return msgObj.message.join(", ");
                }
                // Cas 4 : message.error est une chaîne (ex: "Unauthorized")
                if (msgObj.error) {
                    return msgObj.error;
                }
                // Cas 5 : message.detail est une chaîne (ex: détail de l'erreur 500)
                if (msgObj.detail) {
                    return msgObj.detail;
                }
            }

            // Cas 6 : message est lui-même directement un tableau
            if (Array.isArray(msgObj)) {
                return msgObj.join(", ");
            }
        }

        // Fallback si l'erreur provient du réseau ou de la configuration Axios
        return error.message || "Une erreur est survenue lors de la connexion au serveur";
    }, [error]);
}
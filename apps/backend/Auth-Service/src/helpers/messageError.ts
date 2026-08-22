type T_MESSAGE_ERROR_AUTH =
    | "AUTH_INVALID_CREDENTIALS"
    | "AUTH_ACCOUNT_LOCKED"
    | "AUTH_ACCOUNT_DISABLED"
    | "AUTH_INVALID_PIN"
    | "AUTH_PIN_LOCKED"
    | "AUTH_INVALID_REFRESH_TOKEN"
    | "AUTH_TOKEN_EXPIRED"
    | "AUTH_UNAUTHORIZED"
    | "AUTH_FORBIDDEN"
    | "AUTH_USER_NOT_FOUND";

export const MESSAGE_ERROR_AUTH: Record<T_MESSAGE_ERROR_AUTH, { MESSAGE: string; CODE: string }> = {
    AUTH_INVALID_CREDENTIALS: {
        MESSAGE: "Identifiant ou mot de passe incorrect.",
        CODE: "AUTH_001",
    },
    AUTH_ACCOUNT_LOCKED: {
        MESSAGE: "Compte temporairement verrouillé suite à trop d'échecs consécutifs.",
        CODE: "AUTH_002",
    },
    AUTH_ACCOUNT_DISABLED: {
        MESSAGE: "Compte inactif ou suspendu. Veuillez contacter l'administrateur SI.",
        CODE: "AUTH_003",
    },
    AUTH_INVALID_PIN: {
        MESSAGE: "Code PIN à 6 chiffres incorrect ou désactivé.",
        CODE: "AUTH_004",
    },
    AUTH_PIN_LOCKED: {
        MESSAGE: "Code PIN temporairement bloqué suite à 5 erreurs consécutives.",
        CODE: "AUTH_005",
    },
    AUTH_INVALID_REFRESH_TOKEN: {
        MESSAGE: "Jeton de rafraîchissement invalide ou révoqué.",
        CODE: "AUTH_006",
    },
    AUTH_TOKEN_EXPIRED: {
        MESSAGE: "La session a expiré. Veuillez vous reconnecter.",
        CODE: "AUTH_007",
    },
    AUTH_UNAUTHORIZED: {
        MESSAGE: "Authentification requise pour accéder à cette ressource.",
        CODE: "AUTH_008",
    },
    AUTH_FORBIDDEN: {
        MESSAGE: "Vous n'avez pas les permissions requises pour effectuer cette action.",
        CODE: "AUTH_009",
    },
    AUTH_USER_NOT_FOUND: {
        MESSAGE: "Utilisateur non trouvé.",
        CODE: "AUTH_010",
    },
};

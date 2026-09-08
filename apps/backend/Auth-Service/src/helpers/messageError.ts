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
    | "AUTH_USER_NOT_FOUND"
    | "AUTH_OLD_PASSWORD_INVALID"
    | "AUTH_RESET_TOKEN_INVALID"
    | "AUTH_RESET_TOKEN_EXPIRED"
    | "AUTH_MFA_NOT_INITIALIZED"
    | "AUTH_INVALID_MFA_CODE"
    | "AUTH_MFA_SESSION_EXPIRED"
    | "AUTH_MFA_TOKEN_INVALID"
    | "AUTH_MFA_NOT_ENABLED"
    | "AUTH_USER_EMAIL_EXISTS"
    | "AUTH_USER_MATRICULE_EXISTS"
    | "AUTH_DOCUMENT_FILE_REQUIRED"
    | "AUTH_DOCUMENT_NOT_FOUND"
    | "AUTH_DOCUMENT_MOVE_FAILED";

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
    AUTH_OLD_PASSWORD_INVALID: {
        MESSAGE: "L'ancien mot de passe (ou mot de passe temporaire) est incorrect.",
        CODE: "AUTH_011",
    },
    AUTH_RESET_TOKEN_INVALID: {
        MESSAGE: "Le jeton de réinitialisation est invalide ou a déjà été utilisé.",
        CODE: "AUTH_012",
    },
    AUTH_RESET_TOKEN_EXPIRED: {
        MESSAGE: "Le jeton de réinitialisation de mot de passe a expiré.",
        CODE: "AUTH_013",
    },
    AUTH_MFA_NOT_INITIALIZED: {
        MESSAGE: "Veuillez d'abord initialiser la configuration MFA (/auth/mfa/setup).",
        CODE: "AUTH_014",
    },
    AUTH_INVALID_MFA_CODE: {
        MESSAGE: "Code TOTP à 6 chiffres incorrect ou invalide.",
        CODE: "AUTH_015",
    },
    AUTH_MFA_SESSION_EXPIRED: {
        MESSAGE: "La session de double authentification a expiré. Veuillez vous reconnecter.",
        CODE: "AUTH_016",
    },
    AUTH_MFA_TOKEN_INVALID: {
        MESSAGE: "Jeton de validation MFA invalide.",
        CODE: "AUTH_017",
    },
    AUTH_MFA_NOT_ENABLED: {
        MESSAGE: "La double authentification (MFA) n'est pas activée sur ce compte.",
        CODE: "AUTH_018",
    },
    AUTH_USER_EMAIL_EXISTS: {
        MESSAGE: "Un agent avec cette adresse email existe déjà.",
        CODE: "AUTH_019",
    },
    AUTH_USER_MATRICULE_EXISTS: {
        MESSAGE: "Un agent avec ce matricule existe déjà.",
        CODE: "AUTH_020",
    },
    AUTH_DOCUMENT_FILE_REQUIRED: {
        MESSAGE: "Le fichier du document justificatif est obligatoire.",
        CODE: "AUTH_021",
    },
    AUTH_DOCUMENT_NOT_FOUND: {
        MESSAGE: "Document justificatif non trouvé.",
        CODE: "AUTH_022",
    },
    AUTH_DOCUMENT_MOVE_FAILED: {
        MESSAGE: "Échec du déplacement sécurisé du document supprimé.",
        CODE: "AUTH_023",
    },
};

import z from "zod";
import type { User } from "../entities/user.entity";

/**
 * 1. Schéma de connexion classique par Mot de Passe (Email ou Matricule)
 */
export const LoginPasswordSchema = z.object({
    identifier: z.string({
        message: "L'identifiant (Email ou Matricule) est obligatoire"
    }).trim().min(1, "L'identifiant ne peut pas être vide"),

    password: z.string({
        message: "Le mot de passe est obligatoire"
    }).min(1, "Le mot de passe ne peut pas être vide"),
});

/**
 * 2. Schéma de connexion rapide par Code PIN 6 chiffres
 */
export const LoginPinSchema = z.object({
    identifier: z.string({
        message: "L'identifiant (Email ou Matricule) est obligatoire"
    }).trim().min(1, "L'identifiant ne peut pas être vide"),

    pinCode: z.string({
        message: "Le code PIN est obligatoire"
    }).regex(/^\d{6}$/, "Le code PIN doit contenir exactement 6 chiffres numériques"),
});

/**
 * 3. Schéma d'activation du compte à la 1ère connexion
 * (L'agent s'authentifie avec son mot de passe temporaire et définit son nouveau mot de passe + PIN 6 chiffres)
 */
export const ActivateAccountSchema = z.object({
    identifier: z.string({
        message: "L'identifiant (Email ou Matricule) est obligatoire"
    }).trim().min(1, "L'identifiant ne peut pas être vide"),

    tempPassword: z.string({
        message: "Le mot de passe temporaire est obligatoire"
    }).min(1, "Le mot de passe temporaire ne peut pas être vide"),

    newPassword: z.string({
        message: "Le nouveau mot de passe est obligatoire"
    }).min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),

    newPinCode: z.string({
        message: "Le nouveau code PIN est obligatoire"
    }).regex(/^\d{6}$/, "Le code PIN doit contenir exactement 6 chiffres numériques"),
});

/**
 * 4. Schéma de rafraîchissement de jeton (Refresh Token)
 */
export const RefreshTokenSchema = z.object({
    refreshToken: z.string({
        message: "Le token de rafraîchissement est obligatoire"
    }).min(1, "Le token de rafraîchissement ne peut pas être vide"),
});

/**
 * 5. Schéma d'activation de compte au niveau Repository
 */
export const ActivateAccountRepoSchema = z.object({
    userId: z.string({ message: "L'identifiant utilisateur est obligatoire" }).uuid("L'identifiant utilisateur doit être un UUID valide"),
    newPasswordHash: z.string({ message: "Le hash du nouveau mot de passe est obligatoire" }).min(1),
    newPinHash: z.string({ message: "Le hash du nouveau code PIN est obligatoire" }).min(1),
});

/**
 * 6. Schéma pour la gestion des échecs de connexion au niveau Repository
 */
export const RecordLoginFailureRepoSchema = z.object({
    user: z.custom<User>((val) => val && typeof val === "object" && "id" in val, {
        message: "L'instance de l'entité User est obligatoire",
    }),
    isPin: z.boolean().optional().default(false),
});

/**
 * 7. Schéma pour enregistrer le succès de connexion au niveau Repository
 */
export const RecordLoginSuccessRepoSchema = z.object({
    userId: z.string({ message: "L'identifiant utilisateur est obligatoire" }).uuid("L'identifiant utilisateur doit être un UUID valide"),
    ipAddress: z.string().optional(),
});

/**
 * 8. Schéma pour enregistrer une tentative de connexion (Repository)
 */
export const RecordLoginAttemptRepoSchema = z.object({
    userId: z.string().uuid().optional(),
    identifierUsed: z.string({ message: "L'identifiant utilisé est obligatoire" }).min(1),
    success: z.boolean({ message: "Le statut de succès est obligatoire" }),
    failureReason: z.string().optional(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
});

/**
 * 9. Schéma pour la création d'un Refresh Token (Repository)
 */
export const CreateRefreshTokenRepoSchema = z.object({
    userId: z.string({ message: "L'identifiant utilisateur est obligatoire" }).uuid("L'identifiant utilisateur doit être un UUID valide"),
    tokenHash: z.string({ message: "Le hash du token est obligatoire" }).min(1),
    expiresAt: z.date({ message: "La date d'expiration doit être une date valide" }),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
});

/**
 * 10. Schéma de déconnexion (POST /auth/logout)
 */
export const LogoutSchema = z.object({
    refreshToken: z.string({
        message: "Le token de rafraîchissement est obligatoire"
    }).min(1, "Le token de rafraîchissement ne peut pas être vide"),
});

/**
 * 11. Schéma pour la révocation d'un Refresh Token (Repository)
 */
export const RevokeTokenRepoSchema = z.object({
    tokenId: z.string({ message: "L'identifiant du token est obligatoire" }).uuid("L'identifiant du token doit être un UUID valide"),
    replacedByTokenId: z.string().uuid().optional(),
});

export type LoginPasswordInput = z.infer<typeof LoginPasswordSchema>;
export type LoginPinInput = z.infer<typeof LoginPinSchema>;
export type ActivateAccountInput = z.infer<typeof ActivateAccountSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type LogoutInput = z.infer<typeof LogoutSchema>;
export type ActivateAccountRepoInput = z.infer<typeof ActivateAccountRepoSchema>;
export type RecordLoginFailureRepoInput = z.infer<typeof RecordLoginFailureRepoSchema>;
export type RecordLoginSuccessRepoInput = z.infer<typeof RecordLoginSuccessRepoSchema>;
export type RecordLoginAttemptRepoInput = z.infer<typeof RecordLoginAttemptRepoSchema>;
export type CreateRefreshTokenRepoInput = z.infer<typeof CreateRefreshTokenRepoSchema>;
export type RevokeTokenRepoInput = z.infer<typeof RevokeTokenRepoSchema>;

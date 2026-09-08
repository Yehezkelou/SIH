import z, { string } from "zod";

/**
 * 1. Schéma pour le changement de mot de passe (ou activation initiale de compte)
 */
export const ChangePasswordSchema = z.object({
    oldPassword: z.string({
        message: "L'ancien mot de passe (ou mot de passe temporaire) est obligatoire"
    }).min(1, "L'ancien mot de passe ne peut pas être vide"),

    newPassword: z.string({
        message: "Le nouveau mot de passe est obligatoire"
    })
    .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le nouveau mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre"),

    newPinCode: z.string({
        message: "Le code PIN à 6 chiffres est obligatoire"
    }).regex(/^\d{6}$/, "Le code PIN doit contenir exactement 6 chiffres numériques"),
});

/**
 * 2. Schéma pour la demande de réinitialisation de mot de passe oublié
 */
export const ForgotPasswordSchema = z.object({
    identifier: z.string({
        message: "L'identifiant (Email ou Matricule) est obligatoire"
    }).trim().min(1, "L'identifiant ne peut pas être vide"),
});

/**
 * 3. Schéma pour la réinitialisation de mot de passe via jeton (Reset Token)
 */
export const ResetPasswordSchema = z.object({
    token: z.string({
        message: "Le jeton de réinitialisation est obligatoire"
    }).min(1, "Le jeton ne peut pas être vide"),

    newPassword: z.string({
        message: "Le nouveau mot de passe est obligatoire"
    })
    .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le nouveau mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre"),
});

/**
 * 4 Schema de sauvegarde d'un token
 *
*/

export const SaveResetTokenSchema = z.object({
    userId : z.string("l'identifiant utilisateur est obligatoire"),
    tokenHash : z.string("le hash du token est obligatoire"),
    expiresAt : z.date("La data d'expiration est obligatoire")
})

// Types TypeScript inférés
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type SaveResetTokenInput = z.infer<typeof SaveResetTokenSchema>
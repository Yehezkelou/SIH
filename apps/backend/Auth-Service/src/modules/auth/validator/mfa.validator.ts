import z from "zod";
import { MfaMethod } from "../entities";

/**
 * 1. Schéma de confirmation pour ACTIVER le MFA (Setup initial)
 * L'agent saisit le 1er code à 6 chiffres affiché sur son smartphone pour valider l'association du QR Code.
 */
export const MfaEnableSchema = z.object({
    code: z.string({
        message: "Le code TOTP à 6 chiffres est obligatoire"
    }).regex(/^\d{6}$/, "Le code TOTP doit contenir exactement 6 chiffres numériques"),
});

/**
 * 2. Schéma de vérification TOTP lors du flux de Connexion (Login Step 2)
 * L'agent fournit le token temporaire de 3 minutes reçu à l'étape 1 + son code TOTP mobile à 6 chiffres.
 */
export const MfaVerifySchema = z.object({
    mfaToken: z.string({
        message: "Le jeton temporaire de connexion MFA est obligatoire"
    }).min(1, "Le jeton temporaire MFA ne peut pas être vide"),

    code: z.string({
        message: "Le code TOTP à 6 chiffres est obligatoire"
    }).regex(/^\d{6}$/, "Le code TOTP doit contenir exactement 6 chiffres numériques"),
});

/**
 * 3. Schéma de DÉSACTIVATION du MFA
 * L'agent confirme son mot de passe actuel + un code TOTP valide pour désactiver la double authentification.
 */
export const MfaDisableSchema = z.object({
    password: z.string({
        message: "Le mot de passe actuel est obligatoire pour désactiver le MFA"
    }).min(1, "Le mot de passe actuel ne peut pas être vide"),

    code: z.string({
        message: "Le code TOTP à 6 chiffres est obligatoire"
    }).regex(/^\d{6}$/, "Le code TOTP doit contenir exactement 6 chiffres numériques"),
});

/**
 * Schéma pour sauvegarder le secret MFA au niveau Repository
*/
export const MfaSaveSecretRepoSchema = z.object({
    userId: z.uuid("L'identifiant utilisateur doit être un UUID valide"),
    mfaSecret: z.string({ message: "Le secret MFA est obligatoire" }).min(1),
    mfaMethod: z.enum(MfaMethod).optional(),
});

// Types TypeScript inférés
export type MfaEnableInput = z.infer<typeof MfaEnableSchema>;
export type MfaVerifyInput = z.infer<typeof MfaVerifySchema>;
export type MfaDisableInput = z.infer<typeof MfaDisableSchema>;
export type MfaSaveSecretRepoInput = z.infer<typeof MfaSaveSecretRepoSchema>;
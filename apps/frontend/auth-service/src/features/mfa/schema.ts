import { z } from 'zod';
import { User } from '../login/schema';

// Schéma de validation du code à 6 chiffres
export const MfaCodeSchema = z
    .string()
    .length(6, "Le code de sécurité doit comporter exactement 6 chiffres")
    .regex(/^\d{6}$/, "Le code doit être composé uniquement de chiffres");

// 1. Défi MFA lors de la connexion (Étape 2)
export const VerifyMfaSchema = z.object({
    mfaToken: z.string().min(1, "Jeton de session MFA manquant"),
    code: MfaCodeSchema,
});

export type VerifyMfaInput = z.infer<typeof VerifyMfaSchema>;

export interface ResponseVerifyMfa {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}

// 2. Initialisation du MFA (Setup)
export interface ResponseSetupMfa {
    message: string;
    secret: string;
    otpAuthUrl: string;
}

// 3. Activation définitive après saisie du premier code
export const EnableMfaSchema = z.object({
    code: MfaCodeSchema,
});

export type EnableMfaInput = z.infer<typeof EnableMfaSchema>;

// 4. Désactivation du MFA
export const DisableMfaSchema = z.object({
    password: z.string().min(1, "Le mot de passe actuel est requis"),
    code: MfaCodeSchema,
});

export type DisableMfaInput = z.infer<typeof DisableMfaSchema>;



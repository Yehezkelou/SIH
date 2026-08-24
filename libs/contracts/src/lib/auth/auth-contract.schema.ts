import z from "zod";

// contrat pour l'appel de validation de jeton
export const ValidateTokenContractSchema = z.object({
    accessToken: z.string({
        message: "Le jeton d'accès doit être une chaîne de caractères"
    })
});

// contrat pour la réponse de validation de jeton
export const ValidateTokenResponseSchema = z.object({
    isValid: z.boolean(),
    userId: z.uuid("L'identifiant de l'utilisateur doit être un UUID valide").optional().or(z.literal("")),
    matricule: z.string().optional().or(z.literal("")),
    roles: z.array(z.string()).default([]),
    permissions: z.array(z.string()).default([]),
});

// contrat pour l'appel de récupération d'utilisateur
export const GetUserContractSchema = z.object({
    userId: z.uuid("L'identifiant de l'utilisateur doit être un UUID valide")
});

// modèle partagé pour l'identité d'un agent
export const UserPersonnelSharedResponseSchema = z.object({
    id: z.uuid("L'identifiant doit être un UUID valide"),
    matricule: z.string(),
    nom: z.string(),
    prenom: z.string(),
    email: z.email("Format d'email invalide"),
    personnelType: z.string(),
    specialite: z.string().optional().nullable(),
    serviceAffectation: z.string().optional().nullable(),
});

// contrat de la réponse de récupération d'utilisateur
export const GetUserResponseSchema = z.object({
    found: z.boolean(),
    user: UserPersonnelSharedResponseSchema.optional(),
});

// types inférés TypeScript
export type ValidateTokenInput = z.infer<typeof ValidateTokenContractSchema>;
export type ValidateTokenResponseInput = z.infer<typeof ValidateTokenResponseSchema>;
export type GetUserInput = z.infer<typeof GetUserContractSchema>;
export type UserPersonnelSharedResponse = z.infer<typeof UserPersonnelSharedResponseSchema>;
export type GetUserResponseInput = z.infer<typeof GetUserResponseSchema>;

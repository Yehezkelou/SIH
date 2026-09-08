import z from "zod";
import { Genre, PersonnelType, UserDocumentType, UserStatus } from "../entities";

// creation d'un agent par l'admin (POST /users)
export const CreateUserSchema = z.object({
    nom: z.string({ message: "Le nom est obligatoire" }).trim().min(1, "Le nom ne peut pas être vide"),
    prenom: z.string({ message: "Le prénom est obligatoire" }).trim().min(1, "Le prénom ne peut pas être vide"),
    email: z.string({ message: "L'adresse email est obligatoire" }).email("Format d'email professionnel invalide"),
    matricule: z.string({ message: "Le matricule RH est obligatoire" }).trim().min(1, "Le matricule ne peut pas être vide"),

    genre: z.enum(Genre).optional(),
    telephone: z.string().optional(),
    personnelType: z.enum(PersonnelType, { message: "Le type de personnel est obligatoire" }),
    serviceAffectation: z.string().optional(),
    specialite: z.string().optional(),
    numeroOrdre: z.string().optional(),

    // roles obligatoires
    roleIds: z.array(
        z.uuid("L'identifiant du rôle doit être un UUID valide")
    ).min(1, "Au moins un rôle doit être attribué à l'agent"),

    // mdp temporaire optionnel
    tempPassword: z.string().min(8).optional(),
});

// modification d'un agent (PUT /users/:id)
export const UpdateUserSchema = z.object({
    nom: z.string().trim().min(1).optional(),
    prenom: z.string().trim().min(1).optional(),
    email: z.email().optional(),
    matricule: z.string().trim().min(1).optional(),
    genre: z.enum(Genre).optional(),
    telephone: z.string().optional(),
    personnelType: z.enum(PersonnelType).optional(),
    serviceAffectation: z.string().optional(),
    specialite: z.string().optional(),
    numeroOrdre: z.string().optional(),
    roleIds: z.array(z.string().uuid()).optional(),
});

// changement de statut (PATCH /users/:id/status)
export const UpdateUserStatusSchema = z.object({
    status: z.enum(UserStatus, { message: "Le statut est obligatoire" }),
    motif: z.string().optional(),
});

// attribution de roles (POST /users/:id/roles)
export const AssignRolesSchema = z.object({
    roleIds: z.array(
        z.uuid("L'identifiant du rôle doit être un UUID valide")
    ).min(1, "Au moins un identifiant de rôle est requis"),
    expiresAt: z.coerce.date().optional(),
});

// attacher un document (POST /users/:id/documents)
export const AddUserDocumentSchema = z.object({
    userId: z.string().uuid("L'identifiant utilisateur doit être un UUID valide").optional(),
    documentType: z.enum(UserDocumentType, { message: "Le type de document est obligatoire" }),
    numeroDocument: z.string().optional(),
    dateDelivrance: z.coerce.date().optional(),
    dateExpiration: z.coerce.date().optional(),
});

// supprimer un document (DELETE /users/:id/documents/:docId)
export const RemoveUserDocumentSchema = z.object({
    userId: z.uuid("L'identifiant utilisateur doit être un UUID valide").optional(),
    documentId: z.uuid("L'identifiant du document doit être un UUID valide").optional(),
});

// recherche et pagination (GET /users)
export const QueryUsersSchema = z.object({
    search: z.string().optional(),
    personnelType: z.enum(PersonnelType).optional(),
    status: z.enum(UserStatus).optional(),
    serviceAffectation: z.string().optional(),
    roleId: z.uuid("L'identifiant du rôle doit être un UUID valide").optional(),

    // filtre presence
    isConnected: z.preprocess((val) => {
        if (val === "true" || val === true) return true;
        if (val === "false" || val === false) return false;
        return undefined;
    }, z.boolean().optional()),

    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z.enum(["createdAt", "nom", "matricule", "lastLoginAt"]).default("createdAt"),
    sortOrder: z.enum(["ASC", "DESC"]).default("DESC"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type UpdateUserStatusInput = z.infer<typeof UpdateUserStatusSchema>;
export type AssignRolesInput = z.infer<typeof AssignRolesSchema>;
export type AddUserDocumentInput = z.infer<typeof AddUserDocumentSchema>;
export type RemoveUserDocumentInput = z.infer<typeof RemoveUserDocumentSchema>;
export type QueryUsersInput = z.infer<typeof QueryUsersSchema>;

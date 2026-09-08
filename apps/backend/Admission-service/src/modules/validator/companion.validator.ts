import { z } from "zod";
import { Relationship } from "./admission.enum";

// 1. Schéma d'ajout d'un accompagnant (POST /admission/:id/companion)
export const addCompanionSchema = z.object({
    admissionId: z.string().uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string("Le numéro d'admission est requis"),
    patientId: z.string().uuid("L'identifiant du patient est requis"),
    numeroPatient: z.string("Le numéro du patient est requis"),

    firstName: z.string().min(1, "Le prénom de l'accompagnant est requis"),
    lastName: z.string().min(1, "Le nom de l'accompagnant est requis"),
    phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
    relationship: z.enum(Object.values(Relationship) as [string, ...string[]], {
        message: "La relation avec le patient est invalide",
    }),
    address: z.string("L'adresse de l'accompagnant est requise"),
    createdBy: z.string().uuid("L'identifiant de l'utilisateur est requis"),
});

export const AddCompanionSchema = addCompanionSchema;

// 2. Schéma de modification d'un accompagnant 
export const updateCompanionSchema = z.object({
    companionId: z.uuid("L'identifiant de l'accompagnant est requis"),
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
    patientId: z.uuid().optional(),
    numeroPatient: z.string().optional(),

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    relationship: z.enum(Object.values(Relationship) as [string, ...string[]]).optional(),
    address: z.string().optional(),
    updatedBy: z.string().uuid("L'identifiant de l'utilisateur est requis"),
});

export const UpdateCompanionSchema = updateCompanionSchema;

// 3. Schéma de suppression d'un accompagnant 
export const removeCompanionSchema = z.object({
    companionId: z.uuid("L'identifiant de l'accompagnant est requis"),
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    deletedBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const RemoveCompanionSchema = removeCompanionSchema;

// 4. Schéma de recherche 
export const findCompanionsByAdmissionSchema = z.object({
    admissionId: z.string().uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
});

export const FindCompanionsByAdmissionSchema = findCompanionsByAdmissionSchema;

// Types inférés TypeScript
export type AddCompanionInput = z.infer<typeof addCompanionSchema>;
export type UpdateCompanionInput = z.infer<typeof updateCompanionSchema>;
export type RemoveCompanionInput = z.infer<typeof removeCompanionSchema>;
export type FindCompanionsByAdmissionInput = z.infer<typeof findCompanionsByAdmissionSchema>;

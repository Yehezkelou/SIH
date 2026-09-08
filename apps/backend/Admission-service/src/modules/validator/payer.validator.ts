import { z } from "zod";
import { AdmissionPayerType } from "./admission.enum";

// 1. Schéma d'ajout d'un payeur (POST /admission/:id/payer)
export const addPayerSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string("Le numéro d'admission est requis"),
    patientId: z.uuid("L'identifiant du patient est requis"),
    numeroPatient: z.string("Le numéro du patient est requis"),

    name: z.string().min(1, "Le nom du payeur / de l'assurance est requis"),
    payerType: z.enum(Object.values(AdmissionPayerType) as [string, ...string[]], {
        message: "Le type de payeur est invalide",
    }),
    policyNumber: z.string().min(1, "Le numéro de police d'assurance est requis"),
    coveragePercentage: z.number().min(0).max(100, "Le pourcentage de couverture doit être entre 0 et 100"),
    coverageLimit: z.number().min(0, "Le plafond de couverture doit être positif").optional(),
    validUntil: z.string({ message: "La date de fin de validité est requise" }),

    createdBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const AddPayerSchema = addPayerSchema;

// 2. Schéma de modification d'un payeur (PUT /admission/payer/:payerId)
export const updatePayerSchema = z.object({
    payerId: z.uuid("L'identifiant du payeur est requis"),
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
    patientId: z.uuid().optional(),
    numeroPatient: z.string().optional(),

    name: z.string().optional(),
    payerType: z.enum(Object.values(AdmissionPayerType) as [string, ...string[]]).optional(),
    policyNumber: z.string().optional(),
    coveragePercentage: z.number().min(0).max(100).optional(),
    coverageLimit: z.number().min(0).optional(),
    validUntil: z.string().optional(),

    updatedBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const UpdatePayerSchema = updatePayerSchema;

// 3. Schéma de suppression d'un payeur (DELETE /admission/payer/:payerId)
export const removePayerSchema = z.object({
    payerId: z.uuid("L'identifiant du payeur est requis"),
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    deletedBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const RemovePayerSchema = removePayerSchema;

// 4. Schéma de recherche des payeurs d'une admission
export const findPayersByAdmissionSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
});

export const FindPayersByAdmissionSchema = findPayersByAdmissionSchema;

// Types inférés TypeScript
export type AddPayerInput = z.infer<typeof addPayerSchema>;
export type UpdatePayerInput = z.infer<typeof updatePayerSchema>;
export type RemovePayerInput = z.infer<typeof removePayerSchema>;
export type FindPayersByAdmissionInput = z.infer<typeof findPayersByAdmissionSchema>;

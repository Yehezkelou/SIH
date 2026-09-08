import { z } from "zod";
import { AdmissionDocumentType } from "./admission.enum";

// 1. Schéma d'ajout d'un document (POST /admission/:id/document)
export const addDocumentSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string("Le numéro d'admission est requis"),
    patientId: z.uuid("L'identifiant du patient est requis"),
    numeroPatient: z.string("Le numéro du patient est requis"),

    documentType: z.enum(Object.values(AdmissionDocumentType) as [string, ...string[]], {
        message: "Le type de document est invalide",
    }),
    documentName: z.string().optional(),
    createdBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const AddDocumentSchema = addDocumentSchema;

// 2. Schéma de suppression d'un document (DELETE /admission/document/:documentId)
export const removeDocumentSchema = z.object({
    documentId: z.uuid("L'identifiant du document est requis"),
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    deletedBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const RemoveDocumentSchema = removeDocumentSchema;

// 3. Schéma de recherche des documents d'une admission (GET /admission/:id/document)
export const findDocumentsByAdmissionSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
});

export const FindDocumentsByAdmissionSchema = findDocumentsByAdmissionSchema;

// Types inférés TypeScript
export type AddDocumentInput = z.infer<typeof addDocumentSchema>;
export type RemoveDocumentInput = z.infer<typeof removeDocumentSchema>;
export type FindDocumentsByAdmissionInput = z.infer<typeof findDocumentsByAdmissionSchema>;

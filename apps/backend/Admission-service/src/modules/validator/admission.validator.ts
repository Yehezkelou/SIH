import {z} from "zod"
import { AdmissionType, AdmissionDocumentType, AdmissionPayerType, AdmissionStatus, Relationship, EncounterStatus } from "./index"


export const admissionTypeValues = Object.values(AdmissionType)

export const CreateAdmissionSchema = z.object({

     // reference vers le patient
    patientId : z.uuid("Identifiant du patient est requis"),

    // admission
    admission : z.object({
        
    // reference vers le docteur
    doctorId : z
        .uuid()
        .optional(),

    // champ pour le type d'admission
    admissionType : z
        .enum(admissionTypeValues, "Le type d'admission est requis"),

    // champ pour le status d'admission 
    admissionStatus : z
        .enum(AdmissionStatus)
        .default("PENDING"),

    // la raison 
    reason : z
        .string()
        .optional(),

    // date d'entré du patient prevu
    admissionDate : z
        .date()
        .optional(),

    // date de sorti prevu
    expectedDischarge: z
        .date()
        .optional(),
        
    }),

    // compagnons validator 
    companions : z.array(
        z.object({
            firstName : z.string(),
            lastName : z.string(),
            phoneNumber : z.string(),
            relationship : z.enum(Relationship),
            address : z.string(),
        })
    ).optional(),

    documents : z.array(
        z.object({
            documentType : z.enum(AdmissionDocumentType),
            documentUrl : z.string(),
            documentSize : z.number(),
            documentExtension : z.string(),
            documentName : z.string(),
        })
    ).optional(),

    payers : z.array(
        z.object({
            name : z.string(),
            payerType : z.enum(AdmissionPayerType),
            policyNumber : z.string(),
            coveragePercentage : z.number(),
            coverageLimit : z.number(),
            validUntil : z.string()
        })
    ).optional(),

    // encouter pas condition REGISTERED OR ADMITED
    encouter : z.object({
        encouterStatus : z.enum(EncounterStatus),
        currentDepartementId : z.uuid().optional(),
        currentRoomId : z.uuid().optional(),
        currentBedId : z.uuid().optional(),
    }).optional(),

    // created by 
    createdBy : z.uuid("Identifiant de l'utilisateur est requis")

})



// Schema zod d de recherche query
export const admissionQuerySchema = z.object({

    // 
})

export const UpdateAdmissionSchema = CreateAdmissionSchema.partial().omit({
    patientId : true
})



// type infére typescript 
export type CreateAdmissionInput = z.infer<typeof CreateAdmissionSchema>
export type UpdateAdmissionInput = z.infer<typeof UpdateAdmissionSchema>


import {z} from "zod"
import { AdmissionType, AdmissionDocumentType, AdmissionPayerType } from "./index"


export const admissionTypeValues = Object.values(AdmissionType)

export const CreateAdmissionSchema = z.object({

     // reference vers le patient
    patientId : z.uuid(),

    // admission
    admission : z.object({
        
    // reference vers le docteur
    doctorId : z
        .uuid()
        .optional(),

    // champ pour le type d'admission
    admissionType : z
        .enum(admissionTypeValues)
        .optional(),

    // la raison 
    reason : z
        .string()
        .optional()
    }),

    companions : z.array(
        z.object({
            firstName : z.string(),
            lastName : z.string(),
            phoneNumber : z.string(),
            relationship : z.string(),
            address : z.string(),
        })
    ).optional(),

    documents : z.array(
        z.object({
            documentType : z.enum(AdmissionDocumentType),
            documentUrl : z.string(),
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
        }).optional()
    ),

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


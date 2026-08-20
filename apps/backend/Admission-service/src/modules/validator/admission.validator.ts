import {z} from "zod"
import { AdmissionType, AdmissionDocumentType, AdmissionPayerType, AdmissionStatus, Relationship, EncounterStatus, MovementType } from "./index"


export const admissionTypeValues = Object.values(AdmissionType)

export const CreateAdmissionSchema = z.object({

     // reference vers le patient
    patientId : z.uuid("Identifiant du patient est requis"),
    numeroPatient : z.string("le numero du patient est requis"),


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



// Extraction et extension dynamique des objets pour la mise à jour
const companionUpdateSchema = CreateAdmissionSchema.shape.companions
    .unwrap()
    .element
    .partial()
    .extend({
        id : z.uuid("identifiant du companion est requis")
    });

// creation de nouveau companion (add)
const companionCreateSchema = z.object({

    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    patientId : z.uuid("l'identifiant du patient est requis"),
    admissionNumber : z.string("le numero de l'admission est requis"),
    numeroPatient : z.string("le numero du patient est requis"),
    createdBy : z.uuid("l'identifiant de l'utilisateur est requis"),

    companions : z.array(CreateAdmissionSchema.shape.companions
    .unwrap()
    .element
    )
})

// Schéma pour remplacer/modifier un document existant (id requis, autres optionnels)
const documentReplaceSchema = CreateAdmissionSchema.shape.documents
    .unwrap()
    .element
    .partial()
    .extend({
        id : z.uuid("identifiant du document est requis")
    });

// Schéma pour ajouter un nouveau document lors de l'update (pas d'id, champs requis)
const documentCreateSchema = z.object({
    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    patientId : z.uuid("l'identifiant du patient est requis"),
    admissionNumber : z.string("le numero de l'admission est requis"),
    numeroPatient : z.string("le numero du patient est requis"),
    createdBy : z.uuid("l'identifiant de l'utilisateur est requis"),

    documents : z.array(CreateAdmissionSchema.shape.documents
        .unwrap()
        .element
    )
});

const payerUpdateSchema = CreateAdmissionSchema.shape.payers
    .unwrap()
    .element
    .partial()
    .extend({
        id : z.uuid("identifiant du payer est requis")
    })

const payerCreateSchema = z.object({
    
    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    patientId : z.uuid("l'identifiant du patient est requis"),
    admissionNumber : z.string("le numero de l'admission est requis"),
    numeroPatient : z.string("le numero du patient est requis"),
    createdBy : z.uuid("l'identifiant de l'utilisateur est requis"),

    payers : z.array(CreateAdmissionSchema.shape.payers 
    .unwrap()
    .element
    )
})

const encounterUpdateSchema = CreateAdmissionSchema.shape.encouter
    .unwrap()
    .partial()
    .extend({
        id : z.uuid("identifiant de l'encouter est requis")
    });

export const UpdateAdmissionSchema = CreateAdmissionSchema.partial().omit({
    createdBy : true
}).extend({
    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    admissionNumber: z.string("le numero de l'admission est requis"),


    // companions
    Companions : z.array(companionUpdateSchema).optional(),


    // Nouveaux documents et documents de remplacement
    newDocuments : z.array(CreateAdmissionSchema.shape.documents.unwrap().element).optional(),
    replacedDocuments : z.array(documentReplaceSchema).optional(),

    // payers
    Payers : z.array(payerUpdateSchema).optional(),

    // encouter (un seul objet, pas un tableau)
    encouter : encounterUpdateSchema.optional(),

    // utilisateur
    updatedBy : z.uuid("Identifiant de l'utilisateur est requis")
})


// Schéma pour la recherche et la pagination des admissions 
export const admissionQuerySchema = z.object({

    // patient
    patientId: z.uuid("L'identifiant du patient doit être un UUID valide").optional(),
    numeroPatient: z.string().optional(),
    admissionNumber : z.string().optional(),

    // medecin
    doctorId: z.uuid("L'identifiant du médecin doit être un UUID valide").optional(),

    admissionStatus: z.enum(Object.values(AdmissionStatus) as [string, ...string[]]).optional(),
    admissionType: z.enum(Object.values(AdmissionType) as [string, ...string[]]).optional(),
    
    startDate: z.coerce.date({ message: "La date de début est invalide" }).optional(),
    endDate: z.coerce.date({ message: "La date de fin est invalide" }).optional(),
    
    page: z.coerce
        .number()
        .int("La page doit être un entier")
        .min(1, "La page doit être supérieure ou égale à 1")
        .default(1),
    limit: z.coerce
        .number()
        .int("La limite doit être un entier")
        .min(1, "La limite doit être d'au moins 1")
        .max(100, "La limite maximale est de 100 éléments par page")
        .default(10),
}).refine(
    (data) => {
        if (data.startDate && data.endDate) {
            return data.startDate <= data.endDate;
        }
        return true;
    },
    {
        message: "La date de début (startDate) doit être antérieure ou égale à la date de fin (endDate)",
        path: ["startDate"]
    }
);


export const findAdmissionByIdSchema = z.object({
    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    numeroPatient : z.string().optional(),
    admissionNumber : z.string(), 
    patientId : z.uuid().optional()
})

export const findActiveAdmissionByPatientSchema = z.object({
    patientId: z.uuid("L'identifiant du patient (UUID) est requis"),
    numeroPatient: z.string().optional(),
});

export const updateAdmissionStatusSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission : z.string(),
    patientId : z.uuid().optional(),
    numeroPatient : z.string().optional(),
    newStatus: z.enum(Object.values(AdmissionStatus) as [string, ...string[]], {
        message: "Le nouveau statut de l'admission est invalide",
    }),
    reason: z.string().optional(),
    updatedBy: z.uuid("L'identifiant de l'utilisateur est requis"),
});

export const UpdateAdmissionStatusSchema = updateAdmissionStatusSchema;

export const createMovementSchema = z.object({
    encounterId: z.uuid("L'identifiant du séjour (Encounter) est requis"),
    encounterNumber : z.string("le numero de l'encounter est requis"),
    admissionId : z.uuid("l'identifiant de l'admission est requis"),
    admissionNumber : z.string("le numero de l'admission est requis"),
    patientId : z.uuid("l'identifiant du patient est requis"),
    numeroPatient : z.string("le numero du patient est requis"),
    
    movementType: z.enum(Object.values(MovementType) as [string, ...string[]], {
        message: "Le type de mouvement est requis (ADMISSION, TRANSFER, DISCHARGE)",
    }),
    toDepartmentId: z.uuid("L'identifiant du département destination doit être un UUID valide").optional(),
    toRoomId: z.uuid("L'identifiant de la chambre destination doit être un UUID valide").optional(),
    toBedId: z.uuid("L'identifiant du lit destination doit être un UUID valide").optional(),
    reason: z.string().optional(),
    movementBy: z.uuid("L'identifiant de l'utilisateur effectuant le transfert est requis"),
});

export const findMovementsByEncounterSchema = z.object({
    encounterId: z.uuid("L'identifiant du séjour (Encounter) est requis"),
    numeroEncounter : z.string("le numero de l'encounter est requis"),
    admissionId : z.uuid().optional(),
    numeroAdmission : z.string().optional(),
    patientId : z.uuid().optional(),
    numeroPatient : z.string().optional()
});

export const cancelAdmissionSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string("Le numéro d'admission est requis"),
    patientId: z.uuid().optional(),
    numeroPatient: z.string().optional(),
    reason: z.string().min(1, "Le motif d'annulation est requis"),
    cancelledBy: z.uuid("L'identifiant de l'utilisateur ayant annulé est requis"),
});

export const softDeleteAdmissionSchema = z.object({
    admissionId: z.uuid("L'identifiant de l'admission est requis"),
    numeroAdmission: z.string().optional(),
    patientId: z.uuid().optional(),
    numeroPatient: z.string().optional(),
    deletedBy: z.uuid("L'identifiant de l'utilisateur ayant supprimé est requis"),
});

export const CancelAdmissionSchema = cancelAdmissionSchema;
export const SoftDeleteAdmissionSchema = softDeleteAdmissionSchema;

// type infére typescript 
export type CreateAdmissionInput = z.infer<typeof CreateAdmissionSchema>
export type UpdateAdmissionInput = z.infer<typeof UpdateAdmissionSchema>
export type companionCreateInput = z.infer<typeof companionCreateSchema>
export type documentCreateInput = z.infer<typeof documentCreateSchema>
export type payerCreateInput = z.infer<typeof payerCreateSchema>
export const CreateMovementSchema = createMovementSchema;
export type findAdmissionByIdInput = z.infer<typeof findAdmissionByIdSchema> 
export type findActiveAdmissionByPatientInput = z.infer<typeof findActiveAdmissionByPatientSchema>;
export type AdmissionQueryInput = z.infer<typeof admissionQuerySchema>;
export type UpdateAdmissionStatusInput = z.infer<typeof updateAdmissionStatusSchema>;
export type CreateMovementInput = z.infer<typeof createMovementSchema>;
export type FindMovementsByEncounterInput = z.infer<typeof findMovementsByEncounterSchema>;
export type CancelAdmissionInput = z.infer<typeof cancelAdmissionSchema>;
export type SoftDeleteAdmissionInput = z.infer<typeof softDeleteAdmissionSchema>;







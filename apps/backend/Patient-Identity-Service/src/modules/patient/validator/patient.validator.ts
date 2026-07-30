import { truncate } from "fs";
import { identity } from "rxjs";
import z from "zod";








// validation des donner entrant pour la creation
// de l'identité du patient
export const CreatePatientSchema = z.object({

    //validation concernant les donné lié a l'identité civile
    identity : z.object({
        nom: z
            .string("le nom ne peut pas contenir de chiffre")
            .min(3, "le nom doit faire minimum 3 caractere")
            .max(50, "le doit faire maximum 50 caractere"),
        
        prenom: z
            .string("le prenom ne peut pas contenir de chiffer")
            .min(3, "le prenom doit faire minimum 3 caractere")
            .max(100, "le doit faire maximum 100 caratere"),

        age : z
            .number("l'age ne peut pas etre un nombre a virgule")
            .max(400, "l'age ne peut pas atteindre ce chiffer"),

        genre : z
            .enum(["M", "F"])
            .default("M"),

        dateNaissance : z.date(),

        lieuNaissance : z.string().optional(),
    }),

    // famille 
    famille : z.object({

        nomPere : z.string().optional(),
        numeroPere : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),

        nomMere : z.string().optional(),

        numeroMere : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),

        tuteur : z.string().optional(),

        numeroTuteur : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),
    }),

    // validation concernant les données liées aux contacts
    contact : z.object({
        email : z
            .email()
            .optional(),

        numero : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),

        numeroSecondaire : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),
        
        conctactUrgence : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),
        
    }),


    // validation concernant les données liées a l'identité civil unique
    uniqueIdentity : z.object({
        numSecuSocial : z
            .string()
            .optional(),

        numIdentityNational : z 
            .string()
            .optional(),

        numeroPassport : z
            .string()
            .optional(),
        
        numeroCMU : z
            .string()
            .optional(),
    }),

    // validation concernant les donnée liées a l'identifiant du createur
    CreatedBy : z.object({
        createdBy : z.uuid().optional()
    })
})

// schema : patient provisoir 
export const CreatePatientProvisoirSchema = z.object({
    identity : z.object({
        nom : z
            .string()
            .default("PATIENT-NOM-X"),

        prenom : z
            .string()
            .default("PATIENT-PRENOM-X"),

        age : z
            .number()
            .optional(),

        genre : z
            .enum(["M", "F"])
            .default("M"),

        dateNaissance : z
            .date()
            .default(new Date()),

        lieuNaissance : z
            .string()
            .default("PATIENT-LIEU-X"),
    }),

    urgence : z.object({
        motifProvisoir : z
            .enum(["URGENCE_VITAL" , "PATIENT_INCONSCIENT" , "IDENTITE_INCONNUE" , "MINEUR_NON_ACCOMPAGNE" , "PANNE_SYSTEME", "AUTRE"])
            .optional(),
        
        serviceCreation : z
            .string()
            .optional(),

        signalement : z
            .string()
            .max(1000)
            .optional(),

    }),

    contact : z.object({
        email : z
            .email()
            .optional(),

        numero : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),
        
        contactUrgence : z
            .string()
            .max(10, "le numero doit faire 10 chiffre")
            .refine((num) => {
                const prefixe = ["01", "05", "07"]
                return prefixe.some((pre) => num.startsWith(pre))
            },{
                message : "le numero doit contenir le prefixe de l'operateur (ex: 01, 05, 07....)"
            })
            .optional(),
    }).optional(),

    numeroDossier : z.string().optional(),
    createdBy : z.uuid("Identifiant du createur est invalide"), 
})


// schema :  update patient
export const UpdatePatientSchema = CreatePatientSchema.extend({
    patientId : z.uuid("Indifiant du patient invalide"),
    numeroDossier : z.string("le numero du patient est invalide"),
    updatedBy : z.uuid("Identifiant de la personne qui a modifié est invalide")
}).omit({
    CreatedBy : true
}).partial({
    identity : true,
    contact : true,
    uniqueIdentity : true, 
    famille : true
})

// schema : regulariser patient 
export const RegularizationPatientSchema = UpdatePatientSchema.extend({
    identity : CreatePatientSchema.shape.identity,
    contact : CreatePatientSchema.shape.contact,
    uniqueIdentity : CreatePatientSchema.shape.uniqueIdentity
})


// schema : trouver un seul patient 
export const FindOnlyPatientSchema = z.object({
    patientId : z.uuid("Identifiant du paiient invalide"),
    numeroDossier : z.string("le numero de dossier est invalide")
}) 


// schema : suprimer un patient
export const softDeleteOnlyPatientSchema = FindOnlyPatientSchema.extend({
    deletedBy : z.uuid("Identifiant de la personne qui a supprimé est invalide") 
})

// schema : fusion 
export const MergePatientSchema = z.object({

    // donné de la fusion
    sourcePatientId : z.uuid("Identifiant du patient source est invalide"),
    targetPatientId : z.uuid("Identifiant du patient cible est invalide"),

    mergeBy : z.uuid("Identifiant du createur de la fusion est invalide"),

    motifFusion : z
        .enum(["DOUBLON_REGULARISATION", "DOUBLON_DETECTE_SIMILARITE", "DOUBLON_MANUEL"])
        .default("DOUBLON_MANUEL"),

    ChampsAConserver : CreatePatientSchema
        .pick({
            identity : true,
            famille: true,
            contact : true,
            uniqueIdentity : true
        })
        .partial()
        .optional()
        

    
}).refine((data) => data.sourcePatientId !== data.targetPatientId, 
"le dossier source et le dossier cible ne peuvent pas etre identiques"
)




//Schema de validation des donnée de recherche entrant 
export const SearchPatientSchema = z.object({

    // query de recherche

    // civil identity
    nom : z.string().trim().min(2, "Trop court").max(50, "trop long").optional(),
    prenom : z.string().trim().min(2, "Trop court").max(50, "trop long").optional(),
    age : z.coerce.number().int().optional(),
    genre : z.enum(["M", "F"]).optional(),
    dateNaissance : z.date().optional(),

    
    // famille
    nomPere : z.string().optional(),
    nomMere : z.string().optional(),
    tuteur : z.string().optional(),
    numeroPere : z.string().optional(),
    numeroMere : z.string().optional(),
    numeroTuteur : z.string().optional(),

    // contact
    email : z.email().optional(),
    numero : z.string().optional(),

    //unique identity
    numSecuSocial : z.string().optional(),
    numIdentityNational : z.string().optional(),
    numeroPassport : z.string().optional(),
    numCMU : z.string().optional(),
    uniquePatientId : z.string().optional(),

    // status du dossier (provisoir ou definitif)
    statusDossier : z.enum(["DEFINITIF", "PROVISOIR"]).optional(),
  

    // pagination 
    page: z.coerce.number().positive().int().default(1),
    limit : z.coerce.number().int().nonnegative().min(5).max(50).default(10),
    
    // tri
    sort : z.enum(["asc", "desc"]).default("desc")
})


// Type infére typescripte 
export type CreatePatientInput = z.infer<typeof CreatePatientSchema>
export type UpdatePatientInput = z.infer<typeof UpdatePatientSchema>
export type SearchPatientInput = z.infer<typeof SearchPatientSchema>
export type FindOnePatientInput = z.infer<typeof FindOnlyPatientSchema>
export type SoftDeleteOnePatientInput = z.infer<typeof softDeleteOnlyPatientSchema>
export type RegularizationPatientInput = z.infer<typeof RegularizationPatientSchema>
export type CreatePatientProvisoirInput = z.infer<typeof CreatePatientProvisoirSchema>
export type MergePatientInput = z.infer<typeof MergePatientSchema>
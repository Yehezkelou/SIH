import z from "zod";

// enums 
const TypeDocumentArchiv = z.enum(["CNI", "PASSPORT", "ATTESTATION", "ACTE_NAISSANCE", "AUTRE"])
const extentions = z.enum(["PDF", "JPG", "JPEG", "PNG"])

// schema : creation archivDossier
export const CreateArchivDossierSchema = z.object({
    
    patientId : z.uuid("Identifiant du patient invalide"),

    typeDoc : TypeDocumentArchiv.optional(),

    name : z
        .string()
        .max(200, "le nom du fichier doit etre inferieur a 200 caractere")
        .min(4, "le nom du fichier doit etre superieur a 4 caractere")
        .optional(),

    taille : z
        .string()
        .optional(),

    extension : extentions.optional(),

    date : z
        .date()
        .optional(),

    url : z
        .string()
        .optional(),

    description : z
        .string()
        .max(500, "la description du fichier doit etre inferieur a 200 caractere")
        .optional(),

})



// type typescript 
export type CreateArchivDossierInput = z.infer<typeof CreateArchivDossierSchema>
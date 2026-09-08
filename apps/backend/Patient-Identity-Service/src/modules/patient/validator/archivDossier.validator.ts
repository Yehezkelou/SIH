import z from "zod";
import { omit } from "zod/mini";

// enums 
export const TypeDocumentArchiv = z.enum(["CNI", "PASSPORT", "ATTESTATION", "ACTE_NAISSANCE", "AUTRE"])
export const extentions = z.enum(["PDF", "JPG", "JPEG", "PNG"])

// schema : creation archivDossier
export const CreateArchivDossierSchema = z.object({
    
    patientId : z.uuid("Identifiant du patient invalide"),
    createdBy : z.uuid("Identifiant de la personne qui a crée est invalide"),

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
        .string()
        .optional(),

    url : z
        .string()
        .optional(),

    description : z
        .string()
        .max(500, "la description du fichier doit etre inferieur a 200 caractere")
        .optional(),

})

// schema : replace dossier 
export const replaceDossierSchema = CreateArchivDossierSchema.extend({
    dossierId : z.uuid("Identifiant du dossier invalide"), 
    updatedBy : z.uuid("Identifiant de la personne qui a modifié est invalide"),
}).omit({
   createdBy : true 
}).partial() 

//  schema : find only dossier  et peut etre par type 
export const findOnlyDossierSchema = z.object({
    dossierId : z.uuid("Identifiant du dossier invalide"), 
    patientId : z.uuid("Identifiant du patient invalide").optional(),
    typeDoc : TypeDocumentArchiv.optional()
}).partial()
  

// schema : find all dossier
export const findAllDossierSchema = z.object({
    patientId : z.uuid("Identifiant du patient invalide"),
    dossierId : z.uuid("Identifiant du dossier invalide").optional(),
    
})

// schema : delete dossier 
export const deleteDossierSchema = findOnlyDossierSchema.extend({
    deletedBy : z.uuid("Identifiant de la personne qui a supprimé est invalide"),
}).omit({
    typeDoc : true
}) 

// type typescript 
export type CreateArchivDossierInput = z.infer<typeof CreateArchivDossierSchema>
export type ReplaceDossierInput = z.infer<typeof replaceDossierSchema>
export type FindOnlyDossierInput = z.infer<typeof findOnlyDossierSchema>
export type FindAllDossierInput = z.infer<typeof findAllDossierSchema>
export type DeleteDossierInput = z.infer<typeof deleteDossierSchema>
export type  EXTENSION = z.infer<typeof extentions>
export type  TypeDocument = z.infer<typeof TypeDocumentArchiv>

import z from "zod"

// contrat pour l'appel de recherche
export const GetPatientContractSchema = z.object({

    patientId : z.uuid("Identifiant du patient doit etre en UUID valide"),
    numeroPatient : z.string("Le numero du patient doit etre en chaine de caractere")
})


// contrat de la reponse 
export const PatientSharedResponseSchema = z.object({
    id : z.uuid("Identifiant doit etre en UUID valide"), 
    numeroPatient : z.string("Le numero du patient doit etre en chaine de caractere"),
    nom : z.string(),
    prenom : z.string(),
    statusDossier : z.enum(["DEFINITIF", "PROVISOIRE"]),
})


// type inféré typeScript
export type GetPatientInput = z.infer<typeof GetPatientContractSchema>
export type PatientSharedResponseInput = z.infer<typeof PatientSharedResponseSchema>
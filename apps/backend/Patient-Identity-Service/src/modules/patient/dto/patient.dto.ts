import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CreatePatientInput, CreatePatientSchema, SearchPatientInput, SearchPatientSchema, UpdatePatientInput, UpdatePatientSchema, FindOnePatientInput, FindOnlyPatientSchema, SoftDeleteOnePatientInput, softDeleteOnlyPatientSchema, CreatePatientProvisoirInput, CreatePatientProvisoirSchema, RegularizationPatientInput, RegularizationPatientSchema, MergePatientInput, MergePatientSchema } from "../validator";

// dto creation de patient
@UseZodSchema(CreatePatientSchema)
export class CreatePatientDto implements CreatePatientInput {
    identity!: {
        nom: string;
        prenom: string;
        age: number;
        genre: "M" | "F";
        dateNaissance: Date;
        lieuNaissance?: string;
    };
    famille!: {
        nomPere?: string;
        numeroPere?: string;
        nomMere?: string;
        numeroMere?: string;
        tuteur?: string;
        numeroTuteur?: string;
    };
    contact!: {
        email?: string;
        numero?: string;
        numeroSecondaire?: string;
        conctactUrgence?: string;
    };
    uniqueIdentity!: {
        numSecuSocial?: string;
        numIdentityNational?: string;
        numeroPassport?: string;
        numeroCMU?: string;
    };
    CreatedBy!: {
        createdBy?: string;
    };
}

// dto mise a jour du patient
@UseZodSchema(UpdatePatientSchema)
export class UpdatePatientDto implements UpdatePatientInput {
    patientId!: string;
    numeroDossier!: string;
    updatedBy!: string;

    identity?: {
        nom: string;
        prenom: string;
        age: number;
        genre: "M" | "F";
        dateNaissance: Date;
        lieuNaissance?: string;
    };
    famille?: {
        nomPere?: string;
        numeroPere?: string;
        nomMere?: string;
        numeroMere?: string;
        tuteur?: string;
        numeroTuteur?: string;
    };
    contact?: {
        email?: string;
        numero?: string;
        numeroSecondaire?: string;
        conctactUrgence?: string;
    };
    uniqueIdentity?: {
        numSecuSocial?: string;
        numIdentityNational?: string;
        numeroPassport?: string;
        numeroCMU?: string;
    };
}

// dto pour la recherche du patient
@UseZodSchema(SearchPatientSchema)
export class SearchPatientDto implements SearchPatientInput {
    nom?: string;
    prenom?: string;
    age?: number;
    genre?: "M" | "F";
    dateNaissance?: Date;

    nomPere?: string;
    nomMere?: string;
    tuteur?: string;
    numeroPere?: string;
    numeroMere?: string;
    numeroTuteur?: string;

    email?: string;
    numero?: string;

    numSecuSocial?: string;
    numIdentityNational?: string;
    numeroPassport?: string;
    numCMU?: string;
    uniquePatientId?: string;

    page: number = 1;
    limit: number = 10;
    sort: "asc" | "desc" = "desc";
}

// dto pour trouver un seul patient
@UseZodSchema(FindOnlyPatientSchema)
export class FindOnePatientDto implements FindOnePatientInput {
    patientId!: string;
    numeroDossier!: string;
}

// dto pour supprimer un patient (soft delete)
@UseZodSchema(softDeleteOnlyPatientSchema)
export class SoftDeletePatientDto implements SoftDeleteOnePatientInput {
    patientId!: string;
    numeroDossier!: string;
    deletedBy!: string;
}

// dto pour la création de patient provisoire
@UseZodSchema(CreatePatientProvisoirSchema)
export class CreatePatientProvisoirDto implements CreatePatientProvisoirInput {
    identity!: {
        nom: string;
        prenom: string;
        age?: number;
        genre: "M" | "F";
        dateNaissance: Date;
        lieuNaissance: string;
    };
    urgence!: {
        motifProvisoir?: "URGENCE_VITAL" | "PATIENT_INCONSCIENT" | "IDENTITE_INCONNUE" | "MINEUR_NON_ACCOMPAGNE" | "PANNE_SYSTEME" | "AUTRE";
        serviceCreation?: string;
        signalement?: string;
    };
    contact?: {
        email?: string;
        numero?: string;
        contactUrgence?: string;
    };
    numeroDossier?: string;
    createdBy!: string;
}

// dto pour la régularisation de patient
@UseZodSchema(RegularizationPatientSchema)
export class RegularizationPatientDto implements RegularizationPatientInput {
    patientId!: string;
    numeroDossier!: string;
    updatedBy!: string;
    identity!: {
        nom: string;
        prenom: string;
        age: number;
        genre: "M" | "F";
        dateNaissance: Date;
        lieuNaissance?: string;
    };
    famille?: {
        nomPere?: string;
        numeroPere?: string;
        nomMere?: string;
        numeroMere?: string;
        tuteur?: string;
        numeroTuteur?: string;
    };
    contact!: {
        email?: string;
        numero?: string;
        numeroSecondaire?: string;
        conctactUrgence?: string;
    };
    uniqueIdentity!: {
        numSecuSocial?: string;
        numIdentityNational?: string;
        numeroPassport?: string;
        numeroCMU?: string;
    };
}

// dto pour la fusion de patient
@UseZodSchema(MergePatientSchema)
export class MergePatientDto implements MergePatientInput {
    sourcePatientId!: string;
    targetPatientId!: string;
    mergeBy!: string;
    motifFusion!: "DOUBLON_REGULARISATION" | "DOUBLON_DETECTE_SIMILARITE" | "DOUBLON_MANUEL";
    ChampsAConserver?: {
        identity?: {
            nom: string;
            prenom: string;
            age: number;
            genre: "M" | "F";
            dateNaissance: Date;
            lieuNaissance?: string;
        };
        famille?: {
            nomPere?: string;
            numeroPere?: string;
            nomMere?: string;
            numeroMere?: string;
            tuteur?: string;
            numeroTuteur?: string;
        };
        contact?: {
            email?: string;
            numero?: string;
            numeroSecondaire?: string;
            conctactUrgence?: string;
        };
        uniqueIdentity?: {
            numSecuSocial?: string;
            numIdentityNational?: string;
            numeroPassport?: string;
            numeroCMU?: string;
        };
    };
}
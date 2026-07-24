import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { 
    CreateArchivDossierInput, 
    CreateArchivDossierSchema, 
    DeleteDossierInput, 
    deleteDossierSchema, 
    FindAllDossierInput, 
    findAllDossierSchema, 
    FindOnlyDossierInput, 
    findOnlyDossierSchema, 
    ReplaceDossierInput, 
    replaceDossierSchema 
} from "../validator";

@UseZodSchema(CreateArchivDossierSchema)
export class CreateArchivDossierDto implements CreateArchivDossierInput {
    patientId!: string;
    createdBy!: string;
    typeDoc?: "CNI" | "PASSPORT" | "ATTESTATION" | "ACTE_NAISSANCE" | "AUTRE";
    name?: string;
    taille?: string;
    extension?: "PDF" | "JPG" | "JPEG" | "PNG";
    date?: string;
    url?: string;
    description?: string;
}

@UseZodSchema(replaceDossierSchema)
export class ReplaceDossierDto implements ReplaceDossierInput {
    dossierId?: string;
    updatedBy?: string;
    patientId?: string;
    typeDoc?: "CNI" | "PASSPORT" | "ATTESTATION" | "ACTE_NAISSANCE" | "AUTRE";
    name?: string;
    taille?: string;
    extension?: "PDF" | "JPG" | "JPEG" | "PNG";
    date?: string;
    url?: string;
    description?: string;
}

@UseZodSchema(findOnlyDossierSchema)
export class FindOnlyDossierDto implements FindOnlyDossierInput {
    dossierId?: string;
    patientId?: string;
    typeDoc?: "CNI" | "PASSPORT" | "ATTESTATION" | "ACTE_NAISSANCE" | "AUTRE";
}

@UseZodSchema(findAllDossierSchema)
export class FindAllDossierDto implements FindAllDossierInput {
    patientId!: string;
    dossierId?: string;
}

@UseZodSchema(deleteDossierSchema)
export class DeleteDossierDto implements DeleteDossierInput {
    dossierId?: string;
    patientId?: string;
    deletedBy!: string;
}

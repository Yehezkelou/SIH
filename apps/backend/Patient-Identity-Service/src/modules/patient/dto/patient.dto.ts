import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CreatePatientInput, CreatePatientSchema } from "../validator";










// dto creation de patient
@UseZodSchema(CreatePatientSchema)
export class CreatePatientDto implements CreatePatientInput {
    identity!: {
        nom: string;
        prenom: string;
        age: number;
        genre: "M" | "F";
    };
    contact!: {
        email?: string;
        numero?: string;
    };
    uniqueIdentity!: {
        numSecuSocial?: string;
        numIdentityNational?: string;
    };
    CreatedBy!: {
        createdBy: string;
    };
}


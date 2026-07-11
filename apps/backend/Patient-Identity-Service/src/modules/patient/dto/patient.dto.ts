import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CreatePatientInput, CreatePatientSchema, SearchPatientInput, SearchPatientSchema, UpdatePatientInput, UpdatePatientSchema } from "../validator";










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


// dto mise a jour du patient
@UseZodSchema(UpdatePatientSchema)
export class UpdatePatientDto implements UpdatePatientInput {
    
    identity!:{
        nom: string;
        prenom: string;
        age: number;
        genre: "M" | "F";

    };

    contact!: {
        email?: string;
        numero?: string;
    };

}


// dto pour la recherche du patient
@UseZodSchema(SearchPatientSchema)
export class SearchPatientDto implements SearchPatientInput{
    nom? : string
    prenom? : string
    age? : number 
    genre? : "M" | "F"

    email? : string
    numero? : string

    numSecuSocial? : string
    numIdentityNational? : string
    uniquePatientId? : string

    page : number = 1
    limit : number = 5
    sort : "asc" | "desc" = "desc"

}
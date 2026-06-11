import { DataSource, Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePatientInput } from "../validator";





@Injectable()
export class PatientRepository extends Repository<Patient>{

    //injecter la config qui permet de communiquer avec notre base donner 
    // et d y effectuer des methode 
    constructor(private dataSource : DataSource){
        super(Patient, dataSource.createEntityManager())
    }


    //creation d'un patient 
    async createNewPatient(data : CreatePatientInput){

        // existing Patient 
        const existing = await this.findOne({
            where : {numIdentityNational : data.uniqueIdentity.numIdentityNational},
            select : {
                prenom : true,
                nom : true,
                numIdentityNational : true
            }
        })
        if(existing) throw new HttpException('Patient already exist', HttpStatus.BAD_REQUEST)

        // create patient 
        const patient  = this.create() 

        return await this.save(patient)
    
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";




@Injectable()
export class PatientService {

    constructor(
        private readonly patientRepository : PatientRepository
    ){}


    // create patient 
    async createPatient(){}

    // update only Patient 
    async updartePatient(){}

    // find one patient 
    async findOnePatient(){}

    // find all patient 
    async findAllPatient(){}

    // soft delete
    async deletePatient(){}

    // fusion patient
    async fusionPatient(){}


}

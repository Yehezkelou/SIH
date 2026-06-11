import { Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";
import { CreatePatientInput } from "../validator";






@Injectable()
export class PatientService {

    // injecter notre logique de communication a la base de donné
    constructor(private readonly patientRepository : PatientRepository){}

    // service appelant la methode repository create patient
    async createPatientService(data : CreatePatientInput): Promise<CreatePatientInput>{
        return await this.createPatientService(data)
    }
}
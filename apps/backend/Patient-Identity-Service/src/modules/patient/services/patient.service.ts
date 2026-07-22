import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";
import { CreateArchivDossierInput, CreatePatientInput } from "../validator";
import { ArchivDossierRepository } from "../repositories/archivDossier.repository";
import path from "path";




@Injectable()
export class PatientService {

    constructor(
        private readonly patientRepository : PatientRepository,
        private readonly archivDossierRepository : ArchivDossierRepository
    ){}


    // create patient 
    async createPatient(data : {patient : CreatePatientInput, dossier : CreateArchivDossierInput}, files : Express.Multer.File[]){

        const {patient , dossier} = data

        // creation du patient 
        const patientCreated = await this.patientRepository.createNewPatient(patient)

        if("exist" in patientCreated){
            throw new HttpException({
                message : "PATIENT ALREADY EXIST",
                metadata : patientCreated.existingPatient
            }, HttpStatus.CONFLICT)
        }else if ("existNumero" in patientCreated){
            throw new HttpException({
                message : "NUMERO DE DOSSIER ALREADY EXIST",
                metadata : patientCreated.existingNumero
            }, HttpStatus.CONFLICT)
        }

        // gestion des file 
        for(const file of files){

            const path_file = file.path;





        }

        
    }

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

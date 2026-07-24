import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";
import { CreateArchivDossierInput, CreatePatientInput, EXTENSION, UpdatePatientInput } from "../validator";
import { ArchivDossierRepository } from "../repositories/archivDossier.repository";
import path from "path";
import { Patient } from "../entities/patient.entity";




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

        const newPatient = patientCreated as Patient
        const dossierToCreate: CreateArchivDossierInput[] = [] 


        // gestion des fichiers 
        if(files && files.length > 0){
            for(const file of files){

                const ext = path.extname(file.originalname).replace(".", "").toUpperCase() as EXTENSION

                dossierToCreate.push({
                    patientId : newPatient.id,
                    typeDoc : dossier.typeDoc || "AUTRE",
                    name : dossier.name,
                    extension : ["PNG", "PDF", "JPG", "JPEG"].includes(ext) ? ext : undefined,
                    url : file.path,
                    date : new Date().toISOString(),
                    description : dossier.description || `Fichier joint : ${file.originalname}`,
                    createdBy : dossier.createdBy
                });
            }

            await this.archivDossierRepository.createArchivDossier(dossierToCreate)
        }

        return newPatient      
    }

    // update only Patient 
    async updartePatient(data : UpdatePatientInput){
        
    }

    // find one patient 
    async findOnePatient(){}

    // find all patient 
    async findAllPatient(){}

    // soft delete
    async deletePatient(){}

    // fusion patient
    async fusionPatient(){}


}

import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";
import { CreateArchivDossierInput, CreatePatientInput, CreatePatientProvisoirInput, EXTENSION, FindOnePatientInput, RegularizationPatientInput, SearchPatientInput, SoftDeleteOnePatientInput, UpdatePatientInput } from "../validator";
import { ArchivDossierRepository } from "../repositories/archivDossier.repository";
import path from "path";
import { Patient } from "../entities/patient.entity";
import { MESSAGE_ERROR } from "../../../helpers/messageError";



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
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.PATIENT_ALREADY_EXIST.CODE,
                message : MESSAGE_ERROR.PATIENT_ALREADY_EXIST.MESSAGE,
                metadata : patientCreated.existingPatient
            }, HttpStatus.CONFLICT)
        }else if ("existNumero" in patientCreated){
            throw new HttpException({
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.NUMERO_DE_DOSSIER_ALREADY_EXIST.CODE,
                message : MESSAGE_ERROR.NUMERO_DE_DOSSIER_ALREADY_EXIST.MESSAGE,
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

    // create patient provisoir 
    async createPatientProvisoir(data : CreatePatientProvisoirInput){

        const provisoir = await this.patientRepository.createPatientProvisoir(data)

        if("existNumero" in  provisoir){
            throw new HttpException({
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.NUMERO_DE_DOSSIER_ALREADY_EXIST.CODE,
                message : MESSAGE_ERROR.NUMERO_DE_DOSSIER_ALREADY_EXIST.MESSAGE,
                metadata : provisoir.existingNumero
            }, HttpStatus.CONFLICT)
        }
        
        return provisoir
    }

    // regulariser patient 
    async regularisePatient(data : RegularizationPatientInput){
        
        const patient = await this.patientRepository.regularisationPatient(data)

        if("provisoirExist" in patient && patient.provisoirExist === false){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_PROVISOIR_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_PROVISOIR_NOT_FOUND.MESSAGE,
                metadata : patient
            },HttpStatus.NOT_FOUND)
            
        }else if("status" in patient){
            throw new HttpException({
                statusCode : HttpStatus.BAD_REQUEST,
                code : MESSAGE_ERROR.DOSSIER_NOT_PROVISIONAL.CODE,
                message : MESSAGE_ERROR.DOSSIER_NOT_PROVISIONAL.MESSAGE,
                metadata : patient.dossierProvisoir
            }, HttpStatus.BAD_REQUEST)

        }else if ("exist" in patient){
            throw new HttpException({
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.PATIENT_POSSIBLE_DUPLICATE.CODE,
                message : MESSAGE_ERROR.PATIENT_POSSIBLE_DUPLICATE.MESSAGE,
                metadata : patient.existingPatient
            }, HttpStatus.CONFLICT)
        }


        return patient
    }


    // update only Patient 
    async updatePatient(data : UpdatePatientInput){
     
        const patient = await this.patientRepository.updatePatient(data)

        if(patient == null) throw new HttpException(
            {
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_NOT_FOUND.MESSAGE
            },HttpStatus.NOT_FOUND)

        return patient
    }

    // find patient or patients with different query
    async findPatientOrPatients(data : SearchPatientInput){

        const patients = await this.patientRepository.findPatient(data)

        if(patients == null){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_NOT_FOUND.MESSAGE
            },HttpStatus.NOT_FOUND)
        }

        return patients
    }

     // find all patient 
    async findAllPatient(page : number, limit : number){
        const patients = await this.patientRepository.findAllPatient(page, limit)

        if(patients == null){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_NOT_FOUND.MESSAGE
            },HttpStatus.NOT_FOUND)
        }

        return patients
    }

    // find one patient 
    async findOnePatient(data : FindOnePatientInput){
        const patient = await this.patientRepository.findOnePatient(data)

        if(patient == null){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_NOT_FOUND.MESSAGE
            },HttpStatus.NOT_FOUND)
        }
        return patient
    }


    // soft delete
    async softDeletePatient(data : SoftDeleteOnePatientInput){
        const patient = this.patientRepository.softDeletePatient(data)

        if(patient == null){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.PATIENT_NOT_FOUND.MESSAGE
            },HttpStatus.NOT_FOUND)
        }
        return patient
    }

    // fusion patient
    async fusionPatient(){}


}

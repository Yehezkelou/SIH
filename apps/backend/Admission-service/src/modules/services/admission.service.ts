import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdmissionRepository } from "../repository/admission.repository";
import { CreateAdmissionInput, UpdateAdmissionInput, findAdmissionByIdInput, findActiveAdmissionByPatientInput, AdmissionQueryInput } from "../validator/index";
import { MESSAGE_ERROR } from "../../helpers/messageError";
import { PatientClientService } from "../integrations/patient.client";



@Injectable()
export class AdmissionService {

    constructor(
        private readonly admissionRepository : AdmissionRepository,
        private readonly PatientClient : PatientClientService
    ) {}

    // creation d'une nouvelle admission
    async createNewAdmission(data : CreateAdmissionInput, files : Express.Multer.File[]){

        // appeler le client 
        const patient = await this.PatientClient.verifyPatient({
            patientId : data.patientId,
            numeroPatient: data.numeroPatient
        })

        if(!patient){
            throw new HttpException({
                statusCode : HttpStatus.BAD_REQUEST,
                code : MESSAGE_ERROR.ADMISSION_PATIENT_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.ADMISSION_PATIENT_NOT_FOUND.MESSAGE
            }, HttpStatus.BAD_REQUEST)
        }

        // gestion des donné fichier 
       for(let i = 0; i < files.length; i++){
        data.documents![i].documentExtension = files[i].mimetype 
        data.documents![i].documentSize = files[i].size
        data.documents![i].documentName = files[i].originalname
        data.documents![i].documentUrl = files[i].path
       }
       
       const result = await this.admissionRepository.createNewAdmission(data)

        if("exist" in result && result.exist){
            throw new HttpException({
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.ADMISSION_PATIENT_ALREADY_ACTIVE.CODE,
                message : MESSAGE_ERROR.ADMISSION_PATIENT_ALREADY_ACTIVE.MESSAGE,
                metadata : result.admission
            }, HttpStatus.CONFLICT)
        }

        if("numberGenerationFailed" in result){
            throw new HttpException({
                statusCode : HttpStatus.CONFLICT,
                code : MESSAGE_ERROR.ADMISSION_NUMBER_GENERATION_FAILED.CODE,
                message : MESSAGE_ERROR.ADMISSION_NUMBER_GENERATION_FAILED.MESSAGE
            }, HttpStatus.CONFLICT)
        }

        return result
    }

    // modifier une admission 
    async updateAdmission(data : UpdateAdmissionInput, files : Express.Multer.File[]){

        const result = await this.admissionRepository.updateAdmission(data)
        
        // l'admission n'existe pas 
        if(!result.exist){
            throw new HttpException({
                statusCode : HttpStatus.NOT_FOUND,
                code : MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message : MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND)
        }

        // l'admission est deja admitted ou registered 
        if(result.locked){
            throw new HttpException({
                statusCode : HttpStatus.BAD_REQUEST,
                code : MESSAGE_ERROR.ADMISSION_LOCKED.CODE,
                message : MESSAGE_ERROR.ADMISSION_LOCKED.MESSAGE
            }, HttpStatus.BAD_REQUEST)
        }

       
    }

    // 1. Récupérer le détail complet d'une admission par ID
    async findAdmissionById(data: findAdmissionByIdInput) {
        const result = await this.admissionRepository.findAdmissionById(data);

        if (!result.existAdmission || !result.existing) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: MESSAGE_ERROR.ADMISSION_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return result.existing;
    }

    // 2. Récupérer l'admission active en cours d'un patient
    async findActiveAdmissionByPatient(data: findActiveAdmissionByPatientInput) {
        const result = await this.admissionRepository.findActiveAdmissionByPatient(data);

        if (!result.hasActiveAdmission || !result.admission) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR.ADMISSION_NOT_FOUND.CODE,
                message: "Aucune admission active n'a été trouvée pour ce patient.",
            }, HttpStatus.NOT_FOUND);
        }

        return result.admission;
    }

    // 3. Recherche filtrée + paginée des admissions
    async findAdmissions(query: AdmissionQueryInput) {
        return await this.admissionRepository.findAdmissions(query);
    }

    
}


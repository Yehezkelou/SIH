import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdmissionRepository } from "../repository/admission.repository";
import { CreateAdmissionInput } from "../validator/index";
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
}

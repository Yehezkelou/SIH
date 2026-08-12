import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdmissionRepository } from "../repository/admission.repository";
import { CreateAdmissionInput } from "../validator/index";
import { MESSAGE_ERROR } from "../../helpers/messageError";

@Injectable()
export class AdmissionService {

    constructor(
        private readonly admissionRepository : AdmissionRepository
    ) {}

    // creation d'une nouvelle admission
    async createNewAdmission(data : CreateAdmissionInput){

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

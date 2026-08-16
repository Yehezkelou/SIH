import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import {GetPatientInput, PatientSharedResponseInput, PatientSharedResponseSchema} from "@org/contracts"
import { MESSAGE_ERROR_INTEGRATION } from "../../helpers/messageError";



@Injectable()
export class PatientClientService {

    private readonly baseUrl : string;
    constructor(
        private readonly config : ConfigService
    ){
        this.baseUrl = this.config.get<string>('PATIENT_SERVICE_URL', "http://localhost:3000/api")
    }

    async verifyPatient(data : GetPatientInput): Promise<PatientSharedResponseInput | null>{
        try {
            const origin = new URL(this.baseUrl).origin
            const url = `${origin}/api/internal/patient/verify`;

            const response = await axios.post(url, data);

            if(response.status === HttpStatus.OK && response.data){

                const patientData = response.data.data as PatientSharedResponseInput

                // validation des donné 
                const parsed = PatientSharedResponseSchema.safeParse(patientData);
                if(!parsed.success){
                    throw new HttpException({
                        message : "Rupture de contrat",
                        detail : "le format de la réponse recu est invalide",
                        validationError : parsed.error.message
                    }, HttpStatus.INTERNAL_SERVER_ERROR)
                }

                return parsed.data
            }
            return null 
        }catch(error: any){
            if(error.response?.status === HttpStatus.NOT_FOUND){
                return null
            }
            throw new HttpException({
                statusCode: HttpStatus.SERVICE_UNAVAILABLE,
                message : MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.MESSAGE,
                code : MESSAGE_ERROR_INTEGRATION.INTEGRATION_PATIENT_NOT_FOUND.CODE,
                detail : error.message
            }, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
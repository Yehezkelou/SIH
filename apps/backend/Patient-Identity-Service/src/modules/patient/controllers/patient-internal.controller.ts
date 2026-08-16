import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { PatientInternalService } from "../services/patient-internal.service";
import { PinoLogger } from "nestjs-pino";
import type {GetPatientInput} from "@org/contracts"
import type { Response } from "express";
import { MESSAGE_INTERNAL_ERROR } from "../../../helpers/messageError";




@Controller('internal/patient')
export class PatientInternalController {

    constructor(
        private readonly service : PatientInternalService,
        private readonly logger : PinoLogger
    ){}

    @Post("verify")
    async verifyPatient(
        @Body() data : GetPatientInput,
        @Res() res : Response
    ){

        const patient = await this.service.VerifyPatient(data);

        if(!patient.exist){
            this.logger.error({
                message : "Le patient n'a pas été trouvé dans la base interne.",
                context : "PatientInternalController.verifyPatient"
            })

            return res.status(HttpStatus.NOT_FOUND).json({
                message : MESSAGE_INTERNAL_ERROR.PATIENT_NOT_FOUND_IN_INTERNAL.MESSAGE,
                code : MESSAGE_INTERNAL_ERROR.PATIENT_NOT_FOUND_IN_INTERNAL.CODE,
                success : false,
                timeStamp : new Date().toISOString()
            })
        }

        this.logger.info({
            message : "Le patient a été trouvé dans la base interne.",
            data : patient.response,
            context : "PatientInternalController.verifyPatient"
        })

        return res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : patient.response,
            timeStamp : new Date().toISOString()
        })
    }

}

import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { PatientService } from "../services/patient.service";
import { CreatePatientSchema, type CreatePatientInput } from "../validator";
import { PinoLogger } from "nestjs-pino";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CreatePatientDto } from "../dto/patient.dto";









@Controller('patient')
export class patientController{
    constructor(
        private readonly service : PatientService,
        private readonly logger : PinoLogger
    ){}


    @Post("create")
    async createPatient(@Body() patient : CreatePatientDto){
      
        const result = await this.service.createPatientService(patient)

        if(!result){
            throw  new HttpException("erreur de creation du patient", 400)
        }

        this.logger.info("Creation du patient", {nom : result.identity.nom , prenom : result.identity.prenom})

        return result
    }
}
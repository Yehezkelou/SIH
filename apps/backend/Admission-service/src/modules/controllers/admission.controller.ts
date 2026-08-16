import { Body, Controller, HttpStatus, Post, Res, UploadedFiles } from "@nestjs/common";
import { AdmissionService } from "../services/admission.service";
import { PinoLogger } from "nestjs-pino";
import { UseAdmissionFiles } from "../../helpers/decorator/AdmissionFile.decorator";
import type { Response } from "express";
import { 
    type CreateAdmissionInput 
} from "../validator";

@Controller("admission")
export class AdmissionController {
    constructor(
        private readonly service : AdmissionService,
        private readonly logger : PinoLogger
    ){}

    @Post()
    @UseAdmissionFiles()
    async createNewAdmission(
        @Body() data : CreateAdmissionInput,
        @UploadedFiles() files : Express.Multer.File[],
        @Res() res : Response
    ){
        
        const admission = await this.service.createNewAdmission(data, files)

        if(!admission){
            this.logger.error({
                message : "Erreur lors de la creation d'une nouvelle admission",
            })
        }

        res.status(HttpStatus.OK).json({
            message : "Admission cree avec succes",
            admission,
            status : HttpStatus.OK,
            timeStamp : new Date().toISOString()
        })
    }
}


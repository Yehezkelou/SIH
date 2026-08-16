import { Body, Controller, Delete, Get, HttpStatus, Put, Query, Res, UploadedFile } from "@nestjs/common";
import { ArchivDossierService } from "../services/archivDossier.service";
import { UsePatientFile } from "../../../helpers/decorator/PatientFiles.decorator";
import { PinoLogger } from "nestjs-pino";
import type { Response } from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import {
    type DeleteDossierInput,
    deleteDossierSchema,
     type FindOnlyDossierInput,
     findOnlyDossierSchema,
     type ReplaceDossierInput, 
     replaceDossierSchema 

    } from "../validator";


@Controller('dossier')
export class ArchivDossierController {
    constructor(
        private readonly archivDossierService : ArchivDossierService,
        private readonly logger : PinoLogger
    ){}
    

    @Put()
    @UsePatientFile('dossier')
    @UseZodSchema(replaceDossierSchema)
    async replaceDossier(
        @Body() body : ReplaceDossierInput,
        @UploadedFile() file : Express.Multer.File,
        @Res() res : Response
    ){
        const result = await this.archivDossierService.replaceDossier(body, file)

        this.logger.info({
            message : "dossier replace",
            metadata : {
                dossier : result,
            },
        })

        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timeStamp : new Date().toISOString()
        })
    }


    @Delete()
    @UseZodSchema(deleteDossierSchema)
    async softDeleteDossier(
        @Body() body : DeleteDossierInput,
        @Res() res : Response
    ){
        const result = await this.archivDossierService.softDeleteDossier(body)

        this.logger.info({
            message : "dossier delete",
            metadata : {
                dossier : result,
            },
        })

        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timeStamp : new Date().toISOString()
        })
    }

    @Get()
    @UseZodSchema(findOnlyDossierSchema)
    async findOnlyDossier(
        @Query() query : FindOnlyDossierInput,
        @Res() res : Response
    ){
        const result = await this.archivDossierService.findOnlyDossier(query)

        this.logger.info({
            message : "dossier find",
            metadata : {
                dossier : result,
            },
        })

        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timeStamp : new Date().toISOString()
        })
    }

}
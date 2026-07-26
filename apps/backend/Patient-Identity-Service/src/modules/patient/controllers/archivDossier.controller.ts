import { Body, Controller, Delete, Get, HttpStatus, Put, Query, Res, UploadedFile } from "@nestjs/common";
import { ArchivDossierService } from "../services/archivDossier.service";
import { UsePatientFile } from "../../../helpers/decorator/PatientFiles.decorator";
import { DeleteDossierDto, FindOnlyDossierDto, ReplaceDossierDto } from "../dto/archivDossier.dto";
import { PinoLogger } from "nestjs-pino";
import type { Response } from "express";


@Controller('dossier')
export class ArchivDossierController {
    constructor(
        private readonly archivDossierService : ArchivDossierService,
        private readonly logger : PinoLogger
    ){}
    

    @UsePatientFile('dossier')
    @Put()
    async replaceDossier(
        @Body() body : ReplaceDossierDto,
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
    async softDeleteDossier(
        @Body() body : DeleteDossierDto,
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
    async findOnlyDossier(
        @Query() query : FindOnlyDossierDto,
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
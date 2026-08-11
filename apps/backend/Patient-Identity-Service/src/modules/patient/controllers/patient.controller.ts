import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { CreatePatientDto, SearchPatientDto, UpdatePatientDto, FindOnePatientDto, SoftDeletePatientDto, CreatePatientProvisoirDto, RegularizationPatientDto, MergePatientDto } from "../dto/patient.dto";
import type { Response } from "express"
import { Patient } from "../entities/patient.entity";
import { PatientService } from "../services/patient.service";
import { CreateArchivDossierDto } from "../dto/archivDossier.dto";
import { UsePatientFiles } from "../../../helpers/decorator/PatientFiles.decorator";



@Controller('patient')
export class patientController {
    constructor(
        private readonly service: PatientService,
        private readonly logger: PinoLogger
    ) { }



    // create patient definitif
    @Post("create")
    @UsePatientFiles("dossiers")
    async createPatient(@Body() data: { patient: CreatePatientDto, dossier: CreateArchivDossierDto }, files: Express.Multer.File[], @Res() res: Response) {

        const result = await this.service.createPatient(data, files)


        this.logger.info({
            message: "Creation du patient",
            data: {
                nom: (result as Patient).nom,
                prenom: (result as Patient).prenom
            }
        })
        // response 
        res.status(HttpStatus.CREATED).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    // create patient provisoir 
    @Post("provisoir")
    async createPatientProvisoir(@Body() data: CreatePatientProvisoirDto, @Res() res: Response) {
        const result = await this.service.createPatientProvisoir(data)

        this.logger.info({
            message: "Creation du patient provisoire",
            data: result
        })

        res.status(HttpStatus.CREATED).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    // regulariser patient
    @Put("regularisation")
    async regularisePatient(@Body() data: RegularizationPatientDto, @Res() res: Response) {
        const result = await this.service.regularisePatient(data)

        this.logger.info({
            message: "Regularisation du patient",
            data: result
        })

        res.status(HttpStatus.OK).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    // update patient 
    @Put("²update")
    async updatePatient(@Body() patient: UpdatePatientDto, @Res() res: Response) {

        const result = await this.service.updatePatient(patient)


        this.logger.info({
            message: "update success",
            data: result
        })

        //
        res.status(HttpStatus.CREATED).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })

    }

    @Get("search")
    async searchPatient(@Query() query: SearchPatientDto, @Res() res: Response) {

        const result = await this.service.findPatientOrPatients(query)

        this.logger.info({
            message: "patient found",
            data: result
        })

        res.status(HttpStatus.OK).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    @Get()
    async getAllPatient(@Body() data: { page: number, limit: number }, @Res() res: Response) {

        const result = await this.service.findAllPatient(data.page, data.limit)


        this.logger.info({
            message: "get all patient",
            data: result
        })

        res.status(HttpStatus.OK).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    @Get()
    async getOnlyPatient(@Body() data: FindOnePatientDto, @Res() res: Response) {

        const result = await this.service.findOnePatient(data)

        this.logger.info({
            message: "get only patient",
            data: result
        })

        res.status(HttpStatus.OK).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    @Delete()
    async deletePatient(@Body() data: SoftDeletePatientDto, @Res() res: Response) {

        const result = await this.service.softDeletePatient(data)

        this.logger.info({
            message: "delete patient",
            data: result
        })

        res.status(HttpStatus.OK).json({
            message: "SUCCEFULL",
            data: result,
            timestamp: new Date().toISOString()
        })
    }

    @Post("fusion")
    async fusionPatient(@Body() data : MergePatientDto, @Res() res : Response){
        const result = await this.service.fusionPatient(data)

        this.logger.info({
            message : "fusion patient",
            data : {
                data : {
                    sourcePatientId : data.sourcePatientId,
                    targetPatientId : data.targetPatientId,
                    motifFusion : data.motifFusion
                },

            }
        })


        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timestamp : new Date().toISOString()
        })
    }

}
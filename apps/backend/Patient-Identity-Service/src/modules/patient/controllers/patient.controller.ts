import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import type { Response } from "express"
import { Patient } from "../entities/patient.entity";
import { PatientService } from "../services/patient.service";
import { UsePatientFiles } from "../../../helpers/decorator/PatientFiles.decorator";
import {
    type CreateArchivDossierInput,
    CreateArchivDossierSchema,
    type CreatePatientInput,
    type CreatePatientProvisoirInput,
    CreatePatientProvisoirSchema,
    CreatePatientSchema,
    type FindOnePatientInput,
    FindOnlyPatientSchema,
    type MergePatientInput,
    MergePatientSchema,
    type RegularizationPatientInput,
    RegularizationPatientSchema,
    type SearchPatientInput,
    SearchPatientSchema,
    type SoftDeleteOnePatientInput,
    softDeleteOnlyPatientSchema,
    type UpdatePatientInput,
    UpdatePatientSchema
} from "../validator";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";



@Controller('patient')
export class patientController {
    constructor(
        private readonly service: PatientService,
        private readonly logger: PinoLogger
    ) { }



    // create patient definitif
    @Post("create")
    @UsePatientFiles("dossiers")
    @UseZodSchema(CreatePatientSchema)
    @UseZodSchema(CreateArchivDossierSchema)
    async createPatient(@Body() data: { patient: CreatePatientInput, dossier: CreateArchivDossierInput }, files: Express.Multer.File[], @Res() res: Response) {

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
    @UseZodSchema(CreatePatientProvisoirSchema)
    async createPatientProvisoir(@Body() data: CreatePatientProvisoirInput, @Res() res: Response) {
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
    @UseZodSchema(RegularizationPatientSchema)
    async regularisePatient(@Body() data: RegularizationPatientInput, @Res() res: Response) {
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
    @Put("update")
    @UseZodSchema(UpdatePatientSchema)
    async updatePatient(@Body() patient: UpdatePatientInput, @Res() res: Response) {

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
    @UseZodSchema(SearchPatientSchema)
    async searchPatient(@Query() query: SearchPatientInput, @Res() res: Response) {

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

    @Get("only-patient")
    @UseZodSchema(FindOnlyPatientSchema)
    async getOnlyPatient(@Body() data: FindOnePatientInput, @Res() res: Response) {

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

    @Delete("delete")
    @UseZodSchema(softDeleteOnlyPatientSchema)
    async deletePatient(@Body() data: SoftDeleteOnePatientInput, @Res() res: Response) {

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
    @UseZodSchema(MergePatientSchema)
    async fusionPatient(@Body() data : MergePatientInput, @Res() res : Response){
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
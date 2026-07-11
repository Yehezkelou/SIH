import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { CreatePatientDto, SearchPatientDto, UpdatePatientDto } from "../dto/patient.dto";
import { PatientRepository } from "../repositories/patient.repository";
import type {Response} from "express" 


 







@Controller('patient')
export class patientController{
    constructor(
        private readonly service : PatientRepository,
        private readonly logger : PinoLogger
    ){}


    @Post("create")
    async createPatient(@Body() patient : CreatePatientDto, @Res() res : Response){
      
        const result = await this.service.createNewPatient(patient)

        if(!result){
            throw  new HttpException("erreur de creation du patient", HttpStatus.BAD_REQUEST)
        }

        this.logger.info("Creation du patient", {nom : result.numIdentityNational , prenom : result.nom})

        // response 
        res.status(HttpStatus.CREATED).json({
            message : "SUCCEFULL",
            data : result,
            timestamp : new Date().toISOString()
        })
    }

    @Put(":id/:patientId/update")
    async updatePatient(@Param('id') id: string, @Param('patientId') patientId: string,   @Body() patient : UpdatePatientDto, @Res() res : Response){

        const result = await this.service.updatePatient(patient, id, patientId)

        if(!result){
            this.logger.error("ERROR UPDATE PATIENT")
            throw new HttpException("ERROR UPDATED PATIENT", HttpStatus.BAD_REQUEST)
        }

        this.logger.info("PATIENT UPDATED", {...result})
        //
        res.status(HttpStatus.CREATED).json({
            message : "SUCCEFULL",
            data : result,
            timestamp : new Date().toISOString()
        })

    }

    @Get("search")
    async searchPatient(@Query() query : SearchPatientDto, @Res() res : Response){

        const result = await this.service.findPatient(query)

        if(!result){
            this.logger.error("ERROR NO PATIENT FOUND", query)
            throw new HttpException("NO PATIENT FOUND", HttpStatus.NOT_FOUND)

        }

       
        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timestamp : new Date().toISOString()
        })
    }

    @Get()
    async getAllPatient(@Res() res : Response){
        
        const result = await this.service.findAllPatient()

        if(!result){
            this.logger.error("ERROR NO PATIENT FOUND")
            throw new HttpException("NO PATIENT FOUND", HttpStatus.NOT_FOUND)
        }

        this.logger.info("GET ALL PATIENT", result)
        res.status(HttpStatus.OK).json({
            message : "SUCCEFULL",
            data : result,
            timestamp : new Date().toISOString()
        })
    }
}
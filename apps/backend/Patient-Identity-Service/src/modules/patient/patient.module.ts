import { Module } from "@nestjs/common";
import {DatabaseModule} from "../../../../../../libs/database/src/index"
import { Patient } from "./entities/patient.entity";
import { PatientService } from "./services/patient.service";
import { PatientRepository } from "./repositories/patient.repository";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { PatientFilterException } from "../../shared/filters/patient.filter";
import { LoggerModuleGlobale } from "../../../../../../libs/logger/src/index"
import { PatientPipeValidator } from "../../shared/pipes/patient.pipe";
import { patientController } from "./controllers/patient.controller";


@Module({
    imports: [
        DatabaseModule.forRoot([Patient]),
        LoggerModuleGlobale.forRoot('PatientIdentityService')
    ], 
    controllers : [patientController],
    providers : [
        PatientService, 
        PatientRepository, 
        {
            provide : APP_FILTER,
            useClass : PatientFilterException
        },
        {
            provide : APP_PIPE,
            useClass : PatientPipeValidator
        }
    ]
})
export class PatientModule {} 



import { Module } from "@nestjs/common";
import {DatabaseModule} from "../../../../../../libs/database/src/index"
import { Patient } from "./entities/patient.entity";
import { PatientRepository } from "./repositories/patient.repository";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { PatientFilterException } from "../../shared/filters/patient.filter";
import { LoggerModuleGlobale } from "../../../../../../libs/logger/src/index"
import { PatientPipeValidator } from "../../shared/pipes/patient.pipe";
import { patientController } from "./controllers/patient.controller";
import { PatientSubscriber } from "./entities/patient.subscriber";
import { PatientHistory } from "./entities/patient.history.entity";
import { ArchivDossier } from "./entities/archivDossier.entity";
import { ArchivDossierHistory } from "./entities/archivDossier.history.entity";
import { ArchivDossierSubscriber } from "./entities/archivDossier.subscriber";
import { ScheduleModule } from "@nestjs/schedule";
import { PatientSimilarityAlert } from "./entities/patientSimilarityAlert.entity";
import { PatientMergeLog } from "./entities/patientMergeLog.entity";


@Module({
    imports: [
        DatabaseModule.forRoot([Patient, PatientHistory, ArchivDossier, ArchivDossierHistory, PatientSimilarityAlert, PatientMergeLog]),
        LoggerModuleGlobale.forRoot('PatientIdentityService'),
        ScheduleModule.forRoot()
    ],


    controllers : [patientController],
    providers : [


        // gerer les repository patient
        PatientRepository,

        // gerer les subscriber patient
        PatientSubscriber,

        // gerer les subscriber archiv dossier
        ArchivDossierSubscriber,

        // gerer les filter exception patient
        {
            provide : APP_FILTER,
            useClass : PatientFilterException
        },

        // gerer les pipe validator global
        {
            provide : APP_PIPE,
            useClass : PatientPipeValidator
        }
    ]
})


export class PatientModule {} 



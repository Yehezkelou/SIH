import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { AdmissionPipeValidator } from "../shared/pipes/admission.pipe";
import { AdmissionFilterException } from "../shared/filters/admission.filter";
import {DatabaseModule} from "../../../../../libs/database/src/index"
import {LoggerModuleGlobale} from "../../../../../libs/logger/src/index"
import { Admission, AdmissionCompanion, AdmissionDocument, AdmissionPayer, Encounter, EncounterMovement } from "./entities/index";






@Module({
    imports : [
        DatabaseModule.forRoot([AdmissionCompanion, AdmissionDocument, AdmissionPayer, Admission, Encounter, EncounterMovement, ]),
        LoggerModuleGlobale.forRoot("AdmissionService")
    ],

    providers : [
        // validation des donné entrant
         {
            provide : APP_PIPE,
            useClass : AdmissionPipeValidator
         },

         // filtre d'exception
         {
            provide : APP_FILTER,
            useClass : AdmissionFilterException
         }
    ]
})
export class AppAdmissionModule {}

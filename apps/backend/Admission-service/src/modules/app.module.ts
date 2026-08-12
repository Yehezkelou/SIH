import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { AdmissionPipeValidator } from "../shared/pipes/admission.pipe";
import { AdmissionFilterException } from "../shared/filters/admission.filter";
import {DatabaseModule} from "../../../../../libs/database/src/index"
import {LoggerModuleGlobale} from "../../../../../libs/logger/src/index"
import { Admission, AdmissionCompanion, AdmissionDocument, AdmissionPayer, Encounter, EncounterMovement } from "./entities/index";
import { AdmissionRepository } from "./repository/admission.repository";
import { AdmissionService } from "./services/admission.service";






@Module({
    imports : [
        DatabaseModule.forRoot([AdmissionCompanion, AdmissionDocument, AdmissionPayer, Admission, Encounter, EncounterMovement, ]),
        LoggerModuleGlobale.forRoot("AdmissionService")
    ],

    providers : [
        // acces donnees admission
        AdmissionRepository,

        // logique metier / traduction des erreurs
        AdmissionService,

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

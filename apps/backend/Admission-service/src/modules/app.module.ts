import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { AdmissionPipeValidator } from "../shared/pipes/admission.pipe";
import { AdmissionFilterException } from "../shared/filters/admission.filter";
import { DatabaseModule } from "../../../../../libs/database/src/index"
import { LoggerModuleGlobale } from "../../../../../libs/logger/src/index"
import { Admission, AdmissionCompanion, AdmissionDocument, AdmissionHistory, AdmissionPayer, AdmissionSubscriber, Encounter, EncounterMovement } from "./entities/index";
import { AdmissionRepository } from "./repository/admission.repository";
import { EncounterRepository } from "./repository/encounter.repository";
import { EncounterMovementRepository } from "./repository/EncounterMovement.repository";
import { CompanionRepository } from "./repository/companions.repository";
import { PayersRepository } from "./repository/payer.repository";
import { DocumentRepository } from "./repository/documents.repository";
import { AdmissionService } from "./services/admission.service";
import { IntegrationModule } from "./integrations/integration.module";


@Module({
    imports: [
        DatabaseModule.forRoot([
            AdmissionCompanion, 
            AdmissionDocument, 
            AdmissionPayer, 
            Admission, 
            Encounter, 
            EncounterMovement,
            AdmissionHistory
        ]),
        LoggerModuleGlobale.forRoot("AdmissionService"),
        IntegrationModule
    ],

    providers: [

        // subscriber
        AdmissionSubscriber,

        // acces donnees repositories
        AdmissionRepository,
        EncounterRepository,
        EncounterMovementRepository,
        CompanionRepository,
        PayersRepository,
        DocumentRepository,

        // logique metier / traduction des erreurs
        AdmissionService,

        // validation des donné entrant
        {
            provide: APP_PIPE,
            useClass: AdmissionPipeValidator
        },

        // filtre d'exception
        {
            provide: APP_FILTER,
            useClass: AdmissionFilterException
        }
    ]
})

export class AppAdmissionModule {}

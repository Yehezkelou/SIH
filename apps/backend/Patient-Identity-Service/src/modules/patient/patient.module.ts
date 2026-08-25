import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../../../../libs/database/src/index"
import { Patient } from "./entities/patient.entity";
import { PatientRepository } from "./repositories/patient.repository";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { PatientFilterException } from "../../shared/filters/patient.filter";
import { LoggerModuleGlobale } from "../../../../../../libs/logger/src/index"
import { PatientPipeValidator } from "../../shared/pipes/patient.pipe";
import { PatientSubscriber } from "./entities/patient.subscriber";
import { PatientHistory } from "./entities/patient.history.entity";
import { ArchivDossier } from "./entities/archivDossier.entity";
import { ArchivDossierHistory } from "./entities/archivDossier.history.entity";
import { ArchivDossierSubscriber } from "./entities/archivDossier.subscriber";
import { ScheduleModule } from "@nestjs/schedule";
import { PatientSimilarityAlert } from "./entities/patientSimilarityAlert.entity";
import { PatientMergeLog } from "./entities/patientMergeLog.entity";
import { ArchivDossierController, PatientInternalController, patientController, PatientGrpcController } from "./controllers";
import { ArchivDossierRepository } from "./repositories";
import { ArchivDossierService, PatientInternalService, PatientService } from "./services";
import { AuthClientService } from "./services/auth.client";
import { UserAuthGuard } from "../../shared/guards/user-auth.guard";
import { VerifyPersonnelGuard } from "../../shared/guards/verify-personnel.guard";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { credentials } from "@grpc/grpc-js";
import { readFileSync } from "fs";
import { join } from "path";
import { HealthModule } from "../health/health.module";

@Module({
    imports: [
        DatabaseModule.forRoot([Patient, PatientHistory, ArchivDossier, ArchivDossierHistory, PatientSimilarityAlert, PatientMergeLog]),
        LoggerModuleGlobale.forRoot('PatientIdentityService'),
        ScheduleModule.forRoot(),
        JwtModule.register({
            secret: process.env.SERVICE_JWT_SECRET || "default_secret",
        }),
        ClientsModule.register([
            {
                name: "AUTH_PACKAGE",
                transport: Transport.GRPC,
                options: {
                    package: "auth",
                    protoPath: join(process.cwd(), "libs/contracts/proto/auth.proto"),
                    url: process.env.AUTH_GRPC_URL ?? "localhost:50052",
                    credentials: credentials.createSsl(
                        readFileSync(join(process.cwd(), "certs/ca.crt")),
                        readFileSync(join(process.cwd(), "certs/client.key")),
                        readFileSync(join(process.cwd(), "certs/client.crt"))
                    )
                }
            }
        ]),
        HealthModule
    ],


    controllers: [patientController, PatientInternalController, PatientGrpcController, ArchivDossierController],
    providers: [

        // gerer les repository patient
        PatientRepository,

        // gerer les repo archivDossier
        ArchivDossierRepository,

        // gerer les subscriber patient
        PatientSubscriber,

        // gerer les subscriber archiv dossier
        ArchivDossierSubscriber,

        //gerer les service 
        PatientService,
        ArchivDossierService,
        PatientInternalService,
        AuthClientService,
        UserAuthGuard,
        VerifyPersonnelGuard,

        // gerer les filter exception patient
        {
            provide: APP_FILTER,
            useClass: PatientFilterException
        },

        // gerer les pipe validator global
        {
            provide: APP_PIPE,
            useClass: PatientPipeValidator
        }
    ]
})
export class PatientModule {}



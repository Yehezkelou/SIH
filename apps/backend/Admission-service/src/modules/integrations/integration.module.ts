import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PatientClientService } from "./patient.client";







@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : ".env"
        })
    ],

    providers : [PatientClientService],
    exports : [PatientClientService]
})
export class IntegrationModule{}
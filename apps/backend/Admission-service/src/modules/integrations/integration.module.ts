import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PatientClientService } from "./patient.client";
import {ClientsModule, Transport} from "@nestjs/microservices"
import { join } from "path";






@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : ".env"
        }),
        ClientsModule.registerAsync([
            {
                name : "PATIENT_PACKAGE",
                imports : [ConfigModule],
                inject : [ConfigService],
                useFactory : (config : ConfigService) => ({
                    transport : Transport.GRPC,
                    options : {
                        package : "patient",
                        protoPath : join(process.cwd(), "libs/contracts/proto/patient.proto"),
                        url : config.get<string>("PATIENT_GRPC_URL", "localhost:50051"),
                    }
                })
            }
        ])
    ],

    providers : [PatientClientService],
    exports : [PatientClientService]
})
export class IntegrationModule{}
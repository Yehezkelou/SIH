import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PatientClientService } from "./patient.client";
import { AuthClientService } from "./auth.client";
import {ClientsModule, Transport} from "@nestjs/microservices"
import { join } from "path";
import {credentials} from "@grpc/grpc-js"
import { readFileSync } from "fs";





import { JwtModule } from "@nestjs/jwt";

@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : ".env"
        }),
        JwtModule.register({
            secret: process.env.SERVICE_JWT_SECRET || "default_secret",
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
                        "grpc.keepalive_time_ms" : 30000,
                        "grpc.keepalive_timeout_ms" : 10000,
                        credentials : credentials.createSsl(
                            readFileSync(join(process.cwd(), "certs/ca.crt")),
                            readFileSync(join(process.cwd(), "certs/client.key")),
                            readFileSync(join(process.cwd(), "certs/client.crt"))
                        )
                    }
                })
            },
            {
                name : "AUTH_PACKAGE",
                imports : [ConfigModule],
                inject : [ConfigService],
                useFactory : (config : ConfigService) => ({
                    transport : Transport.GRPC,
                    options : {
                        package : "auth",
                        protoPath : join(process.cwd(), "libs/contracts/proto/auth.proto"),
                        url : config.get<string>("AUTH_GRPC_URL", "localhost:50052"),
                        credentials : credentials.createSsl(
                            readFileSync(join(process.cwd(), "certs/ca.crt")),
                            readFileSync(join(process.cwd(), "certs/client.key")),
                            readFileSync(join(process.cwd(), "certs/client.crt")),
                        )
                    }
                })
            }
        ])
    ],

    providers : [PatientClientService, AuthClientService],
    exports : [PatientClientService, AuthClientService]
})
export class IntegrationModule{}
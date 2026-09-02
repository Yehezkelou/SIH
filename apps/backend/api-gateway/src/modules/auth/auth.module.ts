import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { credentials } from "@grpc/grpc-js";
import { readFileSync } from "fs";
import { join } from "path";
import { JwtModule } from "@nestjs/jwt";
import { AuthClientService } from "./auth.client";

@Module({
    imports: [
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
                    ),
                    channelOptions: {
                        "grpc.ssl_target_name_override": "patient-identity-service",
                        "grpc.default_authority": "patient-identity-service"
                    }
                }
            }
        ])
    ],
    providers: [AuthClientService],
    exports: [AuthClientService]
})
export class AuthModule {}

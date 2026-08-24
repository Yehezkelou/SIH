import { Metadata } from "@grpc/grpc-js";
import { Inject, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { ClientGrpc } from "@nestjs/microservices";
import { AuthInternalGrpc, ValidateTokenResponse } from "@org/contracts";
import { lastValueFrom, timeout } from "rxjs";






@Injectable()
export class AuthClientService implements OnModuleInit {

    private authGrpc!:  AuthInternalGrpc
    constructor(
        @Inject("AUTH_PACKAGE") private readonly client : ClientGrpc,
        private readonly jwtService : JwtService
    ){}

    onModuleInit() {
        this.authGrpc = this.client.getService<AuthInternalGrpc>("AuthInternal");
    }

    private buildAuthMetadata(): Metadata {
        const token = this.jwtService.sign(
            {
                iss : process.env.SERVICE_NAME || "admission-service",
                aud : "auth-service"
            },
            {
                secret : process.env.SERVICE_JWT_SECRET || "service_secret",
                expiresIn : "60s"
            }
        )

        const metadata = new Metadata();
        metadata.add("authorization", `Bearer ${token}`);
        return metadata
    }

    // appel gRPC pour valider le jeton de l'utilisateur
    async validateUserToken(accessToken : string) : Promise<ValidateTokenResponse>{

        try {
            const res = await lastValueFrom(
                this.authGrpc.ValidateToken({accessToken}, this.buildAuthMetadata()).pipe(timeout(3000)),
            )
            return res
        }catch(error: any){
            throw new UnauthorizedException("Le service d'authentification est injoignable ou a refusé la requête.")
        } 
    }
}
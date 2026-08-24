import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import { Metadata, status } from "@grpc/grpc-js";
import { RpcException } from "@nestjs/microservices";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class ServiceAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly logger: PinoLogger,
    ) {
        this.logger.setContext(ServiceAuthGuard.name);
    }

    canActivate(context: ExecutionContext): boolean {
        const rpcContext = context.switchToRpc();
        const metadata = rpcContext.getContext<Metadata>();

        // extraire les metadonnées de l'en-tête "authorization"
        const authHeaders = metadata.get("authorization");
        
        if (!authHeaders || authHeaders.length === 0) {
            this.logger.warn({
                message: "Jeton d'authentification inter-service manquant dans les métadonnées gRPC",
                code: "UNAUTHENTICATED",
                context: "ServiceAuthGuard.canActivate",
            });

            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: "Accès refusé : Jeton d'authentification inter-service manquant dans les métadonnées gRPC"
            });
        }

        const rawToken = authHeaders[0] as string;
        const token = rawToken.replace(/^Bearer\s+/i, "");

        if (!token) {
            this.logger.warn({
                message: "Accès refusé : Format de jeton invalide (Format attendu: Bearer <token>)",
                code: "UNAUTHENTICATED",
                context: "ServiceAuthGuard.canActivate",
            });

            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: "Accès refusé : Format de jeton invalide (Format attendu: Bearer <token>)"
            });
        }

        try {
            // vérifier le jeton jwt
            const payload = this.jwtService.verify(token, {
                secret: process.env.SERVICE_JWT_SECRET,
            });

            // contrôler la liste blanche interservice 
            const allowedService = ["admission-service", "patient-identity-service", "urgency-service"];
            if (!allowedService.includes(payload.iss)) {
                this.logger.warn({
                    message: `Accès refusé par la liste blanche interservice pour le service '${payload.iss}'`,
                    code: "PERMISSION_DENIED",
                    context: "ServiceAuthGuard.canActivate",
                });

                throw new RpcException({
                    code: status.PERMISSION_DENIED,
                    message: `Accès refusé : Le microservice '${payload.iss}' n'est pas autorisé à appeler ce service`
                });
            }

            return true;
        } catch (error) {
            if (error instanceof RpcException) throw error;
            
            this.logger.error({
                code: status.UNAUTHENTICATED,
                message: "Jeton d'authentification inter-service invalide",
                error,
                context: "ServiceAuthGuard.canActivate",
            });

            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: "Accès refusé : Jeton d'authentification inter-service invalide ou expiré",
            });
        }
    }
}

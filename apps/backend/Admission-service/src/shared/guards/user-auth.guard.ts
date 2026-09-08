import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthClientService } from "../../modules/integrations/auth.client"

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private readonly authClient: AuthClientService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Jeton d'authentification utilisateur manquant");
        }

        const token = authHeader.split(" ")[1];

        // Validation gRPC avec l'Auth-Service
        const validation = await this.authClient.validateUserToken(token);

        if (!validation.isValid) {
            throw new UnauthorizedException("Session utilisateur expirée ou compte désactivé");
        }

        // Injection des informations utilisateur dans la requête pour utilisation dans les contrôleurs/services
        request.user = {
            id: validation.userId,
            sub: validation.userId,
            matricule: validation.matricule,
            roles: validation.roles || [],
            permissions: validation.permissions || [],
        };

        // Injection automatique de createdBy / updatedBy dans le corps de la requête pour passer la validation Zod
        if (request.body) {
            if (request.method === "POST") {
                request.body.createdBy = validation.userId;
            } else if (["PUT", "PATCH", "DELETE"].includes(request.method)) {
                request.body.updatedBy = validation.userId;
            }
        }

        return true;
    }
}

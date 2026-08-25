import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { AuthClientService } from "./auth.client";
import { isRoutePublic, getRequiredPermission } from "../config/routes.config";

@Injectable()
export class GatewayAuthGuard implements CanActivate {
    constructor(private readonly authClient: AuthClientService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const path = request.path;
        const method = request.method;

        // 1. Laisser passer si la route est publique
        if (isRoutePublic(path, method)) {
            return true;
        }

        // 2. Vérification du token Bearer
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Jeton d'authentification utilisateur manquant");
        }

        const token = authHeader.split(" ")[1];

        // 3. Validation gRPC inter-service auprès de l'Auth-Service
        const validation = await this.authClient.validateUserToken(token);
        if (!validation.isValid) {
            throw new UnauthorizedException("Session utilisateur expirée ou compte désactivé");
        }

        // 4. Contrôle des autorisations (RBAC / Permissions)
        const requiredPermission = getRequiredPermission(path, method);
        if (requiredPermission) {
            const userPermissions = validation.permissions || [];
            const hasPermission = userPermissions.includes(requiredPermission) || userPermissions.includes("*");
            if (!hasPermission) {
                throw new ForbiddenException(`Droits insuffisants pour effectuer cette action (Permission '${requiredPermission}' requise)`);
            }
        }

        // 5. Injection du profil utilisateur dans l'objet Request NestJS
        request.user = {
            id: validation.userId,
            matricule: validation.matricule,
            roles: validation.roles || [],
            permissions: validation.permissions || [],
        };

        // 6. Injection des en-têtes de confiance pour le Proxy
        request.headers["x-user-id"] = validation.userId;
        request.headers["x-user-matricule"] = validation.matricule;
        request.headers["x-user-roles"] = (validation.roles || []).join(",");
        request.headers["x-user-permissions"] = (validation.permissions || []).join(",");

        return true;
    }
}

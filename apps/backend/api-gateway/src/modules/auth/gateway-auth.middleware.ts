import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthClientService } from "./auth.client";
import { isRoutePublic, getRequiredPermission } from "../config/routes.config";


@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
    constructor(private readonly authClient: AuthClientService) {}

    async use(req: Request, res: Response, next: (error?: any) => void) {

        const path = (req.originalUrl || req.url).split("?")[0];
        const method = req.method;

        // 1. Laisser passer si la route est publique
        if (isRoutePublic(path, method)) {
            return next();
        }

        // 2. Vérification de la présence du token Bearer
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return this.deny(res, 401, "Unauthorized", "Jeton d'authentification utilisateur manquant");
        }

        const token = authHeader.split(" ")[1];

        // 3. Validation gRPC inter-service auprès de l'Auth-Service
        let validation;
        try {
            validation = await this.authClient.validateUserToken(token);
        } catch {
            return this.deny(res, 503, "Service Unavailable", "Le service d'authentification est injoignable.");
        }
        if (!validation.isValid) {
            return this.deny(res, 401, "Unauthorized", "Session utilisateur expirée ou compte désactivé");
        }

        // 4. Contrôle des autorisations (RBAC / Permissions)
        const requiredPermission = getRequiredPermission(path, method);
        if (requiredPermission) {
            const userPermissions = validation.permissions || [];
            const hasPermission = userPermissions.includes(requiredPermission) || userPermissions.includes("*");
            if (!hasPermission) {
                return this.deny(
                    res,
                    403,
                    "Forbidden",
                    `Droits insuffisants pour effectuer cette action (Permission '${requiredPermission}' requise)`
                );
            }
        }

        // 5. Injection des en-têtes de confiance consommés par le proxy
        req.headers["x-user-id"] = validation.userId;
        req.headers["x-user-matricule"] = validation.matricule;
        req.headers["x-user-roles"] = (validation.roles || []).join(",");
        req.headers["x-user-permissions"] = (validation.permissions || []).join(",");

        return next();
    }

    private deny(res: Response, statusCode: number, error: string, message: string) {
        res.status(statusCode).json({
            statusCode,
            message,
            error,
            timestamp: new Date().toISOString(),
        });
    }
}

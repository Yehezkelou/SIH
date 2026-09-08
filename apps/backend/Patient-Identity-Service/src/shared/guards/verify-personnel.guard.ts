import { CanActivate, ExecutionContext, Injectable, BadRequestException, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthClientService } from "../../modules/patient/services/auth.client";

export const VERIFY_PERSONNEL_KEY = "verify_personnel_keys";

// Décorateur pour déclarer les IDs de personnel à vérifier (ex: @VerifyPersonnel("createdBy"))
export const VerifyPersonnel = (...keys: string[]) => SetMetadata(VERIFY_PERSONNEL_KEY, keys);

@Injectable()
export class VerifyPersonnelGuard implements CanActivate {
    constructor(
        private readonly authClient: AuthClientService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // Récupère les chemins de clés à valider configurés sur la route
        const keys = this.reflector.get<string[]>(VERIFY_PERSONNEL_KEY, context.getHandler());

        if (!keys || keys.length === 0) {
            return true;
        }

        for (const keyPath of keys) {
            const id = this.resolvePath(request.body, keyPath);

            if (id) {
                // Appel gRPC pour vérifier l'existence de l'ID
                const res = await this.authClient.getUser(id);
                
                if (!res.found || !res.user) {
                    throw new BadRequestException(
                        `L'identifiant de l'agent '${id}' spécifié dans '${keyPath}' n'existe pas dans le système d'authentification.`
                    );
                }
            }
        }

        return true;
    }

    // Helper pour résoudre un chemin imbriqué dans le body (ex: "patient.createdBy")
    private resolvePath(obj: any, path: string): string | null {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj) || null;
    }
}

import { Controller, UseGuards } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { PinoLogger } from "nestjs-pino";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../repositories/user.repository";
import { UserStatus, UserRole, RolePermission } from "../entities";
import { ServiceAuthGuard } from "../../../shared/guards/service-auth.guard";
import type {
  ValidateTokenRequest,
  ValidateTokenResponse,
  GetUserRequest,
  GetUserResponse,
} from "@org/contracts";

@Controller()
export class AuthGrpcController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthGrpcController.name);
  }

  @UseGuards(ServiceAuthGuard)
  @GrpcMethod("AuthInternal", "ValidateToken")
  async validateToken(data: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    this.logger.info({
      message: "Demande de validation de jeton gRPC reçue",
      context: "AuthGrpcController:validateToken",
    });

    try {
      // 1. Vérification de la signature et de l'expiration du jeton utilisateur
      const payload = await this.jwtService.verifyAsync(data.accessToken, {
        secret: process.env.USER_JWT_SECRET || "default_user_secret",
      });

      if (!payload || !payload.sub) {
        this.logger.warn({
          message: "Jeton utilisateur invalide (payload manquant ou incorrect)",
          context: "AuthGrpcController:validateToken",
        });
        return {
          isValid: false,
          userId: "",
          matricule: "",
          roles: [],
          permissions: [],
        };
      }

      // 2. Recherche de l'utilisateur en base de données pour s'assurer qu'il est actif
      const user = await this.userRepo.findByIdentifier(payload.sub);

      if (!user) {
        this.logger.warn({
          message: "Utilisateur non trouvé en base lors de la validation du jeton",
          context: "AuthGrpcController:validateToken",
          userId: payload.sub,
        });
        return {
          isValid: false,
          userId: "",
          matricule: "",
          roles: [],
          permissions: [],
        };
      }

      if (user.status !== UserStatus.ACTIF) {
        this.logger.warn({
          message: `Utilisateur inactif ou suspendu (statut: ${user.status}) lors de la validation du jeton`,
          context: "AuthGrpcController:validateToken",
          userId: user.id,
        });
        return {
          isValid: false,
          userId: "",
          matricule: "",
          roles: [],
          permissions: [],
        };
      }

      // 3. Extraction des rôles et des permissions mis à jour
      const roles: string[] = user.userRoles?.map((ur: UserRole) => ur.role?.code).filter((r): r is string => Boolean(r)) ?? [];
      const permissions: string[] = user.userRoles?.flatMap((ur: UserRole) => ur.role?.rolePermissions?.map((rp: RolePermission) => rp.permission?.code)).filter((p): p is string => Boolean(p)) ?? [];

      this.logger.info({
        message: "Jeton utilisateur validé avec succès",
        context: "AuthGrpcController:validateToken",
        userId: user.id,
        roles,
      });

      return {
        isValid: true,
        userId: user.id,
        matricule: user.matricule,
        roles,
        permissions,
      };
    } catch (error: any) {
      this.logger.warn({
        message: "Échec de validation de l'access token utilisateur",
        context: "AuthGrpcController:validateToken",
        error: error?.message || error,
      });

      return {
        isValid: false,
        userId: "",
        matricule: "",
        roles: [],
        permissions: [],
      };
    }
  }

  @UseGuards(ServiceAuthGuard)
  @GrpcMethod("AuthInternal", "GetUser")
  async getUser(data: GetUserRequest): Promise<GetUserResponse> {
    this.logger.info({
      message: "Demande de résolution d'identité utilisateur gRPC reçue",
      context: "AuthGrpcController:getUser",
      userId: data.userId,
    });

    try {
      const user = await this.userRepo.findByIdentifier(data.userId);

      if (!user) {
        this.logger.warn({
          message: "Utilisateur non trouvé via gRPC GetUser",
          context: "AuthGrpcController:getUser",
          userId: data.userId,
        });
        return { found: false };
      }

      return {
        found: true,
        user: {
          id: user.id,
          matricule: user.matricule,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          personnelType: user.personnelType,
          specialite: user.specialite || "",
          serviceAffectation: user.serviceAffectation || "",
        },
      };
    } catch (error: any) {
      this.logger.error({
        message: "Erreur lors de la résolution de l'utilisateur",
        context: "AuthGrpcController:getUser",
        error: error?.message || error,
      });
      return { found: false };
    }
  }
}

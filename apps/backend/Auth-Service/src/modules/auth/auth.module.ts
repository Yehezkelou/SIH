import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "../../../../../../libs/database/src/index";
import { LoggerModuleGlobale } from "../../../../../../libs/logger/src/index";
import {
    User,
    UserDocument,
    UserHistory,
    UserSubscriber,
    Role,
    Permission,
    UserRole,
    RolePermission,
    RefreshToken,
    PasswordReset,
    LoginAttempt,
} from "./entities/index";
import { UserRepository } from "./repositories/user.repository";
import { UserDocumentRepository } from "./repositories/userDocument.repository";
import { LoginAttemptRepository } from "./repositories/loginAttempt.repository";
import { RefreshTokenRepository } from "./repositories/refreshToken.repository";
import { PasswordResetRepository } from "./repositories/passwordReset.repository";
import { AuthService } from "./services/auth.service";
import { PasswordService } from "./services/password.service";
import { MfaService } from "./services/mfa.service";
import { UserService } from "./services/user.service";
import { UserDocumentService } from "./services/userDocument.service";
import { SeedService } from "./services/seed.service";
import { AuthController } from "./controllers/auth.controller";
import { PasswordController } from "./controllers/password.controller";
import { MfaController } from "./controllers/mfa.controller";
import { UserController } from "./controllers/user.controller";
import { UserDocumentController } from "./controllers/userDocument.controller";
import { AuthPipeValidator } from "../../shared/pipes/auth.pipe";
import { AuthFilterException } from "../../shared/filters/auth.filter";
import { JwtAuthGuard, PermissionGuard, RolesGuard } from "../../shared/guards";

/**
 * Module racine du microservice d'authentification du personnel (Auth-Service).
 */
@Module({
    imports: [
        DatabaseModule.forRoot([
            User,
            UserDocument,
            UserHistory,
            Role,
            Permission,
            UserRole,
            RolePermission,
            RefreshToken,
            PasswordReset,
            LoginAttempt,
        ]),
        LoggerModuleGlobale.forRoot("AuthService"),
        ScheduleModule.forRoot(),
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET || "default_user_secret",
        }),
    ],

    controllers: [
        AuthController,
        PasswordController,
        MfaController,
        UserController,
        UserDocumentController,
    ],

    providers: [
        UserSubscriber,
        UserRepository,
        UserDocumentRepository,
        LoginAttemptRepository,
        RefreshTokenRepository,
        PasswordResetRepository,
        AuthService,
        PasswordService,
        MfaService,
        UserService,
        UserDocumentService,
        SeedService,
        JwtAuthGuard,
        PermissionGuard,
        RolesGuard,
        {
            provide: APP_PIPE,
            useClass: AuthPipeValidator,
        },
        {
            provide: APP_FILTER,
            useClass: AuthFilterException,
        },
    ],
    exports: [
        AuthService,
        PasswordService,
        MfaService,
        UserService,
        UserDocumentService,
        UserRepository,
        UserDocumentRepository,
        LoginAttemptRepository,
        RefreshTokenRepository,
        PasswordResetRepository,
        JwtAuthGuard,
        PermissionGuard,
        RolesGuard,
    ],
})
export class AuthModule {}

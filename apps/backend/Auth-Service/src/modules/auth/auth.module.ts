import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "../../../../../../libs/database/src/index";
import { LoggerModuleGlobale } from "../../../../../../libs/logger/src/index";
import {
    User,
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
import { LoginAttemptRepository } from "./repositories/loginAttempt.repository";
import { RefreshTokenRepository } from "./repositories/refreshToken.repository";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthPipeValidator } from "../../shared/pipes/auth.pipe";
import { AuthFilterException } from "../../shared/filters/auth.filter";

/**
 * Module racine du microservice d'authentification du personnel (Auth-Service).
 */
@Module({
    imports: [
        DatabaseModule.forRoot([
            User,
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
    ],

    providers: [
        UserSubscriber,
        UserRepository,
        LoginAttemptRepository,
        RefreshTokenRepository,
        AuthService,
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
        UserRepository,
        LoginAttemptRepository,
        RefreshTokenRepository,
    ],
})
export class AuthModule {}

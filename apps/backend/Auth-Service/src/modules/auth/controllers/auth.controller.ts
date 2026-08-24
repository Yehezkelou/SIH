import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CurrentUser } from "../../../helpers/decorator/currentUser.decorator";
import { JwtAuthGuard } from "../../../shared/guards";
import {
    LoginPasswordSchema,
    LoginPinSchema,
    RefreshTokenSchema,
    LogoutSchema,
    type LoginPasswordInput,
    type LoginPinInput,
    type RefreshTokenInput,
    type LogoutInput,
} from "../validator";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(AuthController.name);
    }

    // POST /api/auth/login - Connexion classique par Mot de passe
    @Post("login")
    @UseZodSchema(LoginPasswordSchema)
    async login(
        @Body() data: LoginPasswordInput,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip || "";
        const userAgent = (req.headers["user-agent"] as string) || "";

        this.logger.info({
            message: "Tentative de connexion utilisateur par mot de passe",
            context: "POST /api/auth/login",
            identifier: data.identifier,
            ipAddress,
        });

        const result = await this.service.loginPassword(data, ipAddress, userAgent);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/login-pin - Connexion rapide par Code PIN (6 chiffres)
    @Post("login-pin")
    @UseZodSchema(LoginPinSchema)
    async loginPin(
        @Body() data: LoginPinInput,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip || "";
        const userAgent = (req.headers["user-agent"] as string) || "";

        this.logger.info({
            message: "Tentative de connexion utilisateur par Code PIN",
            context: "POST /api/auth/login-pin",
            identifier: data.identifier,
            ipAddress,
        });

        const result = await this.service.loginPin(data, ipAddress, userAgent);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/refresh - Rotation du Refresh Token
    @Post("refresh")
    @UseZodSchema(RefreshTokenSchema)
    async refresh(
        @Body() data: RefreshTokenInput,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip || "";
        const userAgent = (req.headers["user-agent"] as string) || "";

        this.logger.info({
            message: "Demande de rafraîchissement de token",
            context: "POST /api/auth/refresh",
            ipAddress,
        });

        const result = await this.service.refreshToken(data, ipAddress, userAgent);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/logout - Déconnexion de la session courante
    @Post("logout")
    @UseZodSchema(LogoutSchema)
    async logout(
        @Body() data: LogoutInput,
        @Res() res: express.Response
    ) {
        const result = await this.service.logout(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/logout-all - Déconnexion globale de toutes les sessions
    @Post("logout-all")
    @UseGuards(JwtAuthGuard)
    async logoutAll(
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        const result = await this.service.logoutAll(userId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // GET /api/auth/me - Récupérer le profil & permissions de l'agent connecté
    @Get("me")
    @UseGuards(JwtAuthGuard)
    async getMe(
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        const result = await this.service.getMe(userId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}

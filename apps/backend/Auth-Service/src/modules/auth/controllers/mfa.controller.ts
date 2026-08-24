import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { MfaService } from "../services/mfa.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CurrentUser } from "../../../helpers/decorator/currentUser.decorator";
import { JwtAuthGuard } from "../../../shared/guards";
import {
    MfaEnableSchema,
    MfaVerifySchema,
    MfaDisableSchema,
    type MfaEnableInput,
    type MfaVerifyInput,
    type MfaDisableInput,
} from "../validator";

@Controller("auth/mfa")
export class MfaController {
    constructor(
        private readonly mfaService: MfaService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(MfaController.name);
    }

    // POST /api/auth/mfa/setup - Initialisation du secret TOTP
    @Post("setup")
    @UseGuards(JwtAuthGuard)
    async setupMfa(
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Initialisation du MFA TOTP",
            context: "POST /api/auth/mfa/setup",
            userId,
        });

        const result = await this.mfaService.setupMfa(userId);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/mfa/enable - Activation définitive après validation du 1er code
    @Post("enable")
    @UseGuards(JwtAuthGuard)
    @UseZodSchema(MfaEnableSchema)
    async enableMfa(
        @Body() data: MfaEnableInput,
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Validation et activation du MFA",
            context: "POST /api/auth/mfa/enable",
            userId,
        });

        const result = await this.mfaService.enableMfa(userId, data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/mfa/verify - Vérification TOTP lors du flux de login (Étape 2)
    @Post("verify")
    @UseZodSchema(MfaVerifySchema)
    async verifyMfa(
        @Body() data: MfaVerifyInput,
        @Req() req: express.Request,
        @Res() res: express.Response
    ) {
        const ipAddress = (req.headers["x-forwarded-for"] as string) || req.ip || "";
        const userAgent = (req.headers["user-agent"] as string) || "";

        this.logger.info({
            message: "Validation TOTP Login Étape 2",
            context: "POST /api/auth/mfa/verify",
            ipAddress,
        });

        const result = await this.mfaService.verifyMfaLogin(data, ipAddress, userAgent);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/mfa/disable - Désactivation du MFA
    @Post("disable")
    @UseGuards(JwtAuthGuard)
    @UseZodSchema(MfaDisableSchema)
    async disableMfa(
        @Body() data: MfaDisableInput,
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Désactivation du MFA",
            context: "POST /api/auth/mfa/disable",
            userId,
        });

        const result = await this.mfaService.disableMfa(userId, data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}

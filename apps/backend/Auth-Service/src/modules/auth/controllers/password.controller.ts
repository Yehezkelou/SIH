import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { PasswordService } from "../services/password.service";
import { PinoLogger } from "nestjs-pino";
import * as express from "express";
import { UseZodSchema } from "../../../helpers/decorator/zodSchema.decorator";
import { CurrentUser } from "../../../helpers/decorator/currentUser.decorator";
import { JwtAuthGuard } from "../../../shared/guards";
import {
    ChangePasswordSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    type ChangePasswordInput,
    type ForgotPasswordInput,
    type ResetPasswordInput,
} from "../validator";

@Controller("auth")
export class PasswordController {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(PasswordController.name);
    }

    // POST /api/auth/change-password - Changement de mot de passe (ou activation 1ère connexion)
    @Post("change-password")
    @UseGuards(JwtAuthGuard)
    @UseZodSchema(ChangePasswordSchema)
    async changePassword(
        @Body() data: ChangePasswordInput,
        @CurrentUser("id") userId: string,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Demande de changement de mot de passe",
            context: "POST /api/auth/change-password",
            userId,
        });

        const result = await this.passwordService.changePassword(userId, data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/forgot-password - Demande de réinitialisation de mot de passe
    @Post("forgot-password")
    @UseZodSchema(ForgotPasswordSchema)
    async forgotPassword(
        @Body() data: ForgotPasswordInput,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Demande de réinitialisation de mot de passe oublié",
            context: "POST /api/auth/forgot-password",
            identifier: data.identifier,
        });

        const result = await this.passwordService.forgotPassword(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }

    // POST /api/auth/reset-password - Réinitialisation de mot de passe via jeton
    @Post("reset-password")
    @UseZodSchema(ResetPasswordSchema)
    async resetPassword(
        @Body() data: ResetPasswordInput,
        @Res() res: express.Response
    ) {
        this.logger.info({
            message: "Validation de la réinitialisation de mot de passe via jeton",
            context: "POST /api/auth/reset-password",
        });

        const result = await this.passwordService.resetPassword(data);

        return res.status(HttpStatus.OK).json({
            ...result,
            status: HttpStatus.OK,
            timeStamp: new Date().toISOString(),
        });
    }
}

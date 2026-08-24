import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { PasswordResetRepository } from "../repositories/passwordReset.repository";
import { ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput } from "../validator";
import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";
import bcrypt from "bcryptjs";
import crypto from "crypto";

@Injectable()
export class PasswordService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly refreshTokenRepo: RefreshTokenRepository,
        private readonly passwordResetRepo: PasswordResetRepository
    ) {}

    // =========================================================================
    // 1. Changement de mot de passe (Agent connecté ou 1ère connexion / Activation)
    // =========================================================================
    async changePassword(userId: string, data: ChangePasswordInput) {
        const user = await this.userRepo.findByIdentifier(userId);

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        const isOldPasswordValid = user.passwordHash
            ? await bcrypt.compare(data.oldPassword, user.passwordHash)
            : false;

        if (!isOldPasswordValid) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_OLD_PASSWORD_INVALID.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_OLD_PASSWORD_INVALID.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
        const newPinHash = await bcrypt.hash(data.newPinCode, 10);

        await this.userRepo.activateAccount({
            userId: user.id,
            newPasswordHash,
            newPinHash,
        });

        await this.refreshTokenRepo.revokeAllUserTokens(user.id);

        return {
            message: "Mot de passe et Code PIN mis à jour avec succès. Veuillez vous reconnecter.",
        };
    }

    // =========================================================================
    // 2. Demande de mot de passe oublié (POST /auth/forgot-password)
    // =========================================================================
    async forgotPassword(data: ForgotPasswordInput) {
        const user = await this.userRepo.findByIdentifier(data.identifier);

        const genericResponse = {
            message: "Si l'identifiant existe sur le réseau interne, les instructions de réinitialisation ont été générées.",
        };

        if (!user) {
            return genericResponse;
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await this.passwordResetRepo.createResetToken({
            userId: user.id,
            tokenHash,
            expiresAt,
        });

        return {
            ...genericResponse,
            resetToken: rawToken,
        };
    }

    // =========================================================================
    // 3. Réinitialisation de mot de passe via jeton (POST /auth/reset-password)
    // =========================================================================
    async resetPassword(data: ResetPasswordInput) {
        const tokenHash = crypto.createHash("sha256").update(data.token).digest("hex");
        const resetRecord = await this.passwordResetRepo.findByTokenHash(tokenHash);

        if (!resetRecord || resetRecord.usedAt) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_RESET_TOKEN_INVALID.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_RESET_TOKEN_INVALID.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        if (resetRecord.expiresAt < new Date()) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_RESET_TOKEN_EXPIRED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_RESET_TOKEN_EXPIRED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        await this.passwordResetRepo.markAsUsed(resetRecord.id);

        const newPasswordHash = await bcrypt.hash(data.newPassword, 10);

        await this.userRepo.update(
            { id: resetRecord.userId },
            {
                passwordHash: newPasswordHash,
                failedLoginAttempts: 0,
                lockedUntil: undefined,
                passwordChangedAt: new Date(),
            }
        );

        await this.refreshTokenRepo.revokeAllUserTokens(resetRecord.userId);

        return {
            message: "Mot de passe réinitialisé avec succès. Toutes vos sessions ont été déconnectées par sécurité.",
        };
    }
}

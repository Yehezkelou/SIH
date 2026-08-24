import { JwtService } from "@nestjs/jwt";
import { MfaMethod } from "../entities";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";
import { MfaDisableInput, MfaEnableInput, MfaVerifyInput } from "../validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

@Injectable()
export class MfaService {
    constructor(
        private readonly user: UserRepository,
        private readonly authService: AuthService,
        private readonly jwt: JwtService
    ) {}

    // initialisation du MFA
    async setupMfa(userId: string) {
        const user = await this.user.findByIdentifier(userId);

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        // generation d'un secret BASE 32
        const secret = this.generateBase32Secret(20);

        // sauvegarde temporaire en BDD
        await this.user.saveMfaSecret({
            userId: user.id,
            mfaSecret: secret,
            mfaMethod: MfaMethod.TOTP,
        });

        // URL standard reconnue par Authenticator
        const otpAuthUrl = `otpauth://totp/SIH-Hopital:${encodeURIComponent(user.matricule || user.email)}?secret=${secret}&issuer=SIH-Hopital`;

        return {
            message: "Secret MFA généré. Scannez l'URL ou saisissez la clé manuellement sur votre application.",
            secret,
            otpAuthUrl,
        };
    }

    // activation du mfa
    async enableMfa(userId: string, data: MfaEnableInput) {
        const user = await this.user.findByIdentifier(userId);

        if (!user || !user.mfaSecret) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_INITIALIZED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_INITIALIZED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        // verification du code TOTP
        const isValid = this.verifyTotpCode(user.mfaSecret, data.code);

        if (!isValid) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // activation definitive
        await this.user.enableMfa(userId);

        return {
            message: "Double authentification (MFA) activée avec succès sur votre compte.",
        };
    }

    // validation TOTP lors du login
    async verifyMfaLogin(data: MfaVerifyInput, ipAddress?: string, userAgent?: string) {
        let payload: any;

        try {
            payload = this.jwt.verify(
                data.mfaToken,
                {
                    secret: process.env.USER_JWT_SECRET || "default_user_secret",
                }
            );
        } catch {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_MFA_SESSION_EXPIRED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_MFA_SESSION_EXPIRED.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        if (payload?.type !== "MFA_PENDING" || !payload?.sub) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_MFA_TOKEN_INVALID.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_MFA_TOKEN_INVALID.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        const user = await this.user.findByIdentifier(payload.sub);

        if (!user || !user.mfaSecret || !user.mfaEnabled) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_ENABLED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_ENABLED.MESSAGE,
            }, HttpStatus.FORBIDDEN);
        }

        const isValid = this.verifyTotpCode(user.mfaSecret, data.code);
        if (!isValid) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // generation des veritables tokens définitifs
        return await this.authService.generateUserToken(user, ipAddress, userAgent);
    }

    // desactivation du MFA 
    async disableMfa(userId: string, data: MfaDisableInput) {
        const user = await this.user.findByIdentifier(userId);

        if (!user || !user.mfaEnabled || !user.mfaSecret) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_ENABLED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_MFA_NOT_ENABLED.MESSAGE,
            }, HttpStatus.BAD_REQUEST);
        }

        // verification du mot de passe
        const isPasswordValid = user.passwordHash
            ? await bcrypt.compare(data.password, user.passwordHash)
            : false;

        if (!isPasswordValid) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_OLD_PASSWORD_INVALID.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_OLD_PASSWORD_INVALID.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // verification du code topt
        const isTotpValid = this.verifyTotpCode(user.mfaSecret, data.code);

        if (!isTotpValid) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_MFA_CODE.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // desactivation du mfa
        await this.user.disableMfa(userId);

        return {
            message: "Double authentification désactivée avec succès.",
        };
    }

    // helper TOTP
    private generateBase32Secret(length = 20): string {
        const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

        const bytes = crypto.randomBytes(length);
        let secret = "";

        for (let i = 0; i < bytes.length; i++) {
            secret += base32Chars[bytes[i] % 32];
        }
        return secret;
    }

    private verifyTotpCode(base32Secret: string, code: string, window = 1): boolean {
        const timeStep = 30;
        const currentCounter = Math.floor(Date.now() / 1000 / timeStep);

        // on verifie la fenetre temporelle actuelle 
        for (let offset = -window; offset <= window; offset++) {
            const calculatedCode = this.generateTotpCode(base32Secret, currentCounter + offset);

            // on compare avec le code fourni
            if (calculatedCode === code) {
                return true;
            }
        }
        return false;
    }

    private generateTotpCode(base32Secret: string, counter: number): string {
        const key = this.base32Decode(base32Secret);

        const buffer = Buffer.alloc(8);
        buffer.writeBigInt64BE(BigInt(counter), 0);

        const hmac = crypto.createHmac("sha1", key).update(buffer).digest();
        const offset = hmac[hmmacLength(hmac) - 1] & 0x0F;

        const binary =
            ((hmac[offset] & 0x7f) << 24) |
            ((hmac[offset + 1] & 0xff) << 16) |
            ((hmac[offset + 2] & 0xff) << 8) |
            (hmac[offset + 3] & 0xff);

        const otp = binary % 1000000;
        return otp.toString().padStart(6, "0");
    }

    private base32Decode(base32: string): Buffer {
        const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

        let bits = "";
        for (const char of base32.toUpperCase()) {
            const val = base32Chars.indexOf(char);
            if (val >= 0) {
                bits += val.toString(2).padStart(5, "0");
            }
        }

        const bytes: number[] = [];
        for (let i = 0; i + 8 <= bits.length; i += 8) {
            bytes.push(parseInt(bits.substring(i, i + 8), 2));
        }

        return Buffer.from(bytes);
    }
}

function hmmacLength(buf: Buffer): number {
    return buf.length;
}
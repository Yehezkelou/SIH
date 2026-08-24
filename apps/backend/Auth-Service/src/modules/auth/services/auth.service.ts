import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { LoginAttemptRepository } from "../repositories/loginAttempt.repository";
import { RolePermission, User, UserRole, UserStatus } from "../entities";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { JwtService } from "@nestjs/jwt";
import { LoginPasswordInput, LoginPinInput, RefreshTokenInput, LogoutInput } from "../validator";
import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";
import bcrypt from "bcryptjs";
import crypto from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private readonly user: UserRepository,
        private readonly loginAttemp: LoginAttemptRepository,
        private readonly refreshTokenRepo: RefreshTokenRepository,
        private readonly jwt: JwtService
    ) {}

    // connexion par password
    async loginPassword(data: LoginPasswordInput, ipAddress?: string, userAgent?: string) {
        const user = await this.user.findByIdentifier(data.identifier);

        if (!user) {
            await this.loginAttemp.recordAttempt({
                identifierUsed: data.identifier,
                success: false,
                failureReason: "UTILISATEUR_INEXISTANT",
                ipAddress,
                userAgent,
            });

            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // verification du verouillage 
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            await this.loginAttemp.recordAttempt({
                userId: user.id,
                identifierUsed: data.identifier,
                success: false,
                failureReason: "COMPTE_VERROUILLE",
                ipAddress,
                userAgent,
            });

            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_LOCKED.MESSAGE,
                code: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_LOCKED.CODE,
            }, HttpStatus.FORBIDDEN);
        }

        // verification du status du compte 
        if (user.status === UserStatus.SUSPENDU || user.status === UserStatus.INACTIF) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                message: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_DISABLED.MESSAGE,
                code: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_DISABLED.CODE,
            }, HttpStatus.FORBIDDEN);
        }

        // si le compte necessite une activation 
        if (user.status === UserStatus.EN_ATTENTE_ACTIVATION) {
            const isTempPasswordValid = user.passwordHash
                ? await bcrypt.compare(data.password, user.passwordHash)
                : false;

            if (!isTempPasswordValid) {
                await this.user.recordLoginFailure({ user, isPin: false });

                throw new HttpException({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    code: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.CODE,
                    message: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.MESSAGE,
                }, HttpStatus.UNAUTHORIZED);
            }

            return {
                requireActivation: true,
                message: "Première connexion : Veuillez réinitialiser votre mot de passe temporaire et définir votre code PIN 6 chiffres.",
                userId: user.id,
                matricule: user.matricule,
            };
        }

        const isPasswordValid = user.passwordHash
            ? await bcrypt.compare(data.password, user.passwordHash)
            : false;

        if (!isPasswordValid) {
            const failureResult = await this.user.recordLoginFailure({
                user,
                isPin: false,
            });

            await this.loginAttemp.recordAttempt({
                userId: user.id,
                identifierUsed: data.identifier,
                success: false,
                failureReason: failureResult.loked ? "MAUVAIS_MOT_DE_PASSE" : "MOT_DE_PASSE_INCORRECT",
                ipAddress,
                userAgent,
            });

            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.MESSAGE,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_CREDENTIALS.CODE,
            }, HttpStatus.UNAUTHORIZED);
        }

        // succe de connexion 
        await this.user.recordLoginSuccess({
            userId: user.id,
            ipAddress,
        });

        await this.loginAttemp.recordAttempt({
            userId: user.id,
            identifierUsed: data.identifier,
            success: true,
            ipAddress,
            userAgent,
        });

        // si le MFA est activé sur le compte de l'agent
        if (user.mfaEnabled) {
            const mfaToken = this.jwt.sign(
                { sub: user.id, type: "MFA_PENDING" },
                {
                    secret: process.env.USER_JWT_SECRET || "default_user_secret",
                    expiresIn: "3m",
                }
            );

            return {
                mfaRequired: true,
                mfaToken,
                message: "Veuillez saisir le code à 6 chiffres généré par votre application Authenticator.",
            };
        }

        // genere le token du user
        return await this.generateUserToken(user, ipAddress, userAgent);
    }

    // connexion par pin
    async loginPin(data: LoginPinInput, ipAddress?: string, userAgent?: string) {
        const user = await this.user.findByIdentifier(data.identifier);

        if (!user || !user.pinEnabled || !user.pinHash) {
            await this.loginAttemp.recordAttempt({
                userId: user?.id,
                identifierUsed: data.identifier,
                success: false,
                failureReason: "CODE_PIN_INVALID",
                ipAddress,
                userAgent,
            });

            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        if (user.pinLockedUntil && user.pinLockedUntil > new Date()) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.MESSAGE,
            }, HttpStatus.FORBIDDEN);
        }

        const isPinValid = await bcrypt.compare(data.pinCode, user.pinHash);

        if (!isPinValid) {
            await this.user.recordLoginFailure({ user, isPin: true });
            await this.loginAttemp.recordAttempt({
                userId: user.id,
                identifierUsed: data.identifier,
                success: false,
                failureReason: "MAUVAIS_CODE_PIN",
                ipAddress,
                userAgent,
            });

            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_PIN.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        await this.user.recordLoginSuccess({
            userId: user.id,
            ipAddress,
        });

        await this.loginAttemp.recordAttempt({
            userId: user.id,
            identifierUsed: data.identifier,
            success: true,
            ipAddress,
            userAgent,
        });

        return await this.generateUserToken(user, ipAddress, userAgent);
    }

    // rotation du refresh token
    async refreshToken(data: RefreshTokenInput, ipAddress?: string, userAgent?: string) {
        const tokenHash = crypto.createHash("sha256").update(data.refreshToken).digest("hex");
        const storedToken = await this.refreshTokenRepo.findByTokenHash(tokenHash);

        if (!storedToken) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_INVALID_REFRESH_TOKEN.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_INVALID_REFRESH_TOKEN.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        if (storedToken.revokedAt || storedToken.replacedByTokenId) {
            await this.refreshTokenRepo.revokeAllUserTokens(storedToken.userId);

            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: "Alerte de sécurité : Tentative de rejeu détectée. Toutes vos sessions ont été révoquées.",
            }, HttpStatus.FORBIDDEN);
        }

        if (storedToken.expiresAt < new Date()) {
            await this.refreshTokenRepo.revokeToken({ tokenId: storedToken.id });
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                code: MESSAGE_ERROR_AUTH.AUTH_TOKEN_EXPIRED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_TOKEN_EXPIRED.MESSAGE,
            }, HttpStatus.UNAUTHORIZED);
        }

        const user = await this.user.findByIdentifier(storedToken.userId);

        if (!user || user.status === UserStatus.SUSPENDU || user.status === UserStatus.INACTIF) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_DISABLED.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_ACCOUNT_DISABLED.MESSAGE,
            }, HttpStatus.FORBIDDEN);
        }

        const newRawRefreshToken = crypto.randomBytes(40).toString("hex");
        const newTokenHash = crypto.createHash("sha256").update(newRawRefreshToken).digest("hex");
        const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const newStoredToken = await this.refreshTokenRepo.createRefreshToken({
            userId: user.id,
            tokenHash: newTokenHash,
            expiresAt: newExpiresAt,
            ipAddress,
            userAgent,
        });

        await this.refreshTokenRepo.revokeToken({
            tokenId: storedToken.id,
            replacedByTokenId: newStoredToken.id,
        });

        const roles: string[] = user.userRoles?.map((ur: UserRole) => ur.role?.code).filter((r): r is string => Boolean(r)) ?? [];
        const permissions: string[] = user.userRoles?.flatMap((ur: UserRole) => ur.role?.rolePermissions?.map((rp: RolePermission) => rp.permission?.code)).filter((p): p is string => Boolean(p)) ?? [];

        const accessToken = this.jwt.sign(
            { sub: user.id, matricule: user.matricule, email: user.email, roles, permissions },
            {
                secret: process.env.USER_JWT_SECRET || "default_user_secret",
                expiresIn: (process.env.USER_JWT_SECRET_EXPIRESIN as any) || "15m",
            }
        );

        return {
            message: "Tokens rafraîchis avec succès",
            accessToken,
            refreshToken: newRawRefreshToken,
        };
    }

    // deconnexion 
    async logout(data: LogoutInput) {
        const tokenHash = crypto.createHash("sha256").update(data.refreshToken).digest("hex");
        const storedToken = await this.refreshTokenRepo.findByTokenHash(tokenHash);

        if (storedToken && !storedToken.revokedAt) {
            await this.refreshTokenRepo.revokeToken({ tokenId: storedToken.id });
        }

        return { message: "Déconnexion réussie" };
    }

    // deconnexion globale
    async logoutAll(userId: string) {
        await this.refreshTokenRepo.revokeAllUserTokens(userId);
        return { message: "Toutes vos sessions ont été révoquées avec succès" };
    }

    // get me
    async getMe(userId: string) {
        const user = await this.user.findByIdentifier(userId);

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        const roles: string[] = user.userRoles?.map((ur: UserRole) => ur.role?.code).filter((r): r is string => Boolean(r)) ?? [];
        const permissions: string[] = user.userRoles?.flatMap((ur: UserRole) => ur.role?.rolePermissions?.map((rp: RolePermission) => rp.permission?.code)).filter((p): p is string => Boolean(p)) ?? [];

        return {
            user: {
                id: user.id,
                matricule: user.matricule,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                personnelType: user.personnelType,
                serviceAffectation: user.serviceAffectation,
                roles,
                permissions,
            },
        };
    }

    // generate user token
    async generateUserToken(user: User, ipAddress?: string, userAgent?: string) {
        const roles: string[] = user.userRoles?.map((ur: UserRole) => ur.role?.code).filter((r): r is string => Boolean(r)) ?? [];
        const permissions: string[] = user.userRoles?.flatMap((ur: UserRole) => ur.role?.rolePermissions?.map((rp: RolePermission) => rp.permission?.code)).filter((p): p is string => Boolean(p)) ?? [];

        const payload = {
            sub: user.id,
            matricule: user.matricule,
            email: user.email,
            roles,
            permissions,
        };

        const accessToken = this.jwt.sign(
            payload,
            {
                secret: process.env.USER_JWT_SECRET || "default_user_secret",
                expiresIn: (process.env.USER_JWT_SECRET_EXPIRESIN as any) || "15m",
            }
        );

        const rawRefreshToken = crypto.randomBytes(40).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(rawRefreshToken).digest("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.refreshTokenRepo.createRefreshToken({
            userId: user.id,
            tokenHash,
            expiresAt,
            ipAddress,
            userAgent,
        });

        return {
            message: "SUCCESSFUL",
            accessToken,
            refreshToken: rawRefreshToken,
            user: {
                id: user.id,
                matricule: user.matricule,
                nom: user.nom,
                prenom: user.prenom,
                personnelType: user.personnelType,
                serviceAffectation: user.serviceAffectation,
                roles,
                permissions,
            },
        };
    }
}
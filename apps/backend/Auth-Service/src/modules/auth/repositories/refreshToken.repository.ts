import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { RefreshToken } from "../entities";
import { CreateRefreshTokenRepoInput, RevokeTokenRepoInput } from "../validator";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
    constructor(private readonly dataSource: DataSource) {
        super(RefreshToken, dataSource.createEntityManager());
    }

    // 1. Recherche d'un token par son hash SHA-256
    async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
        return await this.findOne({ where: { tokenHash } });
    }

    // 2. Création d'un nouveau refresh token
    async createRefreshToken(data: CreateRefreshTokenRepoInput): Promise<RefreshToken> {
        const token = this.create({
            userId: data.userId,
            tokenHash: data.tokenHash,
            expiresAt: data.expiresAt,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
        });
        return await this.save(token);
    }

    // 3. Révocation d'un token spécifique
    async revokeToken(data: RevokeTokenRepoInput): Promise<void> {
        await this.update(
            { id: data.tokenId },
            {
                revokedAt: new Date(),
                replacedByTokenId: data.replacedByTokenId,
            }
        );
    }

    // 4. Révocation globale (Déconnexion de toutes les sessions d'un utilisateur)
    async revokeAllUserTokens(userId: string): Promise<void> {
        await this.createQueryBuilder()
            .update(RefreshToken)
            .set({ revokedAt: new Date() })
            .where("userId = :userId AND revokedAt IS NULL", { userId })
            .execute();
    }
}

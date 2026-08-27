import * as typeorm from "typeorm";
import { User } from "./user.entity";

/**
 * Entité RefreshToken (session / rotation de jetons)
 *
 * Stocke les jetons de rafraîchissement émis lors de la connexion pour gérer
 * les sessions et la rotation sécurisée des JWT. On ne stocke que l'empreinte
 * (hash) du token, jamais le token en clair. La révocation (déconnexion,
 * changement de mot de passe, vol détecté) se fait en renseignant `revokedAt`.
 */
@typeorm.Entity("refresh_tokens")
export class RefreshToken {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    userId!: string;

    @typeorm.ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "userId" })
    user?: typeorm.Relation<User>;

    // Empreinte SHA-256 du refresh token (jamais le token en clair)
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", select: false })
    tokenHash!: string;

    // Contexte d'émission (traçabilité des appareils / sessions)
    @typeorm.Column({ length: 512, type: "varchar", nullable: true })
    userAgent?: string;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    ipAddress?: string;

    // Expiration du jeton
    @typeorm.Column({ type: "timestamp" })
    expiresAt!: Date;

    // Révocation (déconnexion, sécurité) : null = jeton encore valide
    @typeorm.Column({ type: "timestamp", nullable: true })
    revokedAt?: Date;

    // En cas de rotation : id du jeton qui l'a remplacé (détection de rejeu)
    @typeorm.Column({ type: "uuid", nullable: true })
    replacedByTokenId?: string;

    @typeorm.CreateDateColumn()
    createdAt!: Date;
}

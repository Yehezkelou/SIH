import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

/**
 * Entité RefreshToken (session / rotation de jetons)
 *
 * Stocke les jetons de rafraîchissement émis lors de la connexion pour gérer
 * les sessions et la rotation sécurisée des JWT. On ne stocke que l'empreinte
 * (hash) du token, jamais le token en clair. La révocation (déconnexion,
 * changement de mot de passe, vol détecté) se fait en renseignant `revokedAt`.
 */
@Entity("refresh_tokens")
export class RefreshToken {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    userId!: string;

    @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    // Empreinte SHA-256 du refresh token (jamais le token en clair)
    @Index()
    @Column({ length: 255, type: "varchar", select: false })
    tokenHash!: string;

    // Contexte d'émission (traçabilité des appareils / sessions)
    @Column({ length: 512, type: "varchar", nullable: true })
    userAgent?: string;

    @Column({ length: 255, type: "varchar", nullable: true })
    ipAddress?: string;

    // Expiration du jeton
    @Column({ type: "timestamp" })
    expiresAt!: Date;

    // Révocation (déconnexion, sécurité) : null = jeton encore valide
    @Column({ type: "timestamp", nullable: true })
    revokedAt?: Date;

    // En cas de rotation : id du jeton qui l'a remplacé (détection de rejeu)
    @Column({ type: "uuid", nullable: true })
    replacedByTokenId?: string;

    @CreateDateColumn()
    createdAt!: Date;
}

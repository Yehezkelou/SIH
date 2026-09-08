import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

/**
 * Entité PasswordReset (réinitialisation de mot de passe)
 *
 * Jeton à usage unique et à durée de vie courte, envoyé à l'utilisateur pour
 * réinitialiser son mot de passe. On ne stocke que l'empreinte du jeton.
 * `usedAt` garantit l'usage unique ; `expiresAt` la péremption.
 */
@Entity("password_resets")
export class PasswordReset {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    userId!: string;

    // Empreinte SHA-256 du jeton de réinitialisation
    @Index()
    @Column({ length: 255, type: "varchar", select: false })
    tokenHash!: string;

    @Column({ type: "timestamp" })
    expiresAt!: Date;

    // Renseigné dès que le jeton est consommé (usage unique)
    @Column({ type: "timestamp", nullable: true })
    usedAt?: Date;

    // Contexte de la demande (traçabilité)
    @Column({ length: 255, type: "varchar", nullable: true })
    requestedIp?: string;

    @CreateDateColumn()
    createdAt!: Date;
}

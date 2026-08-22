import { Column, CreateDateColumn, Entity, In, Index, PrimaryGeneratedColumn } from "typeorm";
import { LoginAttemptStatus } from "./auth.enum";

/**
 * Entité LoginAttempt (journal d'audit des connexions)
 *
 * Trace chaque tentative de connexion (réussie ou non) et les déconnexions.
 * Équivalent modernisé des tables `logconnexion` / `log_activity` du SIH
 * historique. Sert à la sécurité (détection de brute-force), à l'audit et à
 * la traçabilité réglementaire.
 *
 * `userId` peut être null : tentative sur un email inexistant, qu'on veut
 * quand même journaliser.
 */
@Entity("login_attempts")
export class LoginAttempt {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid", nullable: true })
    userId?: string;

    // Identifiant saisi lors de la tentative (email ou matricule)
    @Index()
    @Column({ length: 255, type: "varchar", nullable: true })
    identifiant?: string;

    @Index()
    @Column({ type: "enum", enum: LoginAttemptStatus })
    status!: LoginAttemptStatus;

    @Index()
    @Column({length : 255, type : "boolean", nullable : true})
    success!: boolean
    
    @Column({ length: 255, type: "varchar", nullable: true })
    ipAddress?: string;

    @Column({ length: 512, type: "varchar", nullable: true })
    userAgent?: string;

    // Détail libre (raison de l'échec, message technique)
    @Column({ type: "text", nullable: true })
    detail?: string;

    @CreateDateColumn()
    @Index()
    createdAt!: Date;
}

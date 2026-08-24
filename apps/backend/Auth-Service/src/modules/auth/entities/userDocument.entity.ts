import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserDocumentType } from "./auth.enum";
import { User } from "./user.entity";

/**
 * Entité UserDocument (justificatifs et documents d'identité du personnel)
 */
@Entity("user_documents")
export class UserDocument {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    userId!: string;

    @ManyToOne(() => User, (user) => user.documents, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User;

    @Column({ type: "enum", enum: UserDocumentType, default: UserDocumentType.AUTRE })
    documentType!: UserDocumentType;

    // Nom original du fichier uploadé (ex: "cni_dr_dupont.pdf")
    @Column({ length: 255, type: "varchar" })
    documentName!: string;

    // Chemin de stockage ou URL sécurisée du fichier
    @Column({ length: 500, type: "varchar" })
    documentUrl!: string;

    // Taille du fichier en octets
    @Column({ type: "integer", nullable: true })
    documentSize?: number;

    // Extension ou type MIME (ex: "pdf", "image/png")
    @Column({ length: 100, type: "varchar", nullable: true })
    documentExtension?: string;

    // Numéro de la pièce (ex: numéro CNI, numéro de diplôme)
    @Column({ length: 255, type: "varchar", nullable: true })
    numeroDocument?: string;

    @Column({ type: "date", nullable: true })
    dateDelivrance?: Date;

    @Column({ type: "date", nullable: true })
    dateExpiration?: Date;

    // Date de liaison du document
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    attachedAt!: Date;

    // Suppression douce (Soft Delete)
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

import * as typeorm from "typeorm";
import { UserDocumentType } from "./auth.enum";
import { User } from "./user.entity";

/**
 * Entité UserDocument (justificatifs et documents d'identité du personnel)
 */
@typeorm.Entity("user_documents")
export class UserDocument {
    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    userId!: string;

    @typeorm.ManyToOne(() => User, (user) => user.documents, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "userId" })
    user!: typeorm.Relation<User>;

    @typeorm.Column({ type: "enum", enum: UserDocumentType, default: UserDocumentType.AUTRE })
    documentType!: UserDocumentType;

    // Nom original du fichier uploadé (ex: "cni_dr_dupont.pdf")
    @typeorm.Column({ length: 255, type: "varchar" })
    documentName!: string;

    // Chemin de stockage ou URL sécurisée du fichier
    @typeorm.Column({ length: 500, type: "varchar" })
    documentUrl!: string;

    // Taille du fichier en octets
    @typeorm.Column({ type: "integer", nullable: true })
    documentSize?: number;

    // Extension ou type MIME (ex: "pdf", "image/png")
    @typeorm.Column({ length: 100, type: "varchar", nullable: true })
    documentExtension?: string;

    // Numéro de la pièce (ex: numéro CNI, numéro de diplôme)
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    numeroDocument?: string;

    @typeorm.Column({ type: "date", nullable: true })
    dateDelivrance?: Date;

    @typeorm.Column({ type: "date", nullable: true })
    dateExpiration?: Date;

    // Date de liaison du document
    @typeorm.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    attachedAt!: Date;

    // Suppression douce (Soft Delete)
    @typeorm.DeleteDateColumn({ nullable: true })
    deletedAt?: Date;

    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;
}

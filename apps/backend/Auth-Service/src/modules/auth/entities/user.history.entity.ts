import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HistoryAction } from "./auth.enum";

/**
 * Historique des modifications d'un compte utilisateur (personnel).
 *
 * Peuplé automatiquement par UserSubscriber à chaque CREATE / UPDATE / DELETE.
 * Les snapshots oldData/newData excluent les colonnes sensibles
 * (passwordHash, mfaSecret) — voir helpers/entitySnapshot.ts.
 */

@Entity("user_history")
export class UserHistory {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // Référence vers le compte concerné (User.id)
    @Column()
    userId!: string;

    // État avant modification (snapshot JSON)
    @Column({ type: "jsonb", nullable: true })
    oldData!: Record<string, any>;

    // État après modification (snapshot JSON)
    @Column({ type: "jsonb", nullable: true })
    newData!: Record<string, any>;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "enum", enum: HistoryAction })
    action!: HistoryAction;

    // Compte à l'origine de l'action
    @Column({ type: "varchar", length: 255, nullable: true })
    changeBy!: string;
}

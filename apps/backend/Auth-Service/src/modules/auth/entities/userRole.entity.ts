import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";

/**
 * Entité de liaison User <-> Role (RBAC, plusieurs-à-plusieurs explicite)
 *
 * On modélise la relation comme une entité à part entière (plutôt qu'un
 * simple @ManyToMany) pour tracer QUI a attribué le rôle, QUAND, et pouvoir
 * le révoquer / le limiter dans le temps sans perdre l'historique.
 */
@Entity("user_roles")
@Unique(["userId", "roleId"])
export class UserRole {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    userId!: string;

    @Index()
    @Column({ type: "uuid" })
    roleId!: string;

    @ManyToOne(() => User, (user) => user.userRoles, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: "CASCADE" })
    @JoinColumn({ name: "roleId" })
    role?: Role;

    // Attribution éventuellement limitée dans le temps (ex: intérim, garde)
    @Column({ type: "timestamp", nullable: true })
    expiresAt?: Date;

    @CreateDateColumn()
    assignedAt!: Date;

    // Administrateur ayant attribué le rôle
    @Column({ length: 255, type: "varchar", nullable: true })
    assignedBy?: string;
}

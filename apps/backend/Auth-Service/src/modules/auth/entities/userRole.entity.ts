import * as typeorm from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";

/**
 * Entité de liaison User <-> Role (RBAC, plusieurs-à-plusieurs explicite)
 *
 * On modélise la relation comme une entité à part entière (plutôt qu'un
 * simple @ManyToMany) pour tracer QUI a attribué le rôle, QUAND, et pouvoir
 * le révoquer / le limiter dans le temps sans perdre l'historique.
 */
@typeorm.Entity("user_roles")
@typeorm.Unique(["userId", "roleId"])
export class UserRole {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    userId!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    roleId!: string;

    @typeorm.ManyToOne(() => User, (user) => user.userRoles, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "userId" })
    user?: typeorm.Relation<User>;

    @typeorm.ManyToOne(() => Role, (role) => role.userRoles, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "roleId" })
    role?: typeorm.Relation<Role>;

    // Attribution éventuellement limitée dans le temps (ex: intérim, garde)
    @typeorm.Column({ type: "timestamp", nullable: true })
    expiresAt?: Date;

    @typeorm.CreateDateColumn()
    assignedAt!: Date;

    // Administrateur ayant attribué le rôle
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    assignedBy?: string;
}

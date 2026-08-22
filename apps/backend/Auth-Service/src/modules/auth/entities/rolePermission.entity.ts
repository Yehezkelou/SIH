import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

/**
 * Entité de liaison Role <-> Permission (RBAC, plusieurs-à-plusieurs explicite)
 *
 * Rattache une permission à un rôle. Entité explicite pour tracer l'octroi
 * (qui / quand) et permettre une future granularité (permission refusée, etc.).
 */
@Entity("role_permissions")
@Unique(["roleId", "permissionId"])
export class RolePermission {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "uuid" })
    roleId!: string;

    @Index()
    @Column({ type: "uuid" })
    permissionId!: string;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "roleId" })
    role?: Role;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "permissionId" })
    permission?: Permission;

    @CreateDateColumn()
    grantedAt!: Date;

    @Column({ length: 255, type: "varchar", nullable: true })
    grantedBy?: string;
}

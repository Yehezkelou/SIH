import * as typeorm from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

/**
 * Entité de liaison Role <-> Permission (RBAC, plusieurs-à-plusieurs explicite)
 *
 * Rattache une permission à un rôle. Entité explicite pour tracer l'octroi
 * (qui / quand) et permettre une future granularité (permission refusée, etc.).
 */
@typeorm.Entity("role_permissions")
@typeorm.Unique(["roleId", "permissionId"])
export class RolePermission {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    roleId!: string;

    @typeorm.Index()
    @typeorm.Column({ type: "uuid" })
    permissionId!: string;

    @typeorm.ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "roleId" })
    role?: typeorm.Relation<Role>;

    @typeorm.ManyToOne(() => Permission, (permission) => permission.rolePermissions, { onDelete: "CASCADE" })
    @typeorm.JoinColumn({ name: "permissionId" })
    permission?: typeorm.Relation<Permission>;

    @typeorm.CreateDateColumn()
    grantedAt!: Date;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    grantedBy?: string;
}

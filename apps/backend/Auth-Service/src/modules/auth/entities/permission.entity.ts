import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermissionAction } from "./auth.enum";
import { RolePermission } from "./rolePermission.entity";

/**
 * Entité Permission (RBAC)
 *
 * Autorisation atomique sur une ressource. Le `code` est la clé vérifiée par
 * les guards (ex: "patient:READ", "admission:CREATE", "user:MANAGE").
 * Une permission est reliée à plusieurs rôles via RolePermission.
 */
@Entity("permissions")
export class Permission {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // Code unique de la permission, format "<ressource>:<action>"
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    code!: string;

    // Ressource ciblée (ex: "patient", "admission", "user", "role")
    @Index()
    @Column({ length: 255, type: "varchar", nullable: false })
    ressource!: string;

    // Verbe autorisé sur la ressource
    @Column({ type: "enum", enum: PermissionAction })
    action!: PermissionAction;

    @Column({ type: "text", nullable: true })
    description?: string;

    // Relations
    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
    rolePermissions?: RolePermission[];

    // Métadonnées système
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

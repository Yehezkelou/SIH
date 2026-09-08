import * as typeorm from "typeorm";
import { PermissionAction } from "./auth.enum";
import { RolePermission } from "./rolePermission.entity";

/**
 * Entité Permission (RBAC)
 *
 * Autorisation atomique sur une ressource. Le `code` est la clé vérifiée par
 * les guards (ex: "patient:READ", "admission:CREATE", "user:MANAGE").
 * Une permission est reliée à plusieurs rôles via RolePermission.
 */
@typeorm.Entity("permissions")
export class Permission {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // Code unique de la permission, format "<ressource>:<action>"
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: false })
    code!: string;

    // Ressource ciblée (ex: "patient", "admission", "user", "role")
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", nullable: false })
    ressource!: string;

    // Verbe autorisé sur la ressource
    @typeorm.Column({ type: "enum", enum: PermissionAction })
    action!: PermissionAction;

    @typeorm.Column({ type: "text", nullable: true })
    description?: string;

    // Relations
    @typeorm.OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
    rolePermissions?: typeorm.Relation<RolePermission[]>;

    // Métadonnées système
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;
}

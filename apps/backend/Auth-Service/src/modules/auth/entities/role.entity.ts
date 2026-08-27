import * as typeorm from "typeorm";
import { UserRole } from "./userRole.entity";
import { RolePermission } from "./rolePermission.entity";

/**
 * Entité Role (RBAC)
 *
 * Un rôle regroupe un ensemble de permissions et est attribué à des
 * utilisateurs (ex: ROLE_MEDECIN, ROLE_AGENT_ADMISSION, ROLE_ADMIN).
 * Un utilisateur peut cumuler plusieurs rôles (relation via UserRole).
 */
@typeorm.Entity("roles")
export class Role {

    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // Code technique unique et stable (ex: "ROLE_ADMIN"), utilisé dans le code
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: false })
    code!: string;

    // Libellé lisible affiché dans l'interface (ex: "Agent d'admission")
    @typeorm.Column({ length: 255, type: "varchar", nullable: false })
    libelle!: string;

    @typeorm.Column({ type: "text", nullable: true })
    description?: string;

    // Rôle système (livré par défaut) : non supprimable par un administrateur
    @typeorm.Column({ type: "boolean", default: false })
    isSystem!: boolean;

    // Relations
    @typeorm.OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles?: typeorm.Relation<UserRole[]>;

    @typeorm.OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
    rolePermissions?: typeorm.Relation<RolePermission[]>;

    // Métadonnées système
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    createdBy?: string;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}

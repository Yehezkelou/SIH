import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./userRole.entity";
import { RolePermission } from "./rolePermission.entity";

/**
 * Entité Role (RBAC)
 *
 * Un rôle regroupe un ensemble de permissions et est attribué à des
 * utilisateurs (ex: ROLE_MEDECIN, ROLE_AGENT_ADMISSION, ROLE_ADMIN).
 * Un utilisateur peut cumuler plusieurs rôles (relation via UserRole).
 */
@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    // Code technique unique et stable (ex: "ROLE_ADMIN"), utilisé dans le code
    @Index()
    @Column({ length: 255, type: "varchar", unique: true, nullable: false })
    code!: string;

    // Libellé lisible affiché dans l'interface (ex: "Agent d'admission")
    @Column({ length: 255, type: "varchar", nullable: false })
    libelle!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    // Rôle système (livré par défaut) : non supprimable par un administrateur
    @Column({ type: "boolean", default: false })
    isSystem!: boolean;

    // Relations
    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles?: UserRole[];

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
    rolePermissions?: RolePermission[];

    // Métadonnées système
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ length: 255, type: "varchar", nullable: true })
    createdBy?: string;

    @Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}

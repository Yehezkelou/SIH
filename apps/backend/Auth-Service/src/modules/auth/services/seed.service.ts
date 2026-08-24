import { Injectable, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PinoLogger } from "nestjs-pino";
import {
    Permission,
    PersonnelType,
    Role,
    RolePermission,
    User,
    UserRole,
    UserStatus,
} from "../entities";
import { SYSTEM_PERMISSIONS, SYSTEM_ROLES } from "../../../../../../../libs/contracts/src/index";
import bcrypt from "bcryptjs";

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger: PinoLogger
    ) {
        this.logger.setContext(SeedService.name);
    }

    async onModuleInit() {
        this.logger.info("Vérification et initialisation du Seed RBAC...");
        await this.seedPermissionsAndRoles();
        await this.seedDefaultSuperAdmin();
    }

    // seed des permissions et des roles systeme
    private async seedPermissionsAndRoles() {
        await this.dataSource.transaction(async (manager) => {
            // 1. injection des permissions
            const permissionMap = new Map<string, Permission>();

            for (const permDef of SYSTEM_PERMISSIONS) {
                let perm = await manager.findOne(Permission, { where: { code: permDef.code } });
                if (!perm) {
                    perm = manager.create(Permission, {
                        code: permDef.code,
                        ressource: permDef.ressource,
                        action: permDef.action as any,
                        description: permDef.description,
                    });
                    perm = await manager.save(perm);
                }
                permissionMap.set(perm.code, perm);
            }
            
            // 2. injection des roles systeme
            for (const roleDef of SYSTEM_ROLES) {
                let role = await manager.findOne(Role, { where: { code: roleDef.code } });

                if (!role) {
                    role = manager.create(Role, {
                        code: roleDef.code,
                        libelle: roleDef.libelle,
                        description: roleDef.description,
                        isSystem: true,
                    });
                    role = await manager.save(role);
                }

                // 3. liaison des permissions au role
                const targetPerms = roleDef.permissions.includes("*")
                    ? Array.from(permissionMap.values())
                    : (roleDef.permissions.map((code : any) => permissionMap.get(code)).filter(Boolean) as Permission[]);

                for (const perm of targetPerms) {
                    const exists = await manager.findOne(RolePermission, {
                        where: { roleId: role.id, permissionId: perm.id },
                    });

                    if (!exists) {
                        const rp = manager.create(RolePermission, {
                            roleId: role.id,
                            permissionId: perm.id,
                            grantedBy: "SYSTEM_SEED",
                        });
                        await manager.save(rp);
                    }
                }
            }
        });
    }

    // seed du compte superadmin par defaut
    private async seedDefaultSuperAdmin() {
        const superAdminEmail = process.env.SUPERADMIN_EMAIL || "superadmin@hopital.local";
        const superAdminMatricule = "SUPER-0001";

        const existing = await this.dataSource.getRepository(User).findOne({
            where: [{ email: superAdminEmail }, { matricule: superAdminMatricule }],
        });

        if (existing) {
            return; // deja initialise
        }

        const superAdminRole = await this.dataSource.getRepository(Role).findOne({
            where: { code: "SUPER_ADMIN" },
        });

        if (!superAdminRole) {
            return;
        }

        const defaultPassword = process.env.SUPERADMIN_PASSWORD || "SuperAdmin@2026!";
        const passwordHash = await bcrypt.hash(defaultPassword, 10);

        await this.dataSource.transaction(async (manager) => {
            const superAdmin = manager.create(User, {
                nom: "Système",
                prenom: "SuperAdmin",
                email: superAdminEmail,
                matricule: superAdminMatricule,
                personnelType: PersonnelType.SUPER_ADMIN,
                status: UserStatus.ACTIF,
                mustChangePassword: false,
                passwordHash,
                createdBy: "SYSTEM_INIT",
            });

            const savedUser = await manager.save(superAdmin);

            const userRole = manager.create(UserRole, {
                userId: savedUser.id,
                roleId: superAdminRole.id,
                assignedBy: "SYSTEM_INIT",
            });

            await manager.save(userRole);
        });

        this.logger.info(`Compte SuperAdmin initialisé avec succès (${superAdminEmail})`);
    }
    
    
}

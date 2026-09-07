import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { Permission, Role, RolePermission, User, UserRole, UserStatus } from "../entities";
import {
    AssignRolesInput,
    CreateUserInput,
    QueryUsersInput,
    UpdateUserInput,
    UpdateUserStatusInput,
} from "../validator";

import { MESSAGE_ERROR_AUTH } from "../../../helpers/messageError";
import bcrypt from "bcryptjs";
import crypto from "crypto";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly refreshTokenRepo: RefreshTokenRepository,
        private readonly dataSource: DataSource
    ) {}

    // creation d'un agent par l'admin (POST /users)
    async createUser(data: CreateUserInput, adminId?: string) {
        // verifie l'unicite email et matricule
        const check = await this.userRepo.existsByEmailOrMatricule(data.email, data.matricule);
        if (check.emailExists) {
            throw new HttpException({
                statusCode: HttpStatus.CONFLICT,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_EMAIL_EXISTS.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_EMAIL_EXISTS.MESSAGE,
            }, HttpStatus.CONFLICT);
        }
        if (check.matriculeExists) {
            throw new HttpException({
                statusCode: HttpStatus.CONFLICT,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_MATRICULE_EXISTS.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_MATRICULE_EXISTS.MESSAGE,
            }, HttpStatus.CONFLICT);
        }

        // mot de passe temporaire
        const tempPassword = data.tempPassword || `Hopital@${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
        const passwordHash = await bcrypt.hash(tempPassword, 10);

        // transaction de creation
        const createdUser = await this.dataSource.transaction(async (manager) => {
            const user = manager.create(User, {
                nom: data.nom,
                prenom: data.prenom,
                email: data.email,
                matricule: data.matricule,
                genre: data.genre,
                telephone: data.telephone,
                personnelType: data.personnelType,
                serviceAffectation: data.serviceAffectation,
                specialite: data.specialite,
                numeroOrdre: data.numeroOrdre,
                passwordHash,
                status: UserStatus.EN_ATTENTE_ACTIVATION,
                mustChangePassword: true,
                createdBy: adminId, // pour le subscriber afterInsert
            });

            const savedUser = await manager.save(user);

            // assignation des roles
            const userRoles = data.roleIds.map((roleId) =>
                manager.create(UserRole, {
                    userId: savedUser.id,
                    roleId,
                })
            );
            await manager.save(userRoles);

            return savedUser;
        });

        const userWithRoles = await this.userRepo.findByIdentifier(createdUser.id);

        return {
            message: "Agent créé avec succès.",
            user: userWithRoles,
            temporaryPassword: tempPassword,
        };
    }

    // liste paginee avec filtres (GET /users)
    async findAllUsers(query: QueryUsersInput) {
        return await this.userRepo.findAllWithFilters(query);
    }

    // detail d'un agent (GET /users/:id)
    async findUserById(userId: string) {
        const user = await this.userRepo.findByIdentifier(userId);

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    // modification d'un agent (PUT /users/:id)
    async updateUser(userId: string, data: UpdateUserInput, adminId?: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        // verifie unicite si email ou matricule change
        if (data.email || data.matricule) {
            const check = await this.userRepo.existsByEmailOrMatricule(
                data.email || user.email,
                data.matricule || user.matricule,
                userId
            );

            if (data.email && check.emailExists) {
                throw new HttpException({
                    statusCode: HttpStatus.CONFLICT,
                    code: MESSAGE_ERROR_AUTH.AUTH_USER_EMAIL_EXISTS.CODE,
                    message: MESSAGE_ERROR_AUTH.AUTH_USER_EMAIL_EXISTS.MESSAGE,
                }, HttpStatus.CONFLICT);
            }

            if (data.matricule && check.matriculeExists) {
                throw new HttpException({
                    statusCode: HttpStatus.CONFLICT,
                    code: MESSAGE_ERROR_AUTH.AUTH_USER_MATRICULE_EXISTS.CODE,
                    message: MESSAGE_ERROR_AUTH.AUTH_USER_MATRICULE_EXISTS.MESSAGE,
                }, HttpStatus.CONFLICT);
            }
        }

        // transaction de mise a jour
        await this.dataSource.transaction(async (manager) => {
            if (data.nom) user.nom = data.nom;
            if (data.prenom) user.prenom = data.prenom;
            if (data.email) user.email = data.email;
            if (data.matricule) user.matricule = data.matricule;
            if (data.genre !== undefined) user.genre = data.genre;
            if (data.telephone !== undefined) user.telephone = data.telephone;
            if (data.personnelType) user.personnelType = data.personnelType;
            if (data.serviceAffectation !== undefined) user.serviceAffectation = data.serviceAffectation;
            if (data.specialite !== undefined) user.specialite = data.specialite;
            if (data.numeroOrdre !== undefined) user.numeroOrdre = data.numeroOrdre;

            user.updatedBy = adminId; // pour le subscriber afterUpdate

            await manager.save(user);

            // mise a jour des roles si fournis
            if (data.roleIds) {
                await manager.delete(UserRole, { userId });
                const newRoles = data.roleIds.map((roleId) =>
                    manager.create(UserRole, { userId, roleId })
                );
                await manager.save(newRoles);
            }
        });

        return {
            message: "Agent modifié avec succès.",
            user: await this.userRepo.findByIdentifier(userId),
        };
    }

    // activation ou suspension de compte (PATCH /users/:id/status)
    async updateUserStatus(userId: string, data: UpdateUserStatusInput, adminId?: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        // protection auto-suspension
        if (adminId && adminId === userId && data.status !== UserStatus.ACTIF) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: "Vous ne pouvez pas suspendre votre propre compte administrateur.",
            }, HttpStatus.FORBIDDEN);
        }

        user.status = data.status;
        user.updatedBy = adminId; // pour le subscriber afterUpdate

        // deverrouillage automatique si reactivation
        if (data.status === UserStatus.ACTIF) {
            user.failedLoginAttempts = 0;
            user.failedPinAttempts = 0;
            user.lockedUntil = undefined as any;
            user.pinLockedUntil = undefined as any;
        }

        await this.userRepo.save(user);

        // revocation immediate de toutes les sessions actives si suspendu
        if (data.status === UserStatus.SUSPENDU || data.status === UserStatus.INACTIF) {
            await this.refreshTokenRepo.revokeAllUserTokens(userId);
        }

        return {
            message: `Le statut de l'agent a été mis à jour vers '${data.status}' avec succès.`,
            user: await this.userRepo.findByIdentifier(userId),
        };
    }

    // attribution de roles (POST /users/:id/roles)
    async assignRolesToUser(userId: string, data: AssignRolesInput, adminId?: string) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: { userRoles: true },
        });

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        const existingRoleIds = new Set((user.userRoles || []).map((ur) => ur.roleId));
        const newRoleIds = data.roleIds.filter((roleId) => !existingRoleIds.has(roleId));

        if (newRoleIds.length > 0) {
            await this.dataSource.transaction(async (manager) => {
                const userRoles = newRoleIds.map((roleId) =>
                    manager.create(UserRole, {
                        userId,
                        roleId,
                        assignedBy: adminId,
                        expiresAt: data.expiresAt,
                    })
                );
                await manager.save(userRoles);

                user.updatedBy = adminId;
                await manager.save(user);
            });
        }

        return {
            message: "Rôles attribués avec succès.",
            user: await this.userRepo.findByIdentifier(userId),
        };
    }

    // revocation d'un role (DELETE /users/:id/roles/:roleId)
    async removeRoleFromUser(userId: string, roleId: string, adminId?: string) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: { userRoles: true },
        });

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        // garde-fou : au moins un role obligatoire
        if ((user.userRoles || []).length <= 1) {
            throw new HttpException({
                statusCode: HttpStatus.BAD_REQUEST,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: "Un agent doit obligatoirement conserver au moins un rôle.",
            }, HttpStatus.BAD_REQUEST);
        }

        await this.dataSource.transaction(async (manager) => {
            await manager.delete(UserRole, { userId, roleId });

            user.updatedBy = adminId;
            await manager.save(user);
        });

        return {
            message: "Rôle retiré avec succès.",
            user: await this.userRepo.findByIdentifier(userId),
        };
    }

    // suppression douce (DELETE /users/:id)
    async deleteUser(userId: string, adminId?: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                code: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.CODE,
                message: MESSAGE_ERROR_AUTH.AUTH_USER_NOT_FOUND.MESSAGE,
            }, HttpStatus.NOT_FOUND);
        }

        // protection auto-suppression
        if (adminId && adminId === userId) {
            throw new HttpException({
                statusCode: HttpStatus.FORBIDDEN,
                code: MESSAGE_ERROR_AUTH.AUTH_FORBIDDEN.CODE,
                message: "Vous ne pouvez pas supprimer votre propre compte administrateur.",
            }, HttpStatus.FORBIDDEN);
        }

        user.deletedBy = adminId; // pour le subscriber afterSoftRemove
        user.status = UserStatus.INACTIF;

        await this.userRepo.save(user);
        await this.userRepo.softRemove(user);

        // revocation des sessions actives
        await this.refreshTokenRepo.revokeAllUserTokens(userId);

        return {
            message: "Compte agent désactivé et archivé avec succès.",
        };
    }

    // liste de tous les rôles disponibles avec leurs permissions et nombre d'agents
    async findAllRoles() {
        return await this.dataSource.getRepository(Role).find({
            relations: {
                rolePermissions: {
                    permission: true,
                },
                userRoles: true,
            },
            order: { isSystem: "DESC", libelle: "ASC" },
        });
    }

    // liste de toutes les permissions système
    async findAllPermissions() {
        return await this.dataSource.getRepository(Permission).find({
            order: { ressource: "ASC", code: "ASC" },
        });
    }

    // création d'un rôle personnalisé
    async createRole(
        data: { code: string; libelle: string; description?: string; permissionIds?: string[] },
        adminId?: string
    ) {
        const roleRepo = this.dataSource.getRepository(Role);
        const codeNormalized = data.code.trim().toUpperCase();

        const exists = await roleRepo.findOne({ where: { code: codeNormalized } });
        if (exists) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.CONFLICT,
                    message: `Le code de rôle '${codeNormalized}' existe déjà.`,
                },
                HttpStatus.CONFLICT
            );
        }

        return await this.dataSource.transaction(async (manager) => {
            const role = manager.create(Role, {
                code: codeNormalized,
                libelle: data.libelle.trim(),
                description: data.description?.trim(),
                isSystem: false,
                createdBy: adminId,
            });

            const savedRole = await manager.save(role);

            if (data.permissionIds && data.permissionIds.length > 0) {
                const rolePerms = data.permissionIds.map((permissionId) =>
                    manager.create(RolePermission, {
                        roleId: savedRole.id,
                        permissionId,
                        grantedBy: adminId,
                    })
                );
                await manager.save(rolePerms);
            }

            return await manager.getRepository(Role).findOne({
                where: { id: savedRole.id },
                relations: {
                    rolePermissions: {
                        permission: true,
                    },
                    userRoles: true,
                },
            });
        });
    }

    // mise à jour d'un rôle
    async updateRole(
        roleId: string,
        data: { libelle?: string; description?: string; permissionIds?: string[] },
        adminId?: string
    ) {
        const roleRepo = this.dataSource.getRepository(Role);
        const role = await roleRepo.findOne({
            where: { id: roleId },
            relations: { rolePermissions: true },
        });

        if (!role) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Rôle non trouvé.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        return await this.dataSource.transaction(async (manager) => {
            if (data.libelle) role.libelle = data.libelle.trim();
            if (data.description !== undefined) role.description = data.description.trim();
            role.updatedBy = adminId;

            await manager.save(role);

            // Mise à jour des permissions si fournies
            if (data.permissionIds !== undefined) {
                await manager.delete(RolePermission, { roleId });
                if (data.permissionIds.length > 0) {
                    const newPerms = data.permissionIds.map((permissionId) =>
                        manager.create(RolePermission, {
                            roleId,
                            permissionId,
                            grantedBy: adminId,
                        })
                    );
                    await manager.save(newPerms);
                }
            }

            return await manager.getRepository(Role).findOne({
                where: { id: roleId },
                relations: {
                    rolePermissions: {
                        permission: true,
                    },
                    userRoles: true,
                },
            });
        });
    }

    // suppression d'un rôle (impossible si isSystem)
    async deleteRole(roleId: string) {
        const roleRepo = this.dataSource.getRepository(Role);
        const role = await roleRepo.findOne({
            where: { id: roleId },
            relations: { userRoles: true },
        });

        if (!role) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Rôle non trouvé.",
                },
                HttpStatus.NOT_FOUND
            );
        }

        if (role.isSystem) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.FORBIDDEN,
                    message: "Impossible de supprimer un rôle système.",
                },
                HttpStatus.FORBIDDEN
            );
        }

        if (role.userRoles && role.userRoles.length > 0) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.CONFLICT,
                    message: `Ce rôle est actuellement attribué à ${role.userRoles.length} agent(s). Réassignez ces agents avant de supprimer le rôle.`,
                },
                HttpStatus.CONFLICT
            );
        }

        await this.dataSource.transaction(async (manager) => {
            await manager.delete(RolePermission, { roleId });
            await manager.delete(Role, { id: roleId });
        });

        return { message: "Rôle supprimé avec succès." };
    }
}

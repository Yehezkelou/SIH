import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MfaMethod, User, UserStatus } from "../entities";
import {
    ActivateAccountRepoInput,
    MfaSaveSecretRepoInput,
    RecordLoginFailureRepoInput,
    RecordLoginSuccessRepoInput,
    QueryUsersInput,
} from "../validator";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // recherche par ID, email ou matricule
    async findByIdentifier(identifier: string) {
        const query = this.createQueryBuilder("user")
            .addSelect(["user.passwordHash", "user.pinHash", "user.mfaSecret"])
            .leftJoinAndSelect("user.userRoles", "userRole")
            .leftJoinAndSelect("userRole.role", "role")
            .leftJoinAndSelect("role.rolePermissions", "rolePermission")
            .leftJoinAndSelect("rolePermission.permission", "permission");

        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

        if (isUuid) {
            query.where("user.id = :identifier", { identifier });
        } else {
            query.where("user.email = :identifier OR user.matricule = :identifier", { identifier });
        }

        return await query.getOne();
    }

    // verification d'unicite email ou matricule
    async existsByEmailOrMatricule(email: string, matricule: string, excludeId?: string): Promise<{ emailExists: boolean; matriculeExists: boolean }> {
        const query = this.createQueryBuilder("user")
            .where("user.email = :email OR user.matricule = :matricule", { email, matricule });

        if (excludeId) {
            query.andWhere("user.id != :excludeId", { excludeId });
        }

        const found = await query.getMany();
        return {
            emailExists: found.some((u) => u.email.toLowerCase() === email.toLowerCase()),
            matriculeExists: found.some((u) => u.matricule.toUpperCase() === matricule.toUpperCase()),
        };
    }

    // recherche paginee avec filtres dynamiques et statut isConnected
    async findAllWithFilters(query: QueryUsersInput) {
        const {
            page = 1,
            limit = 10,
            search,
            personnelType,
            status,
            serviceAffectation,
            roleId,
            isConnected,
            sortBy = "createdAt",
            sortOrder = "DESC",
        } = query;

        const qb = this.createQueryBuilder("user")
            .leftJoinAndSelect("user.userRoles", "userRole")
            .leftJoinAndSelect("userRole.role", "role")
            .leftJoinAndSelect(
                "user.refreshTokens",
                "token",
                "token.revokedAt IS NULL AND token.expiresAt > :now",
                { now: new Date() }
            );

        // 1. Recherche plein texte insensible à la casse
        if (search && search.trim()) {
            const term = `%${search.trim()}%`;
            qb.andWhere(
                "(LOWER(user.nom) LIKE LOWER(:term) OR LOWER(user.prenom) LIKE LOWER(:term) OR LOWER(user.email) LIKE LOWER(:term) OR UPPER(user.matricule) LIKE UPPER(:term))",
                { term }
            );
        }

        // 2. Filtres métier
        if (personnelType) {
            qb.andWhere("user.personnelType = :personnelType", { personnelType });
        }

        if (status) {
            qb.andWhere("user.status = :status", { status });
        }

        if (serviceAffectation) {
            qb.andWhere("user.serviceAffectation = :serviceAffectation", { serviceAffectation });
        }

        if (roleId) {
            qb.andWhere("userRole.roleId = :roleId", { roleId });
        }

        // 3. Filtre sur l'état de connexion actuel
        if (isConnected === true) {
            qb.andWhere("token.id IS NOT NULL");
        } else if (isConnected === false) {
            qb.andWhere("token.id IS NULL");
        }

        // 4. Tri et Pagination
        qb.orderBy(`user.${sortBy}`, sortOrder)
            .skip((page - 1) * limit)
            .take(limit);

        const [users, total] = await qb.getManyAndCount();

        // 5. Formatage de la réponse avec l'indicateur isConnected
        const formattedData = users.map((u) => {
            const hasActiveTokens = (u.refreshTokens && u.refreshTokens.length > 0) || false;
            const { refreshTokens, ...userWithoutTokens } = u;

            return {
                ...userWithoutTokens,
                isConnected: hasActiveTokens,
                activeSessionsCount: u.refreshTokens?.length || 0,
            };
        });

        return {
            data: formattedData,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1,
            },
        };
    }

    // activation de compte a la 1er connexion 
    async activateAccount(data: ActivateAccountRepoInput) {
        await this.update(
            { id: data.userId },
            {
                passwordHash: data.newPasswordHash,
                pinHash: data.newPinHash,
                pinEnabled: true,
                mustChangePassword: false,
                status: UserStatus.ACTIF,
                failedLoginAttempts: 0,
                failedPinAttempts: 0,
                passwordChangedAt: new Date(),
            }
        );

        return await this.findOne({
            where: {
                id: data.userId,
            },
        });
    }

    // gestion des echecs de connexions
    async recordLoginFailure(
        data: RecordLoginFailureRepoInput
    ): Promise<{ loked: boolean; lockedUntil?: Date }> {
        const MAX_ATTEMPS = 5;
        const LOCK_MINUTES = 15;

        if (data.isPin) {
            const attemps = data.user.failedPinAttempts + 1;
            let lockedUntil: Date | undefined = undefined;

            if (attemps >= MAX_ATTEMPS) {
                lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
            }

            await this.update(
                { id: data.user.id },
                {
                    failedPinAttempts: attemps,
                    pinLockedUntil: lockedUntil ?? data.user.lockedUntil,
                }
            );

            return { loked: attemps >= MAX_ATTEMPS, lockedUntil };
        } else {
            const attemps = data.user.failedLoginAttempts + 1;
            let lockedUntil: Date | undefined = undefined;

            if (attemps >= MAX_ATTEMPS) {
                lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
            }

            await this.update(
                { id: data.user.id },
                {
                    failedLoginAttempts: attemps,
                    lockedUntil: lockedUntil ?? data.user.lockedUntil,
                }
            );

            return { loked: attemps >= MAX_ATTEMPS, lockedUntil };
        }
    }

    // succe de connexion
    async recordLoginSuccess(data: RecordLoginSuccessRepoInput): Promise<void> {
        await this.update(
            { id: data.userId },
            {
                failedLoginAttempts: 0,
                failedPinAttempts: 0,
                lockedUntil: undefined,
                pinLockedUntil: undefined,
                lastLoginAt: new Date(),
                lastLoginIp: data.ipAddress,
            }
        );
    }

    // sauvegarde du secret TOPT
    async saveMfaSecret(data: MfaSaveSecretRepoInput) {
        await this.update(
            { id: data.userId },
            {
                mfaSecret: data.mfaSecret,
                mfaMethod: data.mfaMethod ?? MfaMethod.TOTP,
                mfaEnabled: false,
            }
        );
    }

    // activer le mfa
    async enableMfa(userId: string) {
        await this.update(
            { id: userId },
            {
                mfaEnabled: true,
            }
        );
    }

    // desactiver le mfa sur le compte 
    async disableMfa(userId: string) {
        await this.update(
            { id: userId },
            {
                mfaEnabled: false,
                mfaMethod: MfaMethod.NONE,
                mfaSecret: undefined,
            }
        );
    }
}
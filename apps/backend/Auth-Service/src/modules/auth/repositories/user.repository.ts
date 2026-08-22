import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User, UserStatus } from "../entities";
import { ActivateAccountRepoInput, RecordLoginFailureRepoInput, RecordLoginSuccessRepoInput } from "../validator";
import { userInfo } from "os";




@Injectable()
export class UserRepository extends Repository<User> {

    constructor(
        private readonly dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager());
    }


    // recherche par ID, email ou matricule
    async findByIdentifier(identifier: string) {
        return await this.createQueryBuilder("user")
            .addSelect(["user.passwordHash", "user.pinHash", "user.mfaSecret"])
            .leftJoinAndSelect("user.userRoles", "role")
            .leftJoinAndSelect("role.rolePermissions", "rolePermission")
            .leftJoinAndSelect("rolePermission.permission", "permission")
            .where("user.id = :identifier OR user.email = :identifier OR user.matricule = :identifier", { identifier })
            .getOne();
    }

    // activation de compte a la 1er connexion 
    async activateAccount(data : ActivateAccountRepoInput){

        await this.update(
            {id : data.userId},
            {
                passwordHash : data.newPasswordHash,
                pinHash : data.newPinHash,
                pinEnabled : true,
                mustChangePassword : false,
                status : UserStatus.ACTIF,
                failedLoginAttempts : 0,
                failedPinAttempts : 0,
                passwordChangedAt : new Date(),
            }
        )

        return await this.findOne({
            where : {
                id : data.userId
            }
        })
    }


    // gestion des echecs de connexions
    async recordLoginFailure(
        data : RecordLoginFailureRepoInput): 
        Promise<{loked : boolean, lockedUntil?: Date}>{

            const MAX_ATTEMPS =5;
            const LOCK_MINUTES =15;

            if(data.isPin){
                const attemps = data.user.failedPinAttempts + 1;
                let lockedUntil : Date | undefined = undefined;

                if(attemps >= MAX_ATTEMPS){
                    lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
                }

                await this.update(
                    {id : data.user.id},
                    {
                        failedPinAttempts : attemps,
                        pinLockedUntil : lockedUntil ?? data.user.lockedUntil,  
                    }
                );

                return {loked : attemps >= MAX_ATTEMPS, lockedUntil};
            }else {
                const attemps = data.user.failedLoginAttempts + 1;
                let lockedUntil : Date | undefined = undefined;

                if(attemps >= MAX_ATTEMPS){
                    lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
                }

                await this.update(
                    {id : data.user.id},
                    {
                        failedLoginAttempts : attemps,
                        lockedUntil : lockedUntil ?? data.user.lockedUntil
                    }
                );

                return {loked : attemps >= MAX_ATTEMPS, lockedUntil}
            }
    }

    // succe de connexion
    async recordLoginSuccess(
        data: RecordLoginSuccessRepoInput
    ): Promise<void>{
        await this.update(
            {id : data.userId},
            {
                failedLoginAttempts : 0,
                failedPinAttempts : 0,
                lockedUntil : undefined,
                pinLockedUntil : undefined,
                lastLoginAt : new Date(),
                lastLoginIp : data.ipAddress,
            }
        )
    }
}
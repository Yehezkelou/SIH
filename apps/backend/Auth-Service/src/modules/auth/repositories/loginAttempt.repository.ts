import { Injectable } from "@nestjs/common";
import { LoginAttempt, LoginAttemptStatus } from "../entities";
import { DataSource, Repository } from "typeorm";
import { RecordLoginAttemptRepoInput } from "../validator";

@Injectable()
export class LoginAttemptRepository extends Repository<LoginAttempt> {
    constructor(dataSource: DataSource) {
        super(LoginAttempt, dataSource.createEntityManager());
    }

    async recordAttempt(data: RecordLoginAttemptRepoInput) {
        let status = LoginAttemptStatus.FAILED_BAD_PASSWORD;
        if (data.success) {
            status = LoginAttemptStatus.SUCCESS;
        } else {
            switch (data.failureReason) {
                case "UTILISATEUR_INEXISTANT":
                    status = LoginAttemptStatus.FAILED_USER_NOT_FOUND;
                    break;
                case "COMPTE_VERROUILLE":
                    status = LoginAttemptStatus.FAILED_ACCOUNT_LOCKED;
                    break;
                case "COMPTE_DESACTIVE":
                    status = LoginAttemptStatus.FAILED_ACCOUNT_INACTIVE;
                    break;
                case "FAILED_MFA":
                    status = LoginAttemptStatus.FAILED_MFA;
                    break;
                default:
                    status = LoginAttemptStatus.FAILED_BAD_PASSWORD;
            }
        }

        const attempt = this.create({
            userId: data.userId,
            identifiant: data.identifierUsed,
            status,
            success: data.success,
            detail: data.failureReason,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
        });

        return await this.save(attempt);
    }
}
import { Injectable } from "@nestjs/common";
import { LoginAttempt } from "../entities";
import { DataSource, Repository } from "typeorm";
import { RecordLoginAttemptRepoInput } from "../validator";







@Injectable()
export class  LoginAttemptRepository extends Repository<LoginAttempt>{
    
    constructor(
        private readonly dataSouce  : DataSource
    ){
        super(LoginAttempt, dataSouce.createEntityManager())
    }


    async recordAttempt(data : RecordLoginAttemptRepoInput){

        const attemps = this.create({
            userId : data.userId,
            identifiant : data.identifierUsed,
            success : data.success,
            detail : data.failureReason,
            ipAddress : data.ipAddress,
            userAgent : data.userAgent
        })

        return await this.save(attemps)
    }
}
    
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PasswordReset } from "../entities";
import { SaveResetTokenInput } from "../validator";






@Injectable()
export class PasswordResetRepository extends Repository<PasswordReset>{

    constructor(
        private readonly dataSource : DataSource
    ){
        super(PasswordReset, dataSource.createEntityManager())

    }


    // sauvegarde d'un jeton 
    async createResetToken(data :SaveResetTokenInput){
        const reset = this.create({
            userId : data.userId,
            tokenHash : data.tokenHash,
            expiresAt : data.expiresAt
        })

        return await this.save(reset);
    }

    // recherche d'un jeton par son hash 
    async findByTokenHash(tokenHash : string){
        return await this.findOne({
            where : {tokenHash : tokenHash}
        })
    }

    // marquer le jeton comme consommé 
    async markAsUsed(tokenId : string){
        await this.update(
            {id : tokenId},
            {usedAt : new Date()}
        )
    }

}
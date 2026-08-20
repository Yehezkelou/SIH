import { DataSource, EntityManager, Repository } from "typeorm";
import { EncounterMovement } from "../entities";
import { Injectable } from "@nestjs/common";






@Injectable()
export class EncounterMovementRepository  extends Repository<EncounterMovement> {

    constructor(
        
        private dataSource : DataSource,
    ){
        super(EncounterMovement, dataSource.createEntityManager());
    }

    
    // create movement
    async createMovement(data :Partial<EncounterMovement>, manager : EntityManager){

        const repoManager = manager ? manager.getRepository(EncounterMovement) : this;

        const movement = repoManager.create(data);

        return await repoManager.save(movement);
    }

    async findMovementsByEncounter(encouterId : string, numeroEncounter : string){

        return await this.find({
            where : {
                encounterId : encouterId,
                encounterNumber : numeroEncounter,
            },
            order : {
                movementDate : "DESC"
            }
        })
    }
}
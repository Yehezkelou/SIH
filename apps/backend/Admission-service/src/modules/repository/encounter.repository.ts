import { Injectable } from "@nestjs/common";
import { Encounter } from "../entities";
import { DataSource, EntityManager, Repository } from "typeorm";




@Injectable()
export class EncounterRepository extends Repository<Encounter>{

    constructor(
        private readonly dataSouce : DataSource,
    ){
        super(Encounter, dataSouce.createEntityManager());
    }


    //recuperer le sejout
    async findEncounterById(
        encounterId : string,
        numeroEncounter : string,
        admissionId : string,
        numeroAdmission: string,
        patientId : string,
        numeroPatient : string,
        manager : EntityManager
    ){
        const repo = manager ? manager.getRepository(Encounter) : this;

        return await repo.findOne({
            where : {
                id : encounterId,
                encounterNumber : numeroEncounter,
                patientId : patientId,
                numeroPatient: numeroPatient,
                admissionId : admissionId,
                admission : {
                    id : admissionId, 
                    numeroPatient : numeroPatient,
                    admissionNumber : numeroAdmission,
                    patientId : patientId
                }
            }
        })
        
    }


    // mettre a jour la position du patient 
    async updatePosition(
        encounterId : string,
        numeroEncounter : string,
        admissionId : string,
        patientId : string,
        updateBy : string,
        position : {
            currentDepartementId?: string
            currentBedId?: string
            currentRomId?: string
        },
        manager : EntityManager
     ){

        const repo = manager ? manager.getRepository(Encounter) : this;

        await repo.update({
            id : encounterId, 
            encounterNumber : numeroEncounter,
            admissionId : admissionId,
            patientId : patientId
        }, {
            currentDepartmentId : position.currentDepartementId,
            currentBedId : position.currentBedId,
            currentRoomId : position.currentRomId,
            updatedBy : updateBy
        })
    }
    
}
import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
import { Patient } from "./patient.entity";
import { PinoLogger } from "nestjs-pino";
import { Injectable } from "@nestjs/common";
import { PatientHistory } from "./patient.history.entity";
import { toEntitySnapshot } from "../../../helpers/entitySnapshot";




@Injectable()
@EventSubscriber()
export class PatientSubscriber implements EntitySubscriberInterface<Patient>{

    constructor(
        private readonly logger : PinoLogger,
        private readonly dataSource: DataSource
    ){

        this.dataSource.subscribers.push(this)
    }


    listenTo(){
        return Patient
    }

    // factorise l'ecriture dans la table history (CREATE / UPDATE / DELETE)
    private async saveHistory(
        manager: EntityManager,
        patientId: string,
        action: "CREATE" | "UPDATE" | "DELETE",
        oldData: Record<string, any> | undefined,
        newData: Record<string, any> | undefined,
        changeBy?: string
    ){
        const history = new PatientHistory()

        history.patientId = patientId
        history.action = action
        history.changeBy = changeBy as string
        history.oldData = oldData as Record<string, any>
        history.newData = newData as Record<string, any>

        this.logger.info("Insertion dans la table history", {
            msg : "Insertion dans la table history",
            data : history
        })

        await manager.save(PatientHistory, history)
    }

    async afterInsert(event: InsertEvent<Patient>){
        await this.saveHistory(
            event.manager,
            event.entity.uniquePatientId,
            "CREATE",
            undefined,
            toEntitySnapshot(event.entity, event.metadata),
            event.entity.createdBy
        )
    }

    async afterUpdate(event: UpdateEvent<Patient>){

        // event.databaseEntity pour les ancienne donnée
        // event.entity pour les nouvelle donnée
        const newEntity = event.entity as Patient | undefined

        await this.saveHistory(
            event.manager,
            event.databaseEntity.uniquePatientId,
            "UPDATE",
            toEntitySnapshot(event.databaseEntity, event.metadata),
            toEntitySnapshot(newEntity, event.metadata),
            newEntity?.updatedBy ?? event.databaseEntity?.updatedBy
        )
    }

    // patient.entity.ts fait de la suppression douce (DeleteDateColumn) donc
    // c'est softRemove/afterSoftRemove qu'il faut ecouter, pas afterRemove
    async afterSoftRemove(event: SoftRemoveEvent<Patient>){
        await this.saveHistory(
            event.manager,
            event.databaseEntity.uniquePatientId,
            "DELETE",
            toEntitySnapshot(event.databaseEntity, event.metadata),
            undefined,
            event.databaseEntity?.deletedBy
        )
    }
}

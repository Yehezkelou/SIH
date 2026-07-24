import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
import { ArchivDossier } from "./archivDossier.entity";
import { PinoLogger } from "nestjs-pino";
import { Injectable } from "@nestjs/common";
import { ArchivDossierHistory } from "./archivDossier.history.entity";
import { toEntitySnapshot } from "../../../helpers/entitySnapshot";




@Injectable()
@EventSubscriber()
export class ArchivDossierSubscriber implements EntitySubscriberInterface<ArchivDossier>{

    constructor(
        private readonly logger : PinoLogger,
        private readonly dataSource: DataSource
    ){

        this.dataSource.subscribers.push(this)
    }


    listenTo(){
        return ArchivDossier
    }

    // factorise l'ecriture dans la table history (CREATE / UPDATE / DELETE)
    private async saveHistory(
        manager: EntityManager,
        archivDossierId: string,
        action: "CREATE" | "UPDATE" | "DELETE",
        oldData: Record<string, any> | undefined,
        newData: Record<string, any> | undefined,
        changeBy : string | undefined
    ){
        const history = new ArchivDossierHistory()

        history.archivDossierId = archivDossierId
        history.action = action
        history.oldData = oldData as Record<string, any>
        history.newData = newData as Record<string, any>
        history.changeBy = changeBy

        this.logger.info("Insertion dans la table history", {
            msg : "Insertion dans la table history",
            data : history
        })

        await manager.save(ArchivDossierHistory, history)
    }

    async afterInsert(event: InsertEvent<ArchivDossier>){
        await this.saveHistory(
            event.manager,
            event.entity.id,
            "CREATE",
            undefined,
            toEntitySnapshot(event.entity, event.metadata),
            event.entity.createdBy
        )
    }

    async afterUpdate(event: UpdateEvent<ArchivDossier>){

        // event.databaseEntity pour les ancienne donnée
        // event.entity pour les nouvelle donnée

        const  newEntity = event.entity as ArchivDossier 

        await this.saveHistory(
            event.manager,
            event.databaseEntity.id,
            "UPDATE",
            toEntitySnapshot(event.databaseEntity, event.metadata),
            toEntitySnapshot(event.entity as ArchivDossier | undefined, event.metadata),
            newEntity.updatedBy ?? event.databaseEntity.updatedBy 
        )
    }

    // archivDossier.entity.ts n'a pas de suppression douce (pas de DeleteDateColumn)
    // donc c'est le remove/afterRemove classique qu'il faut ecouter
    async afterSoftRemove(event: SoftRemoveEvent<ArchivDossier>){
        await this.saveHistory(
            event.manager,
            event.databaseEntity.id, 
            "DELETE",
            toEntitySnapshot(event.databaseEntity, event.metadata),
            undefined,
            event.databaseEntity?.deletedBy
        )
    }
}

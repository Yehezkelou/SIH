import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { ArchivDossier } from "./archivDossier.entity";
import { PinoLogger } from "nestjs-pino";
import { Injectable } from "@nestjs/common";
import { ArchivDossierHistory } from "./archivDossier.history.entity";




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


    async afterUpdate(event: UpdateEvent<ArchivDossier>){

        // event.databaseEntity pour les ancienne donnée
        // event.entity pour les nouvelle donnée
        const data = {
            archivDossierId : event.databaseEntity.id,

            oldData : JSON.stringify(event.databaseEntity),
            newData : JSON.stringify(event.entity),

            action : "UPDATE",
        }
        // insertion dans la table history
        const history = new ArchivDossierHistory()

        history.archivDossierId = data.archivDossierId
        history.action = data.action as "UPDATE"
        history.oldData = JSON.parse(data.oldData)
        history.newData = JSON.parse(data.newData)

        // sauvegarde des donnée
        this.logger.info("Insertion dans la table history", {
            msg : "Insertion dans la table history",
            data : history
        })

        await event.manager.save(ArchivDossierHistory, history)
        this.logger.info("Ok")

    }
}

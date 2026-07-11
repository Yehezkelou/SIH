import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Patient } from "./patient.entity";
import { PinoLogger } from "nestjs-pino";
import { Injectable } from "@nestjs/common";
import { PatientHistory } from "./patient.history.entity";




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


    async afterUpdate(event: UpdateEvent<Patient>){
        
        // event.databaseEntity pour les ancienne donnée 
        // event.entity pour les nouvelle donnée
        const data = {
            patientId : event.databaseEntity.uniquePatientId,

            oldData : JSON.stringify(event.databaseEntity),
            newData : JSON.stringify(event.entity),

            action : "UPDATE",
            changeBy : event.databaseEntity?.createdBy,
        }
        // insertion dans la table history
        const history = new PatientHistory()

        history.patientId = data.patientId
        history.action = data.action as "UPDATE" 
        history.changeBy = data.changeBy 
        history.oldData = JSON.parse(data.oldData)
        history.newData = JSON.parse(data.newData)

        // sauvegarde des donnée 
        this.logger.info("Insertion dans la table history", {
            msg : "Insertion dans la table history",
            data : history
        })

        await event.manager.save(PatientHistory, history) 
        this.logger.info("Ok") 

    }
}
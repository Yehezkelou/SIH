import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { Admission } from "./admission.entity";
import { PinoLogger } from "nestjs-pino";
import { AdmissionHistory } from "./admission.history";
import { toEntitySnapshot } from "../../helpers/toEntitySnapshot";




@Injectable()
@EventSubscriber()
export class AdmissionSubscriber implements EntitySubscriberInterface<Admission>{

    constructor(
        private readonly logger: PinoLogger,
        private readonly dataSource: DataSource
    ) {
        this.dataSource.subscribers.push(this)
    }

    listenTo() {
        return Admission;
    }


    private async saveHistory(
        manage: EntityManager,
        identifiantAndNumero: { AdmissionId: string, numeroAdmission: string, patientId: string, numeroPatient: string},
        action: "CREATE" | "UPDATE" | "DELETE",
        oldData: Record<string, any> | undefined,
        newData: Record<string, any> | undefined,
        changedBy : string
    ){

        const history = new AdmissionHistory();

        history.admissionId = identifiantAndNumero.AdmissionId
        history.patientId = identifiantAndNumero.patientId
        history.admissionNumber = identifiantAndNumero.numeroAdmission
        history.numeroPatient = identifiantAndNumero.numeroPatient
        history.oldData = oldData as Record<string, any>
        history.newData = newData as Record<string, any>
        history.action = action
        history.changedBy = changedBy

        this.logger.info("save history", {
            msg: "save history",
            data : history,
            context: "AdmissionSubscriber.saveHistory"
        })
        await manage.save(AdmissionHistory, history)
    }

    // after insert 
    async afterInsert(event: InsertEvent<Admission>){
        
        await this.saveHistory(
            event.manager,
            {
                AdmissionId : event.entity.id,
                numeroAdmission : event.entity.admissionNumber,
                patientId : event.entity.patientId,
                numeroPatient : event.entity.numeroPatient
            },
            "CREATE",
            undefined,
            toEntitySnapshot(event.entity, event.metadata),
            event.entity.createdBy!
        )
    }


    // after update 
    async afterUpdate(event: UpdateEvent<Admission>){
        const newEntity = event.entity as Admission | undefined

        await this.saveHistory(
            event.manager,
            {
                AdmissionId : newEntity?.id as string,
                numeroAdmission : newEntity?.admissionNumber as string,
                patientId : newEntity?.patientId as string,
                numeroPatient : newEntity?.numeroPatient as string
                
            },
            "UPDATE",
            toEntitySnapshot(event.databaseEntity, event.metadata),
            toEntitySnapshot(newEntity, event.metadata),
            newEntity?.updatedBy as string
        )
    }

    // after remove 
    async afterSoftRemove(event: RemoveEvent<Admission>){
        const entity = event.entity as Admission
        await this.saveHistory(
            event.manager,
            {
                AdmissionId : entity.id as string,
                numeroAdmission : entity.admissionNumber as string,
                patientId : entity.patientId as string,
                numeroPatient : entity.numeroPatient as string
            },
            "DELETE",
            toEntitySnapshot(entity, event.metadata),
            undefined,
            entity.deletedBy as string
        )
    }
}

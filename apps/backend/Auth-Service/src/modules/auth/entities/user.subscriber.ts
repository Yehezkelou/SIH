import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, SoftRemoveEvent, UpdateEvent } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { User } from "./user.entity";
import { UserHistory } from "./user.history.entity";
import { HistoryAction } from "./auth.enum";
import { toEntitySnapshot } from "../../../helpers/entitySnapshot";

/**
 * Subscriber d'historisation du compte utilisateur.
 *
 * Écoute les évènements TypeORM sur User et écrit une ligne dans user_history
 * pour chaque CREATE / UPDATE / DELETE (soft delete). Aligné sur le pattern
 * de PatientSubscriber. Les secrets sont retirés par toEntitySnapshot.
 */
@Injectable()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    constructor(
        private readonly logger: PinoLogger,
        private readonly dataSource: DataSource
    ) {
        this.dataSource.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    // factorise l'écriture dans la table user_history
    private async saveHistory(
        manager: EntityManager,
        userId: string,
        action: HistoryAction,
        oldData: Record<string, any> | undefined,
        newData: Record<string, any> | undefined,
        changeBy?: string
    ) {
        const history = new UserHistory();

        history.userId = userId;
        history.action = action;
        history.changeBy = changeBy as string;
        history.oldData = oldData as Record<string, any>;
        history.newData = newData as Record<string, any>;

        this.logger.info("Insertion dans la table user_history", {
            msg: "Insertion dans la table user_history",
            data: history
        });

        await manager.save(UserHistory, history);
    }

    async afterInsert(event: InsertEvent<User>) {
        await this.saveHistory(
            event.manager,
            event.entity.id,
            HistoryAction.CREATE,
            undefined,
            toEntitySnapshot(event.entity, event.metadata),
            event.entity.createdBy
        );
    }

    async afterUpdate(event: UpdateEvent<User>) {
        const newEntity = event.entity as User | undefined;

        await this.saveHistory(
            event.manager,
            event.databaseEntity.id,
            HistoryAction.UPDATE,
            toEntitySnapshot(event.databaseEntity, event.metadata),
            toEntitySnapshot(newEntity, event.metadata),
            newEntity?.updatedBy ?? event.databaseEntity?.updatedBy
        );
    }

    // Suppression douce (DeleteDateColumn) => on écoute afterSoftRemove
    async afterSoftRemove(event: SoftRemoveEvent<User>) {
        await this.saveHistory(
            event.manager,
            event.databaseEntity.id,
            HistoryAction.DELETE,
            toEntitySnapshot(event.databaseEntity, event.metadata),
            undefined,
            event.databaseEntity?.deletedBy
        );
    }
}

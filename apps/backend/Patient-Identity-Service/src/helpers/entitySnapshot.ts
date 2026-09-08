import { EntityMetadata } from "typeorm";

/**
 * Prend un instantané des colonnes propres d'une entité (pas ses relations).
 *
 * Utilisé par les subscribers pour peupler oldData/newData dans les tables
 * d'historique. On ne parcourt que metadata.columns (jamais les relations)
 * pour éviter de sérialiser des objets liés potentiellement volumineux ou
 * cycliques (ex: Patient <-> ArchivDossier), contrairement à un simple
 * JSON.stringify(entity) sur l'entité entière.
 */
export function toEntitySnapshot<T extends object>(
    entity: T | undefined,
    metadata: EntityMetadata
): Record<string, any> | undefined {
    if (!entity) return undefined;

    return metadata.columns.reduce((snapshot, column) => {
        snapshot[column.propertyName] = (entity as Record<string, any>)[column.propertyName];
        return snapshot;
    }, {} as Record<string, any>);
}

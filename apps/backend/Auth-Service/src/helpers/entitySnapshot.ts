import { EntityMetadata } from "typeorm";

/**
 * Prend un instantané des colonnes propres d'une entité (pas ses relations).
 *
 * Utilisé par les subscribers pour peupler oldData/newData dans les tables
 * d'historique. On ne parcourt que metadata.columns (jamais les relations)
 * pour éviter de sérialiser des objets liés potentiellement volumineux ou
 * cycliques (ex: User <-> UserRole), contrairement à un simple
 * JSON.stringify(entity) sur l'entité entière.
 *
 * ATTENTION : la colonne `passwordHash` du User est retirée du snapshot pour
 * ne jamais recopier un secret dans la table d'historique.
 */
const SENSITIVE_COLUMNS = new Set(["passwordHash", "mfaSecret", "pinHash", "tokenHash"]);

export function toEntitySnapshot<T extends object>(
    entity: T | undefined,
    metadata: EntityMetadata
): Record<string, any> | undefined {
    if (!entity) return undefined;

    return metadata.columns.reduce((snapshot, column) => {
        if (SENSITIVE_COLUMNS.has(column.propertyName)) return snapshot;
        snapshot[column.propertyName] = (entity as Record<string, any>)[column.propertyName];
        return snapshot;
    }, {} as Record<string, any>);
}

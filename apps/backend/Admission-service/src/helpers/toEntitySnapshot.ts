import { EntityMetadata } from "typeorm";
import { string } from "zod";



// instantané des colonnes propres d'une entité 
export function toEntitySnapshot<T extends object>(
    entity : T |undefined,
    metadata : EntityMetadata,
): Record<string, any> | undefined{

    if(!entity) return undefined

    return metadata.columns.reduce((snapshot, column) => {

        snapshot[column.propertyName] = (entity as Record<string, any>)[column.propertyName];

        return snapshot
    }, {} as Record<string, any>)
}
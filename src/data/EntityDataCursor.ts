import {Connection, ObjectType} from "typeorm";
import {entries} from "../common/object/entries";
import {mapObjectToArray} from "../common/object/mapObjectToArray";
import {EntityRelation} from "../typeorm/relations";
import {DataCursor, DataCursorOwner} from "./DataCursor";

export type EntityDataCursor = {
    owners: (DataCursorOwner& {
        relation: EntityRelation
        childRelations: EntityRelation[]
    })[],
    entityType: ObjectType<any>,
    childRelations: EntityRelation[],
    cursor: DataCursor
};

export function EntityDataCursor(
    connection: Connection,
    cursor: DataCursor,
    entityType: ObjectType<any>): EntityDataCursor {


    const childRelations: EntityRelation[] = [];
    const owners: EntityDataCursor['owners'] = [];


    for (let owner of cursor.owners) {
        const ownerRelation = new EntityRelation(connection, entityType,
            owner.propertyName, true, owner.key);

        owners.push({
            ...owner,
            relation: ownerRelation,
            childRelations: mapObjectToArray(owner.childKeys, (key, propertyName: string) => {
                return new EntityRelation(connection, entityType, propertyName,
                    false, key)
            })
        })


        entityType = ownerRelation.left.entityType;

    }


    for (let [propertyName, key] of entries(cursor.childKeys)) {
        const relation = new EntityRelation(connection, entityType,
            propertyName, false, key);
        childRelations.push(relation);

    }

    return {
        owners,
        entityType,
        childRelations,
        cursor
    };

}

import {Connection, getConnection as getGlobalConnection} from "typeorm";
import {last} from "../../common/array/last";
import {EntityRelation} from "../../typeorm/relations";
import {EntityDataCursor} from "./EntityDataCursor";

import {EntityDataSource} from "./EntityDataSource";
import {getEntityDataInfo} from "./getEntityDataInfo";

export function getEntityDataSourceInfo(source: EntityDataSource<any>) {

    const connection = getConnection();
    const cursor = EntityDataCursor.create(
        connection,
        source.cursor,
        source.mainEntityType);
    const repository = connection.getRepository(cursor.typeInfo.type);

    const inverseLeftRelationsWithoutJoinTable: EntityRelation[] = [];
    const leftRelationsWithoutJoinTable: EntityRelation[] = [];


    {
        const ownerRelation = last(cursor.location)?.relation;
        ownerRelation && addRelation(ownerRelation);
        cursor.relationKeys.forEach(addRelation);

        function addRelation(relation: EntityRelation) {
            if (relation.isLeftOwningWithoutJoinTable()) {
                leftRelationsWithoutJoinTable.push(relation)
            } else {
                inverseLeftRelationsWithoutJoinTable.push(relation)
            }
        }
    }


    return {
        repository,
        cursor,
        leftRelationsWithoutJoinTable,
        inverseLeftRelationsWithoutJoinTable,

        entityInfo: getEntityDataInfo(
            connection.getMetadata(cursor.typeInfo.type)
        )
    }

    function getConnection(): Connection {
        switch (typeof source.options.connection) {
            case "object":
                return source.options.connection;
            case "string":
                return getGlobalConnection(source.options.connection);
            case "function":
                return source.options.connection();
            case "undefined":
                return getGlobalConnection()
            default:
                throw new Error()
        }
    }
}

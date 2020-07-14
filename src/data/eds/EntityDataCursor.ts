import {Connection, ObjectType, Repository, SelectQueryBuilder} from "typeorm";
import {reversed} from "../../common/array/reversed";
import {entries} from "../../common/object/entries";
import {DataExp} from "../../json-exp/DataExp";
import {EntityRelation} from "../../typeorm/relations";
import {DataCursor} from "../DataCursor";
import {getEntityDataInfo} from "./getEntityDataInfo";

/*
    EntityType
        - of
        - of
        - of ...
    - at ...

        EntityType

 */
export type EntityDataCursor = {

    // root
    owners: ({
        relation: EntityRelation

        filter: DataExp<any>,

        // childRelations
        relations: EntityRelation[],

        // childConstants
        constants: Record<string, any>
    })[],
    entityType: ObjectType<any>,

    relations: EntityRelation[],
    constants: Record<string, any>;
    filter: DataExp<any>
};


export namespace EntityDataCursor {

    export function create(
        connection: Connection,
        cursor: DataCursor,
        entityType: ObjectType<any>
    ): EntityDataCursor {


        const owners: EntityDataCursor['owners'] = [];

        for (let cursorOwner of cursor.owners) {
            const ownerRelation = new EntityRelation(
                connection,
                entityType,
                cursorOwner.propertyName, true, cursorOwner.key);
            owners.push({
                filter: cursorOwner.filter,
                relation: ownerRelation,
                ...loadChildKeys(entityType, cursorOwner.constants),
            })
            entityType = ownerRelation.left.entityType;
        }

        return {
            owners,
            entityType,
            filter: cursor.filter,
            ...loadChildKeys(entityType, cursor.constants)
        };

        function loadChildKeys(entityType, childKeys: Record<string, any>) {
            const constants: EntityDataCursor['constants'] = {};
            const relations: EntityDataCursor['relations'] = [];
            const metadata = getEntityDataInfo(
                connection.getMetadata(entityType)
            );
            for (let [propertyName, value] of entries(childKeys)) {

                if (metadata.propertyNamesWithRelation.has(propertyName)) {
                    const relation = new EntityRelation(connection, entityType,
                        propertyName, false, value);
                    relations.push(relation);
                } else {
                    constants[propertyName] = value
                }

            }
            return {relations, constants}
        }

    }


    export function createQueryBuilder(
        cursor: EntityDataCursor,
        repository: Repository<any>,
    ): SelectQueryBuilder<any> {


        const leftQb = repository.createQueryBuilder()

        join(leftQb.alias,
            cursor.relations,
            cursor.constants,
            cursor.filter);


        let ownerSchema = leftQb.alias;

        for (let [owner] of reversed(cursor.owners)) {
            ownerSchema = owner.relation.join("INNER", leftQb, ownerSchema);
            join(ownerSchema,
                owner.relations,
                owner.constants,
                owner.filter);

        }

        return leftQb;

        function join(
            schema: string,
            relations: EntityRelation[],
            constants: Record<string, string>,
            filter: DataExp<any>
        ) {

            if (filter !== undefined) {

                leftQb.andWhere(leftQb.exp(filter, schema))
            }

            for (const relation of relations) {
                relation.join("INNER", leftQb, schema);
            }
            for (let [key, value] of entries(constants)) {
                const parameterName = '_const_' + schema + '__' + key;
                leftQb.andWhere(`${schema}.${key}=:${parameterName}`)
                leftQb.setParameter(parameterName, value)
            }

        }

    }

}

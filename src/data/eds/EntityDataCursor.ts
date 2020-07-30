import {Connection, ObjectType, Repository, SelectQueryBuilder} from "typeorm";
import {reversed} from "../../common/array/reversed";
import {entries} from "../../common/object/entries";
import {DataExp} from "../../json-exp/DataExp";
import {EntityRelation} from "../../typeorm/relations";
import {DataCursor} from "../DataCursor";
import {DataTypeInfo} from "../DataTypeInfo";
import {getEntityDataInfo} from "./getEntityDataInfo";

export type EntityDataCursorPath = {
    relation: EntityRelation

    filter: DataExp<any>,

    // childRelations
    // relationKeys

    // fieldKeys
    relationKeys: EntityRelation[],

    // childConstants
    fieldKeys: Record<string, any>
};

export type EntityDataCursor = {

    location: EntityDataCursorPath[],

    typeInfo: DataTypeInfo;

    relationKeys: EntityRelation[],

    fieldKeys: Record<string, any>;

    filter: DataExp<any>
};


export namespace EntityDataCursor {

    export function create(
        connection: Connection,
        cursor: DataCursor,
        entityType: ObjectType<any>
    ): EntityDataCursor {


        const location: EntityDataCursor['location'] = [];

        let typeInfo = DataTypeInfo.get(entityType);

        for (const owner of cursor.location) {

            if (owner.type) {
                const childType = typeInfo.children?.[owner.type];
                if (!childType)
                    throw new Error(`No have childType "${owner.type}" for "${typeInfo.type.name}".`)
                typeInfo = childType;
            }

            const ownerRelation = new EntityRelation(
                connection,
                typeInfo.type,
                owner.propertyName,
                true,
                owner.key);

            location.push({
                filter: owner.filter,
                relation: ownerRelation,
                ...loadChildKeys(typeInfo.type, owner.keys),
            })

            const entityType = ownerRelation.left.entityType;
            const relationTypeInfo = typeInfo.relations?.[owner.propertyName];

            if (relationTypeInfo) {
                if (relationTypeInfo.type !== entityType) {
                    throw new Error(`relation type is not left entity type.`)
                }
                typeInfo = relationTypeInfo;
            } else {
                typeInfo = DataTypeInfo.get(entityType);
            }

        }

        return {
             location,
            typeInfo,
            filter: cursor.filter,
            ...loadChildKeys(entityType, cursor.keys)
        };

        function loadChildKeys(entityType, childKeys: Record<string, any>) {
            const fieldKeys: EntityDataCursor['fieldKeys'] = {};
            const relationKeys: EntityDataCursor['relationKeys'] = [];
            const metadata = getEntityDataInfo(
                connection.getMetadata(entityType)
            );
            for (let [propertyName, value] of entries(childKeys)) {

                if (propertyName in metadata.propertyNameToRelationMetadata) {
                    const relation = new EntityRelation(connection, entityType,
                        propertyName, false, value);
                    relationKeys.push(relation);
                } else {
                    fieldKeys[propertyName] = value
                }

            }
            return {relationKeys, fieldKeys}
        }

    }


    export function createQueryBuilder(
        cursor: EntityDataCursor,
        repository: Repository<any>,
    ): SelectQueryBuilder<any> {


        const leftQb = repository.createQueryBuilder()

        join(leftQb.alias,
            cursor.relationKeys,
            cursor.fieldKeys,
            cursor.filter);


        let ownerSchema = leftQb.alias;

        for (let [owner] of reversed(cursor.location)) {
            ownerSchema = owner.relation.join("INNER", leftQb, ownerSchema);
            join(ownerSchema,
                owner.relationKeys,
                owner.fieldKeys,
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

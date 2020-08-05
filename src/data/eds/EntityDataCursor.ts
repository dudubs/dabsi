import {Connection, ObjectType, Repository, SelectQueryBuilder} from "typeorm";
import {inspect} from "util";
import {reversed} from "../../common/array/reversed";
import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {DataExp} from "../../json-exp/DataExp";
import {DataExpTranslatorToQeb} from "../../typeorm/exp/DataExpTranslatorToQeb";
import {QueryExpBuilder} from "../../typeorm/QueryExpBuilder";
import {EntityRelation} from "../../typeorm/relations";
import {DataCursor} from "../DataCursor";
import {DataTypeInfo} from "../DataTypeInfo";
import {getEntityDataInfo} from "./getEntityDataInfo";

export type EntityDataCursorPath = {
    typeInfo:DataTypeInfo;

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
                typeInfo,
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
            ...loadChildKeys(typeInfo.type, cursor.keys)
        };

        function loadChildKeys(entityType: Function, childKeys: Record<string, any>) {
            const fieldKeys: EntityDataCursor['fieldKeys'] = {};
            const relationKeys: EntityDataCursor['relationKeys'] = [];
            const entityDataInfo = getEntityDataInfo(
                connection.getMetadata(entityType)
            );

            for (let [propertyName, value] of entries(childKeys)) {


                if (propertyName in entityDataInfo.propertyNameToRelationMetadata) {
                    const relation = new EntityRelation(connection,
                        entityType,
                        propertyName, false, value);
                    relationKeys.push(relation);
                } else {
                    if (!(propertyName in entityDataInfo.propertyNameToColumn)) {
                        throw new Error(`No have property ${entityType.name}.${propertyName}`)
                    }
                    fieldKeys[propertyName] = value
                }

            }

            return {relationKeys, fieldKeys}
        }

    }

    export function createQueryExpBuilder(
        cursor: EntityDataCursor,
        repository: Repository<any>,
    ): QueryExpBuilder {


        const qb = new QueryExpBuilder(repository.metadata.connection,
            {from: repository.metadata.tableName});
        // const qb = repository.createQueryBuilder()


        join(qb.alias,
            cursor.typeInfo,
            cursor.relationKeys,
            cursor.fieldKeys,
            cursor.filter);


        let ownerSchema = qb.alias;

        for (let [owner] of reversed(cursor.location)) {
            ownerSchema = owner.relation.joinQeb("INNER", qb, ownerSchema);
            join(ownerSchema,
                owner.typeInfo,
                owner.relationKeys,
                owner.fieldKeys,
                owner.filter);

        }

        return qb;

        function join(
            schema: string,
            typeInfo:DataTypeInfo,
            relations: EntityRelation[],
            constants: Record<string, string>,
            filter: DataExp<any>
        ) {

            if (filter !== undefined) {
                qb.filter(
                    new DataExpTranslatorToQeb(
                        typeInfo,
                        qb,
                        schema
                    ).translate(filter)
                )
            }

            for (const relation of relations) {
                relation.joinQeb("INNER", qb, schema);
            }
            for (let [key, value] of entries(constants)) {
                qb.filter({
                    $at: {
                        [schema]: [
                            key, "=", [value]
                        ]
                    }
                })
            }

        }

    }


    export function createQueryBuilder(
        cursor: EntityDataCursor,
        repository: Repository<any>,
    ): SelectQueryBuilder<any> {


        const qb = repository.createQueryBuilder()

        join(qb.alias,
            cursor.relationKeys,
            cursor.fieldKeys,
            cursor.filter);


        let ownerSchema = qb.alias;

        for (let [owner] of reversed(cursor.location)) {
            ownerSchema = owner.relation.joinSqb("INNER", qb, ownerSchema);
            join(ownerSchema,
                owner.relationKeys,
                owner.fieldKeys,
                owner.filter);

        }

        return qb;

        function join(
            schema: string,
            relations: EntityRelation[],
            constants: Record<string, string>,
            filter: DataExp<any>
        ) {

            if (filter !== undefined) {
                qb.andWhere(qb.exp(filter, schema))
            }

            for (const relation of relations) {
                relation.joinSqb("INNER", qb, schema);
            }
            for (let [key, value] of entries(constants)) {
                const parameterName = '_const_' + schema + '__' + key;
                qb.andWhere(`${schema}.${key}=:${parameterName}`)
                qb.setParameter(parameterName, value)

            }

        }

    }

}

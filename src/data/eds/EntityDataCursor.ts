import {Connection, EntityMetadata, ObjectType, Repository} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {entries} from "../../common/object/entries";
import {DataExp} from "../../json-exp/DataExp";
import {DataExpTranslatorToQeb} from "../../typeorm/exp/DataExpTranslatorToQeb";
import {QueryExpBuilder} from "../../typeorm/QueryExpBuilder";
import {EntityRelation} from "../../typeorm/relations";
import {DataCursor} from "../DataCursor";
import {DataTypeInfo} from "../DataTypeInfo";
import {EntityDataKey} from "./EntityDataKey";
import {EntityDataInfo, getEntityDataInfo} from "./getEntityDataInfo";

export type EntityDataCursorPath = {

    typeInfo: DataTypeInfo;

    filter: DataExp<any>,

    child: { relation: EntityRelation, key: object };

    parent: EntityDataCursorPath | undefined;

    relationKeys: {
        relation: EntityRelation,
        key: object
    }[];


    columnKeys: { metadata: ColumnMetadata, key: any }[];
};

export type EntityDataCursor = Omit<EntityDataCursorPath, "child"> & {

    connection: Connection;

    repository: Repository<any>;

    entityInfo: EntityDataInfo

    entityMetadata: EntityMetadata;
};


export namespace EntityDataCursor {

    export function create(
        connection: Connection,
        cursor: DataCursor,
        entityType: ObjectType<any>
    ): EntityDataCursor {


        let typeInfo = DataTypeInfo.get(entityType);
        let parent: EntityDataCursor['parent'] = undefined;

        for (const path of cursor.location) {

            setChildTypeInfo(path.type);

            const ownerRelation = new EntityRelation(
                connection,
                typeInfo.type,
                path.propertyName,
                true);


            parent = {
                filter: path.filter,
                typeInfo,
                child: {
                    relation: ownerRelation,
                    key: EntityDataKey.parse(ownerRelation.right.entityMetadata, path.key)
                },
                parent,
                ...getChildKeys(typeInfo.type, path.keys),
            };


            const entityType = ownerRelation.left.entityType;
            const relationTypeInfo =
                typeInfo.relations?.[path.propertyName];

            if (relationTypeInfo) {
                if (relationTypeInfo.type !== entityType) {
                    throw new Error(`relation type is not left entity type.`)
                }
                typeInfo = relationTypeInfo;
            } else {
                typeInfo = DataTypeInfo.get(entityType);
            }
        }

        setChildTypeInfo(cursor.type);

        const entityMetadata = connection.getMetadata(typeInfo.type);
        return {
            connection,
            repository: connection.getRepository(typeInfo.type),
            typeInfo,
            filter: cursor.filter,
            entityMetadata,
            entityInfo: getEntityDataInfo(entityMetadata),
            parent,
            ...getChildKeys(typeInfo.type, cursor.keys)
        };

        function setChildTypeInfo(type: string) {
            if (!type)
                return typeInfo;

            const childType = typeInfo.children?.[type];
            if (!childType)
                throw new Error(`No have childType "${type}" for "${typeInfo.name}".`)
            typeInfo = childType
        }

        function getChildKeys(entityType: Function, dataChildKeys: Record<string, any>) {


            const columnKeys: EntityDataCursor['columnKeys'] = [];
            const relationKeys: EntityDataCursor['relationKeys'] = [];


            const entityDataInfo = getEntityDataInfo(
                connection.getMetadata(entityType)
            );

            for (const [propertyName, value] of entries(dataChildKeys)) {

                const relation = entityDataInfo.propertyNameToRelation[propertyName];
                if (relation) {
                    const key = EntityDataKey.parse(
                        relation.right.entityMetadata,
                        value
                    );
                    relationKeys.push({relation, key: key});
                    continue;
                }

                const columnMetadata = entityDataInfo.propertyNameToColumnMetadata[propertyName];
                if (columnMetadata) {
                    columnKeys.push({metadata: columnMetadata, key: value});
                    continue;
                }
                throw new Error(`No have property ${entityType.name}.${propertyName}`)

            }

            return {
                columnKeys,
                relationKeys,
            }
        }

    }

    export function createQueryExpBuilder(
        cursor: EntityDataCursor,
        repository: Repository<any>,
    ): QueryExpBuilder {


        const qb = new QueryExpBuilder(repository.metadata.connection,
            {from: repository.metadata.tableName});

        join(qb.alias, cursor);

        let schema = qb.alias;
        for (let path = cursor.parent; path; path = path.parent) {
            schema = path.child.relation.joinQeb("INNER", qb, schema, path.child.key!);
            join(schema, path);
        }
        return qb;

        function join(
            schema: string,
            path: EntityDataCursorPath | EntityDataCursor
        ) {

            if (path.filter !== undefined) {
                qb.filter(
                    new DataExpTranslatorToQeb(
                        path.typeInfo,
                        qb,
                        schema
                    ).translate(path.filter)
                )
            }
            for (const {relation, key} of path.relationKeys) {
                relation.joinQeb("INNER", qb, schema, key);
            }
            qb.filter({
                $and: path.columnKeys.map(column => ({
                    $at: {
                        [schema]: [
                            column.metadata.propertyName,
                            "=",
                            [column.key]
                        ]
                    }
                }))
            });

        }

    }


}

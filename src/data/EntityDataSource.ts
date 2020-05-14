import {Connection, getConnection, ObjectType, RelationQueryBuilder, SelectQueryBuilder} from "typeorm";
import {assert} from "../common/assert";
import {defined} from "../common/object/defined";
import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {Type} from "../common/typings";
import {JSONExp} from "../json-exp/JSONExp";
import {useQueryBuilderExp} from "../typeorm/exp/useQueryBuilderExp";
import {DataCursor} from "./DataCursor";
import {DataFields} from "./DataFields";
import {DataQuery, DataQueryResult} from "./DataQuery";
import {DataPathItem, DataSource, DataValues} from "./DataSource";
import {EntityDataSourceHelper} from "./EntityDataSourceHelper";
import {EntityID, EntityIDHelper} from "./EntityID";
import {RelationEntityDataSourceHelper} from "./RelationEntityDataSourceHelper";


useQueryBuilderExp();

export type EntityDataSourceOptions<E> = {
    connection?: (() => Connection) | string | Connection;
};


export class EntityDataSource<T> extends DataSource<T> {


    constructor(
        public mainEntityType: ObjectType<T>,
        public options: EntityDataSourceOptions<T> = {},
        public readonly cursor: DataCursor = new DataCursor()
    ) {
        super();
    }

    protected getCursor(): DataCursor {
        return this.cursor
    }


    withCursor<T>(cursor: DataCursor): DataSource<T> {
        return new EntityDataSource<T>(this.mainEntityType,
            this.options,
            cursor)
    }



    createQueryBuilder(): SelectQueryBuilder<T> {



        const leftQb = this.entityRepository.createQueryBuilder();
        const {relationHelper} = this;
        if (!relationHelper)
            return leftQb;


        if (!relationHelper.info.owner) {

            leftQb.andWhereExp(<any>{
                $at: {
                    [relationHelper.info.propertyName]:
                        {$key: relationHelper.info.key}
                }
            })
            return leftQb
        }
        for (let [key, value] of entries(relationHelper.entityId.map)) {
            leftQb.setParameter('right_' + key, value)
        }




        // if (relationHelper.relationMetadata.isOneToOne) {
        //     if (relationHelper.info.owner) {
        //
        //     } else {
        //
        //     }
        //     return leftQb;
        // }

        throw new Error()
        //
        // const {relationInfo, entityInfo: {relation: entityRelationInfo}} = this;
        //
        // if (relationInfo && entityRelationInfo) {
        //
        //     const {key: relationKey} = entityRelationInfo;
        //     if (entityRelationInfo.key.owner) {
        //
        //         // at  ERI.key, ERI.value
        //         console.log({relationKey}, leftQb.alias);
        //
        //         const rightEntityMetadata =
        //             this.connection.getMetadata(entityRelationInfo.entityType);
        //
        //         const relationMetadata =
        //             definedAt(relationInfo.relation.expressionMap, 'relationMetadata')
        //
        //
        //         const rightEntityId = new EntityIDHelper(rightEntityMetadata)
        //             .parse(relationKey.value);
        //
        //         const ownerRelationMetadata = relationMetadata.isOwning ?
        //             relationMetadata : definedAt(relationMetadata, "inverseRelation");
        //
        //         for (let [key, value] of entries(rightEntityId.map)) {
        //             leftQb.setParameter('right_' + key, value)
        //         }
        //
        //
        //         switch (relationMetadata.relationType) {
        //
        //             case "one-to-many": {
        //
        //                 leftQb.innerJoin(rightEntityMetadata.tableName, '_right',
        //
        //                     rightEntityMetadata.primaryColumns.toSeq()
        //                         .map(c => `_right.${c.databaseName}=:right_${c.propertyName}`)
        //                         .join(' AND ')
        //                     + ` AND ` +
        //                     ownerRelationMetadata.joinColumns.toSeq()
        //                         .map(pc => `_right.${pc.referencedColumn?.databaseName}=${leftQb.alias}.${
        //                             pc.databaseName
        //                         }`)
        //                         .join(' AND ')
        //                 );
        //
        //
        //                 console.log(leftQb.getQueryAndParameters());
        //                 break;
        //             }
        //             case "many-to-one": {
        //
        //
        //                 leftQb.innerJoin(rightEntityMetadata.tableName, '_right',
        //
        //                     rightEntityMetadata.primaryColumns.toSeq()
        //                         .map(c => `_right.${c.databaseName}=:right_${c.propertyName}`)
        //                         .join(' AND ')
        //                     + ` AND ` +
        //                     relationMetadata.joinColumns.toSeq()
        //                         .map(pc => `_right.${pc.databaseName}=${leftQb.alias}.${
        //                             pc.referencedColumn?.databaseName
        //                         }`)
        //                         .join(' AND ')
        //                 );
        //
        //
        //                 break;
        //             }
        //             default:
        //                 throw new Error(`No support ${relationMetadata.relationType}`)
        //         }
        //
        //
        //     } else {
        //         // of ERI.key, ERI.value
        //         leftQb.andWhereExp(<any>{
        //             $at: {
        //                 [relationKey.name]: {
        //                     $key: relationKey.value
        //                 }
        //             }
        //         })
        //     }
        // }
        //
        // return leftQb
    }


    @Lazy() get relationHelper(): RelationEntityDataSourceHelper | undefined {
        if (this.helper.relation) {
            return new RelationEntityDataSourceHelper(this)
        }
    }

    @Lazy() get helper(): EntityDataSourceHelper<T> {
        let entityType = this.mainEntityType;
        let relation: undefined | { type: Type<any> } & DataPathItem = undefined;
        for (let item of this.getCursor().path) {
            const metadata = defined(this.connection.getMetadata(entityType)
                .relations.find(relation => relation.propertyName === item.propertyName), () =>
                `No relation "${item.propertyName}" in ${entityType.name}.`);
            assert(typeof metadata.type === "function");

            if (item.owner) {
                relation = {type: entityType, ...item};
                entityType = metadata.type;
            } else {
                relation = {type: metadata.type, ...item}
            }
        }
        return new EntityDataSourceHelper(this, entityType, relation)

    }

    @Lazy() get entityID(): EntityIDHelper<T> {
        return new EntityIDHelper<T>(this.entityRepository.metadata);
    }

    @Lazy() get entityRepository() {
        return this.helper.repository
    }

    get entityType(): ObjectType<T> {
        return this.helper.type;
    }

    getDefaultFields(): DataFields<T> {
        return <any>this.entityRepository.metadata.columns.toObject(c =>
            [c.propertyName, c.propertyName]);
    }

    async query(query?: DataQuery<T>): Promise<DataQueryResult<T>> {
        if (!query)
            query = {};
        const qb = this.createQueryBuilder();


        for (let {by, sort, nulls} of (query.order ?? [])) {
            qb.addOrderByExp(
                by,
                sort === "DESC" ? "DESC" : "ASC",
                nulls === "FIRST" ? "NULLS FIRST" : "NULLS LAST"
            )
        }
        const filters: JSONExp<T>[] = [];
        if (query.skip) {
            qb.skip(query.skip);
        }
        const take = query.take
        if (take) {
            qb.take(take);
        }
        if (query.filter) {
            filters.push(query.filter)
        }
        if (filters.length) {
            qb.andWhereExp({$all: filters})
        }
        const {expressionMap: {selects}} = qb;
        selects.length = 0;
        // select key columns
        this.entityID.select(qb);

        const fieldToAliasName: Record<string, string> = {};

        {
            // select fields
            const {expressionMap: {selects}} = qb;
            for (let [key, exp] of entries(this.getFields())) {
                const aliasName = '_' + key;
                fieldToAliasName[key] = aliasName;
                selects.push({
                    selection: qb.exp(exp),
                    aliasName
                })
            }
        }

        return {
            count: !query.count ? undefined : (
                await qb.getCount()
            ),
            items: (await qb.getRawMany()).map(raw => {
                return {
                    key: this.entityID.load(raw).toString(),
                    row: <any>mapObject(fieldToAliasName, aliasName =>
                        raw[aliasName])
                }
            })
        }
    }


    count(filter?: JSONExp<T>): Promise<number> {
        return this.createQueryBuilder()
            .andWhereExp(filter)
            .getCount()
    }

    has(filter?: JSONExp<T>): Promise<boolean> {
        return this.createQueryBuilder()
            .andWhereExp(filter)
            .limit(1)
            .getCount().then(count => count > 1)
    }


    // @Lazy() get relationInfo(): EntityRelationInfo | undefined {
    //     const {
    //         helper: {
    //             relation: entityRelationInfo,
    //             entityType: entityType
    //         }
    //     } = this;
    //
    //     if (!entityRelationInfo) return;
    //     const relationEntityMetadata = this.connection
    //         .getMetadata(entityRelationInfo.entityType);
    //
    //     const relationEntityId = new EntityIDHelper(relationEntityMetadata)
    //         .parse(entityRelationInfo.key.value);
    //
    //     const ownerType = entityRelationInfo.key.owner ?
    //         entityRelationInfo.entityType : entityType;
    //
    //     const relation = this.connection.getRepository(ownerType)
    //         .createQueryBuilder()
    //         .relation(entityRelationInfo.key.name);
    //
    //     const relationMetadata = definedAt(relation.expressionMap, "relationMetadata");
    //     const toMany = relationMetadata.relationType.endsWith("-to-many");
    //     const toOne = (!toMany) && relationMetadata.relationType.endsWith("-to-one");
    //
    //     const getOwnerId = (entityId: EntityID<any>) =>
    //         entityRelationInfo.key.owner ? relationEntityId : entityId;
    //     const getItemId = (entityId: EntityID<any>) =>
    //         entityRelationInfo.key.owner ? entityId : relationEntityId;
    //
    //
    //     return {
    //         toOne, toMany,
    //         relation,
    //         getOwnerId,
    //         getItemId,
    //         of: (entityId: EntityID<any>) =>
    //             relation.of(getOwnerId(entityId).map)
    //     }
    // }


    async insert<K extends keyof T>(values: DataValues<T>): Promise<string> {
        const entity = await this.helper.repository.save(
            this.helper.repository.create(<any>values)
        );
        const entityId = this.entityID.from(entity);
        await this.relationHelper?.add(entityId);
        return entityId.toString()
    }

    async update<K extends keyof T>(key: string, values: DataValues<T>): Promise<void> {
        await this.entityRepository.update(
            this.entityID.parse(key).asFindCondition(),
            <any>values);
    }

    protected async addAll(keys: string[]): Promise<void> {
        if (!this.relationHelper)
            throw new Error(`No relation`);

        for (let key of keys) {
            const entityId = this.entityID.parse(key);
            await this.relationHelper.add(entityId);
            if (this.relationHelper.isToOne)
                break;

        }
    }


    protected async removeAll(keys: string[]): Promise<void> {
        if (!this.relationHelper) return;
        for (let key of keys) {
            const entityId = this.entityID.parse(key);
            await this.relationHelper.remove(entityId);
            if (this.relationHelper.isToOne)
                break;
        }
    }


    protected async deleteAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.entityRepository.delete(
                this.entityID.parse(key).asFindCondition()
            )
        }
    }

    async delete(key: string): Promise<void> {
        await this.entityRepository.delete(
            this.entityID.parse(key).asFindCondition()
        );
    }

    get connection(): Connection {
        switch (typeof this.options.connection) {
            case "string":
                return getConnection(this.options.connection);
            case "function":
                return this.options.connection();
            case "object":
                return this.options.connection;
            case "undefined":
                return getConnection()
            default:
                throw new Error()
        }
    }


}

type EntityRelationInfo = {
    toMany: boolean,
    toOne: boolean,
    relation: RelationQueryBuilder<any>,
    of: (entityId: EntityID<any>) => RelationQueryBuilder<any>,
    getOwnerId: (entityId: EntityID<any>) => EntityID<any>,
    getItemId: (entityId: EntityID<any>) => EntityID<any>
};


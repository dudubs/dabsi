import {Connection, getConnection, ObjectType, SelectQueryBuilder} from "typeorm";
import {asyncIterableToArray} from "../../common/data/asyncIterableToArray";
import {last} from "../common/array/last";
import {reversed} from "../common/array/reversed";
import {entries} from "../common/object/entries";
import {keys} from "../common/object/keys";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {JSONExp} from "../json-exp/JSONExp";
import {useQueryBuilderExp} from "../typeorm/exp/useQueryBuilderExp";
import {EntityRelation} from "../typeorm/relations";
import {DataCursor, DataLoadMap} from "./DataCursor";
import {DataItem} from "./DataItem";
import {DataFindOptions, DataQuery, DataQueryResult} from "./DataQuery";
import {DataSource, DataValues} from "./DataSource";
import {EntityDataCursor} from "./EntityDataCursor";
import {EntityIDHelper} from "./EntityID";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {selectLoadMap} from "./selectLoadMap";


useQueryBuilderExp();


export type EntityDataSourceOptions<T> = {
    getConnection?: (() => Connection) | string;

};

export class EntityDataSource<T> extends DataSource<T> {


    static create<T>(
        entityType: ObjectType<T>,
        options: EntityDataSourceOptions<T> = {}
    ): EntityDataSource<T> {
        return new EntityDataSource<T>(entityType, options,
            DataCursor.create()
        )
    }


    constructor(
        public mainEntityType: ObjectType<T>,
        public options: EntityDataSourceOptions<any> = {},
        public readonly cursor: DataCursor
    ) {
        super();
    }


    withCursor<T>(cursor: DataCursor): DataSource<T> {
        return new EntityDataSource<T>(this.mainEntityType,
            <any>this.options,
            cursor)
    }

    createQueryBuilder(): SelectQueryBuilder<T> {
        const leftQb = this.entityRepository.createQueryBuilder()

        for (let childRelation of this.entityInfo.childRelations) {
            childRelation.join("INNER", leftQb, leftQb.alias);
        }

        let ownerSchema = leftQb.alias;

        for (let [owner] of reversed(this.entityInfo.owners)) {
            ownerSchema = owner.relation.join("INNER", leftQb, ownerSchema);
            for (let childRelation of owner.childRelations) {
                childRelation.join("INNER", leftQb, ownerSchema);
            }
        }

        return leftQb;

    }


    @Lazy() get entityInfo(): EntityDataCursor & {
        inverseRelationsByColumn: EntityRelation[],
        relationsByColumn: EntityRelation[]
    } {
        const inverseRelationsByColumn: EntityRelation[] = [];
        const relationsByColumn: EntityRelation[] = [];
        const cursor = EntityDataCursor(this.connection,
            this.cursor, this.mainEntityType);


        const ownerRelation = last(cursor.owners)?.relation;

        ownerRelation && addRelation(ownerRelation);
        cursor.childRelations.forEach(addRelation);


        return {
            ...cursor,
            inverseRelationsByColumn,
            relationsByColumn,
        }

        function addRelation(relation: EntityRelation) {
            if (relation.isLeftOwningByColumn()) {
                relationsByColumn.push(relation)
            } else {
                inverseRelationsByColumn.push(relation)
            }
        }

    }

    @Lazy() get idHelper(): EntityIDHelper<T> {
        return new EntityIDHelper<T>(this.entityRepository.metadata);
    }

    @Lazy() get entityRepository() {
        return this.connection.getRepository(this.entityType)
    }

    get entityType(): ObjectType<T> {
        return this.entityInfo.entityType;
    }

    protected _findCursor(options: DataFindOptions<T>): {
        qb: SelectQueryBuilder<T>,
        load(): AsyncIterableIterator<DataItem<T>>
    } {
        const qb = this.createQueryBuilder();
        for (let {by, sort, nulls} of (options.order ?? [])) {
            qb.addOrderByExp(
                by,
                sort === "DESC" ? "DESC" : "ASC",
                nulls === "FIRST" ? "NULLS FIRST" : "NULLS LAST"
            )
        }

        const filters: JSONExp<T>[] = [];
        if (options.skip) {
            qb.skip(options.skip);
        }
        const take = Math.min(options.take ?? 100, 100)
        if (take) {
            qb.take(take);
        }

        if (this.cursor.filter) {
            filters.push(<any>this.cursor.filter);
        }

        if (options.filter) {
            filters.push(options.filter)
        }
        if (filters.length) {
            qb.andWhereExp({$and: filters})
        }
        const {expressionMap: {selects}} = qb;
        selects.length = 0;
        // select key columns
        this.idHelper.select(qb);

        const idPrefix = 'id:';
        const idPropertyNameToAliasName: Record<string, string> = {};

        const fieldNameToLoader: Record<string, (raw: any) => any> = {};
        const selectionToAliasName: Record<string, any> = {};
        const aliasNameToAliasName: Record<string, string> = {};


        for (const column of this.idHelper.primaryColumns) {
            const idAliasName = idPrefix + column.propertyName;
            idPropertyNameToAliasName[column.propertyName] = idAliasName;
            select(`${qb.alias}.${column.databaseName}`, idAliasName);
        }


        const loadMapObject: DataLoadMap<any> = {...this.cursor.loadMap};


        let defaultFields: Record<string, any> = {};
        let selectedFields: Record<string, any> = {};

        if (this.cursor.excludeAll) {

            for (let key of keys(loadMapObject)) {
                const exp = this.cursor.fields[key];
                if (key === exp) continue;
                delete loadMapObject[key];
            }

            selectedFields = {...this.cursor.fields};

        } else {

            for (const c of this.entityRepository.metadata.columns) {
                if (!c.relationMetadata) {
                    defaultFields[c.propertyName] = c.propertyName;
                }
            }

            for (let key of this.cursor.exclude) {
                delete loadMapObject[key];
                delete defaultFields[key]
            }

            selectedFields = {
                ...defaultFields,
                ...this.cursor.fields
            };
        }


        const entityDataInfo = getEntityDataInfo(this.entityRepository.metadata);

        // select fields
        for (let [fieldName, exp] of entries(selectedFields)) {
            const selection = qb.exp(<any>exp);
            const aliasName = '_' + fieldName;
            select(selection, aliasName);

            const transformer =
                (typeof exp === "string") &&
                entityDataInfo.propertyNameToTransformer[exp];

            fieldNameToLoader[fieldName] = raw => {
                raw = getRaw(raw, aliasName);
                return transformer ? transformer.from(raw) : raw;
            };

        }

        const loader = selectLoadMap(qb, qb.alias, loadMapObject, false);


        return {
            qb,
            async* load() {
                const raws = await qb.getRawMany();
                for (const raw of raws) {
                    const row: any = mapObject(fieldNameToLoader, load =>
                        load(raw)
                    );
                    const id = mapObject(idPropertyNameToAliasName,
                        aliasName => getRaw(raw, aliasName));
                    loader?.(row, raw);

                    yield {
                        key: this.idHelper.fromObject(id).toString(),
                        row
                    }
                }
            }
        }


        function getRaw(raw, aliasName) {
            return raw[aliasNameToAliasName[aliasName] ?? aliasName]
        }

        function select(selection, aliasName) {
            if (selection in selectionToAliasName) {
                aliasNameToAliasName[aliasName] = selectionToAliasName[selection];
            } else {
                selectionToAliasName[selection] = aliasName;
                selects.push({
                    selection,
                    aliasName
                })
            }
        }
    }

    find(options: DataFindOptions<T> = {}): AsyncIterableIterator<DataItem<T>> {
        return this._findCursor(options).load();
    }

    async query(query?: DataQuery<T>): Promise<DataQueryResult<T>> {
        if (!query)
            query = {};
        const cursor = this._findCursor(query);
        return {
            count: !query.count ? undefined : (
                await cursor.qb.getCount()
            ),
            items: await asyncIterableToArray(
                cursor.load()
            )
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

    async insert<K extends keyof T>(values: DataValues<T>): Promise<string> {
        // TODO: if left is order by column: set relation values...
        for (const relation of this.entityInfo.relationsByColumn) {
            values[relation.ownerRelationMetadata.propertyName] = relation.rightId;
        }

        const entity = await this.entityRepository.save(
            this.entityRepository.create(<any>values)
        );
        const entityId = this.idHelper.from(entity);
        for (let relation of (this.entityInfo.inverseRelationsByColumn ?? [])) {
            await relation.addOrSet(entityId.values)
        }
        return entityId.toString()
    }

    async update<K extends keyof T>(key: string, values: DataValues<T>): Promise<void> {

        values = {...values};
        for (let relation of this.entityInfo.relationsByColumn) {
            delete values[relation.propertyName];
        }

        await this.entityRepository.update(
            this.idHelper.parse(key).asFindCondition(),
            <any>values);
    }

    async addAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.addOrRemoveEntity(key, false);
        }
    }

    async addOrRemoveEntity(key: string, remove) {
        const method = remove ? "removeOrUnset" : "addOrSet";
        const id = this.idHelper.parse(key).values;
        await last(this.entityInfo.owners)?.relation[method](id);
        for (let childRelation of this.entityInfo.childRelations) {
            await childRelation[method](id);
        }
    }


    async removeAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.addOrRemoveEntity(key, true);
        }
    }

    /*
        deleteAll()

     */

    async deleteAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.entityRepository.delete(
                this.idHelper.parse(key).asFindCondition()
            )
        }
    }

    get connection(): Connection {
        switch (typeof this.options.getConnection) {
            case "string":
                return getConnection(this.options.getConnection);
            case "function":
                return this.options.getConnection();
            case "undefined":
                return getConnection()
            default:
                throw new Error()
        }
    }


}


import {Connection} from "typeorm";
import {last} from "../../common/array/last";
import {Lazy} from "../../common/patterns/lazy";
import {Type} from "../../common/typings";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {QueryExpBuilder} from "../../typeorm/QueryExpBuilder";
import {DataCursor, EmptyDataCursor} from "../DataCursor";
import {DataItem, DataKey, DataKeyInput} from "../DataItem";
import {DataSource, DataValues} from "../DataSource";
import {EntityDataCursor} from "./EntityDataCursor";
import {EntityDataKey} from "./EntityDataKey";
import {EntityDataSelector} from "./EntityDataSelector";
import {getEntityDataSourceInfo} from "./getEntityDataSourceInfo";


useQueryBuilderExp();


export type EntityDataSourceOptions<T> = {
    connection?: (() => Connection) | string | Connection;

};

export class EntityDataSource<T> extends DataSource<T> {

    static getConnection: undefined | (() => Connection);

    static create<T>(
        entityType: Type<T>,
        getConnection: () => Connection
    ): EntityDataSource<T>

    static create<T>(
        entityType: Type<T>,
        options?: EntityDataSourceOptions<T>
    ): EntityDataSource<T>;

    static create(
        entityType,
        optionsOrGetConnection
    ) {
        return new EntityDataSource(entityType,
            typeof optionsOrGetConnection === "function" ? {
                connection: optionsOrGetConnection
            } : optionsOrGetConnection,
            EmptyDataCursor
        )
    }


    constructor(
        public mainEntityType: Type<T>,
        public options: EntityDataSourceOptions<any> = {},
        public readonly cursor: DataCursor
    ) {
        super();
    }

    withCursor<U = T>(cursor: DataCursor): EntityDataSource<U> {

        return new EntityDataSource<U>(this.mainEntityType,
            <any>this.options,
            cursor)
    }

    protected createQueryExpBuilder(): QueryExpBuilder {
        return EntityDataCursor.createQueryExpBuilder(
            this.entitySourceInfo.cursor,
            this.entitySourceInfo.repository
        )
    }

    protected createEntityCursor() {
        const qb = this.createQueryExpBuilder();

        const loader = EntityDataSelector.selectCursor(
            this.entitySourceInfo.cursor.typeInfo,
            qb,
            this.cursor.selection,
            this.cursor
        )
        return {
            qb,
            loader
        };
    }

    items(): Promise<DataItem<T>[]> {
        return this.createEntityCursor().loader.loadMany()
    }

    count(): Promise<number> {
        return this.createQueryExpBuilder().count();
    }

    has(): Promise<boolean> {
        return this.createQueryExpBuilder().has()
    }

    // write
    async insert<K extends keyof T>(values: DataValues<T>): Promise<string> {
        // TODO: if left is order by column: set relation values...

        for (const relation of this.entitySourceInfo.leftRelationsWithoutJoinTable) {
            values[relation.ownerRelationMetadata.propertyName] = relation.rightId;
        }

        Object.assign(values, this.entitySourceInfo.cursor.fieldKeys);

        const entity = await this.entitySourceInfo.repository.save(
            this.entitySourceInfo.repository.create(<any>values)
        );

        const entityKeyObject =
            EntityDataKey.fromEntity(this.entitySourceInfo
                .repository.metadata, entity);

        for (let relation of (this.entitySourceInfo.inverseLeftRelationsWithoutJoinTable ?? [])) {
            await relation.addOrSet(entityKeyObject)
        }

        const entityKey = EntityDataKey.stringify(
            this.entitySourceInfo.repository.metadata,
            entityKeyObject
        );

        return entityKey
    }

    async update(key: DataKeyInput<T>, values: DataValues<T>): Promise<void> {

        values = {...values};

        for (let relation of this.entitySourceInfo.leftRelationsWithoutJoinTable) {
            delete values[relation.propertyName];
        }

        await this.entitySourceInfo.repository.update(
            <any>EntityDataKey.parse(this.entitySourceInfo.repository.metadata,
                DataKey(key)),
            <any>values);
    }

    async addAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this._addOrRemoveEntity(key, false);
        }
    }

    protected async _addOrRemoveEntity(key: string, remove) {
        const method = remove ? "removeOrUnset" : "addOrSet";
        const entityKeyObject = EntityDataKey.parse(
            this.entitySourceInfo.repository.metadata,
            key
        );
        await last(this.entitySourceInfo.cursor.location)?.relation[method](entityKeyObject);
        for (let childRelation of this.entitySourceInfo.cursor.relationKeys) {
            await childRelation[method](entityKeyObject);
        }
    }

    async removeAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this._addOrRemoveEntity(key, true);
        }
    }

    async deleteAll(keys: string[]): Promise<void> {
        const {repository} = this.entitySourceInfo;
        for (let key of keys) {
            await repository.delete(
                <any>EntityDataKey.parse(repository.metadata, key)
            )
        }
    }

    @Lazy() get entitySourceInfo(): ReturnType<typeof getEntityDataSourceInfo> {
        return getEntityDataSourceInfo(this)
    }


}



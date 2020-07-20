import {Connection, SelectQueryBuilder} from "typeorm";
import {last} from "../../common/array/last";
import {Lazy} from "../../common/patterns/lazy";
import {Type} from "../../common/typings";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {DataCursor, EmptyDataCursor} from "../DataCursor";
import {DataItem, DataKey, DataKeyInput} from "../DataItem";
import {DataSource, DataValues} from "../DataSource";
import {createEntityConnection} from "./createEntityConnection";
import {EntityDataCursor} from "./EntityDataCursor";
import {EntityDataKey} from "./EntityDataKey";
import {EntityDataSelection} from "./EntityDataSelection";
import {QueryBuilderSelector} from "./QueryBuilderSelector";


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

    protected createQueryBuilder(): SelectQueryBuilder<any> {
        return EntityDataCursor.createQueryBuilder(
            this.entityConnection.cursor,
            this.entityConnection.repository
        )
    }

    items(): Promise<DataItem<T>[]> {
        const {cursor} = this;
        const qb = this.createQueryBuilder();
        const selector = new QueryBuilderSelector(qb);
        const loader = EntityDataSelection.select(
            qb,
            selector,
            this.cursor.selection,
            qb.alias,
            "r_"
        )
        for (const order of cursor.order) {
            qb.addOrderByExp(order.by, order.sort,
                order.nulls === "FIRST" ? "NULLS FIRST" :
                    order.nulls === "LAST" ? "NULLS LAST" :
                        undefined)
        }
        if (cursor.skip)
            qb.skip(cursor.skip);
        if (cursor.take)
            qb.take(cursor.take);
        return loader.getRows()
    }

    count(): Promise<number> {
        return this.createQueryBuilder().getCount();
    }

    has(): Promise<boolean> {
        // TODO: Check if have a limit
        return this.createQueryBuilder()
            .take(1).getCount()
            .then(count => count > 0)
    }

    // write
    async insert<K extends keyof T>(values: DataValues<T>): Promise<string> {
        // TODO: if left is order by column: set relation values...
        for (const relation of this.entityConnection.leftRelationsWithoutJoinTable) {
            values[relation.ownerRelationMetadata.propertyName] = relation.rightId;
        }

        Object.assign(values, this.entityConnection.cursor.constants);

        const entity = await this.entityConnection.repository.save(
            this.entityConnection.repository.create(<any>values)
        );

        const entityKeyObject =
            EntityDataKey.fromEntity(this.entityConnection
                .repository.metadata, entity);

        for (let relation of (this.entityConnection.inverseLeftRelationsWithoutJoinTable ?? [])) {
            await relation.addOrSet(entityKeyObject)
        }

        return EntityDataKey.stringify(
            this.entityConnection.repository.metadata,
            entityKeyObject)
    }

    async update(key: DataKeyInput<T>, values: DataValues<T>): Promise<void> {

        values = {...values};

        for (let relation of this.entityConnection.leftRelationsWithoutJoinTable) {
            delete values[relation.propertyName];
        }

        await this.entityConnection.repository.update(
            <any>EntityDataKey.parse(this.entityConnection.repository.metadata,
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
            this.entityConnection.repository.metadata,
            key
        );
        await last(this.entityConnection.cursor.owners)?.relation[method](entityKeyObject);
        for (let childRelation of this.entityConnection.cursor.relations) {
            await childRelation[method](entityKeyObject);
        }
    }

    async removeAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this._addOrRemoveEntity(key, true);
        }
    }

    async deleteAll(keys: string[]): Promise<void> {
        const {repository} = this.entityConnection;
        for (let key of keys) {
            await repository.delete(
                <any>EntityDataKey.parse(repository.metadata, key)
            )
        }
    }

    @Lazy() get entityConnection(): ReturnType<typeof createEntityConnection> {
        return createEntityConnection(this)
    }


}



import {Connection} from "typeorm";
import {getConnection} from "typeorm";
import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {Lazy} from "../../common/patterns/lazy";
import {Type} from "../../common/typings";
import {useQueryBuilderExp} from "../../typeorm/exp/useQueryBuilderExp";
import {QueryExpBuilder} from "../../typeorm/QueryExpBuilder";
import {EntityRelation} from "../../typeorm/relations";
import {DataCursor, EmptyDataCursor} from "../DataCursor";
import {DataKey} from "../DataKey";
import {DataBaseRow, DataRow} from "../DataRow";
import {DataSource, DataValues} from "../DataSource";
import {EntityDataCursor} from "./EntityDataCursor";
import {EntityDataKey} from "./EntityDataKey";
import {EntityDataSelector} from "./EntityDataSelector";


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
            this.entityCursor,
            this.entityCursor.repository
        )
    }

    protected createEntityCursor() {
        const qb = this.createQueryExpBuilder();
        const loader = EntityDataSelector.selectCursor(
            this.entityCursor.typeInfo,
            qb,
            this.cursor.selection,
            this.cursor,
            DataBaseRow(this)
        )
        return {
            qb,
            loader
        };
    }

    items(): Promise<DataRow<T>[]> {
        return this.createEntityCursor().loader.loadMany()
    }

    count(): Promise<number> {
        return this.createQueryExpBuilder().count();
    }

    has(): Promise<boolean> {
        return this.createQueryExpBuilder().has()
    }


    protected _createEntityValues(values, isInsert: boolean) {

        const row = {};
        const relationKeys: {
            relation: EntityRelation,
            key: object
        }[] = [];

        const childParent = isInsert && this.entityCursor.parent?.child;
        childParent && buildRelation(childParent.relation, childParent.key);

        for (const {relation, key} of this.entityCursor.relationKeys) {
            if (relation.propertyName in values) {
                throw new Error(`Can't override relation ${relation.propertyName}.`)
            }
            isInsert && buildRelation(relation, key);
        }

        for (const column of this.entityCursor.columnKeys) {
            if (column.metadata.propertyName in values) {
                throw new Error(`Can't override field ${column.metadata.propertyName}.`)
            }
            if (isInsert)
                row[column.metadata.propertyName] = column.key;
        }

        for (const [propertyName, value] of entries(values)) {
            const relation = this.entityCursor.entityInfo.propertyNameToRelation[propertyName];
            if (relation) {
                const key = EntityDataKey.parse(relation.right.entityMetadata, value);
                buildRelation(relation, key);
                continue;
            }
            const column = this.entityCursor.entityInfo.propertyNameToColumnMetadata[propertyName];
            if (column) {
                row[propertyName] = value;
                continue;
            }
            throw new Error(`Invalid property ${propertyName}`);
        }

        return {row, relationKeys};

        function buildRelation(relation: EntityRelation, key: object) {
            if (relation.isJoinColumn() && relation.left.isOwning) {
                row[relation.propertyName] = key;
                return;
            }
            if (!relation.isToOne)
                throw new Error(`Not support.`)
            relationKeys.push({relation, key});
        }
    }

    async insertKey<K extends keyof T>(values: DataValues<T>): Promise<string> {
        const entityMetadata = this.entityCursor.repository.metadata;
        const {row, relationKeys} = this._createEntityValues(values, true);
        const entity = await this.entityCursor.repository.save(
            this.entityCursor.repository.create(<any>row)
        );
        const entityKey = EntityDataKey.pick(entityMetadata, entity);
        for (let {relation, key} of relationKeys) {
            await relation.update("addOrSet", entityKey, key);
        }
        return EntityDataKey.stringify(entityMetadata, entityKey);
    }

    async updateAll(keys: string[], values: DataValues<T>): Promise<number> {
        if (!hasKeys(values))
            return 0;
        let affectedRows = 0;
        const {row, relationKeys} = this._createEntityValues(values, false);
        const entityMetadata = this.entityCursor.repository.metadata;
        for (const key of keys) {
            const entityKey = EntityDataKey.parse(entityMetadata, DataKey(key));
            const result = await this.entityCursor.repository.update(entityKey, row);
            for (const {relation, key} of relationKeys) {
                await relation.update("addOrSet", entityKey, key);
            }
            if (result.affected) {
                affectedRows++;
            }
        }
        return affectedRows;
    }

    async addAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this._addOrRemove(key, false);
        }
    }

    protected async _addOrRemove(key: string, toRemove: boolean) {
        const method = toRemove ? "removeOrUnset" as const : "addOrSet" as const;
        const entityKey = EntityDataKey.parse(
            this.entityCursor.repository.metadata,
            key
        );

        if (this.entityCursor.parent) {
            await this.entityCursor.parent.child.relation.update(method,
                entityKey, this.entityCursor.parent.child.key!
            );
        }

        for (const {relation, key} of this.entityCursor.relationKeys) {
            await relation.update(method, entityKey, key)
        }
    }

    async removeAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this._addOrRemove(key, true);
        }
    }

    async deleteAll(keys: string[]): Promise<void> {
        const {repository} = this.entityCursor;
        for (let key of keys) {
            await repository.delete(
                <any>EntityDataKey.parse(repository.metadata, key)
            )
        }
    }

    @Lazy() get entityCursor(): EntityDataCursor {
        let connection: Connection;
        switch (typeof this.options.connection) {
            case "object":
                connection = this.options.connection;
                break;
            case "string":
                connection = getConnection(this.options.connection);
                break;
            case "function":
                connection = this.options.connection();
                break;
            case "undefined":
                connection = getConnection()
                break;
            default:
                throw new Error()
        }

        return EntityDataCursor.create(
            connection,
            this.cursor,
            this.mainEntityType
        )
    }

}



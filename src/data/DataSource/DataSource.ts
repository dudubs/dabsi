import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {ArrayTypeOrObject} from "../../common/typings";
import {chunks} from "../chunks";
import {DataCursor} from "../DataCursor";
import {DataExp} from "../DataExp";
import {DataFields, DataFieldsRow} from "../DataFields";
import {DataKey, DataKeyInput} from "../DataKey";
import {DataNullsSort, DataOrder, DataSort} from "../DataOrder";
import {DataRow} from "../DataRow";
import {AnyDataSelection, DataSelection} from "../DataSelection";
import {DataSelectionRow} from "../DataSelectionRow";
import {DataUnionChildren} from "../DataUnion";
import {RelationKeys} from "../Relation";
import {DataValues} from "./DataValues";

export type DataKeyOrKeysInput<T> = DataKeyInput<T>[] | DataKeyInput<T>;

export function DataKeyOrKeys<T>(keyOrKeys: DataKeyOrKeysInput<T>): string[] {
    if (Array.isArray(keyOrKeys))
        return keyOrKeys.map(DataKey)
    return [DataKey(keyOrKeys)]
}

export type DataSourceOf<T extends DataSource<any>> =
    T extends DataSource<infer U> ? U : never;

export type DataRowOfSource<T extends DataSource<any>> =
    DataRow<DataSourceOf<T>>;

export abstract class DataSource<T> {


    async countAndQuery(): Promise<[number, DataRow<T>[]]> {
        // TODO: Optimizing
        return [
            await this.count(),
            await this.items()
        ]
    }

    // TODO: rename to getRows()
    abstract items(): Promise<DataRow<T>[]>;

    next(pageSize: number): DataSource<T> {
        return this.withCursor({
            ...this.cursor,
            skip: this.cursor.skip + pageSize
        })
    }


    getKeys(): Promise<string[]> {
        return this.selectKeys().items().then(rows => rows.map(row => row.$key))
    }

    selectKeys(): DataSource<{}> {
        return this.withCursor({
            ...this.cursor,
            selection: {
                pick: [],
                fields: {},
                children: {},
                relations: {}
            }
        })
    }


    async* find(pageSize = 10): AsyncIterableIterator<DataRow<T>> {
        let source: DataSource<T> = this.withCursor({
            ...this.cursor,
            skip: 0,
            take: pageSize
        });

        while (true) {
            const rows = await source.items();
            yield* rows;
            if (pageSize > rows.length)
                break;
            source = source.next(rows.length)
        }
    }

    abstract count(): Promise<number>;

    abstract has(): Promise<boolean>;

    async getOrFail(key?: string | number): Promise<DataRow<T>> {
        return defined(await this.get(key?.toString()),
            () => key ? `No row "${key}"` : "No row");
    }

    async get(key?: string | number): Promise<DataRow<T> | undefined> {
        if (typeof key === "number")
            key = String(key)
        const result = await this
            .filter(typeof key === "string" ? {$is: key} : undefined)
            .take(1)
            .items();
        return result[0]
    }

    // relation


    async addOrRemove(keys?: Record<string, boolean | undefined>): Promise<void>
    async addOrRemove(addKeys: string[], removeKeys: string[]): Promise<void>
    async addOrRemove(addKeysOrKeys, removeKeys?): Promise<void> {
        if (removeKeys) {
            addKeysOrKeys.length && await this.addAll(addKeysOrKeys);
            removeKeys.length && await this.removeAll(removeKeys);
        } else {
            const addKeys = [];
            removeKeys = [];
            for (let [key, value] of entries(addKeysOrKeys)) {
                if (typeof value !== "boolean")
                    continue;
                (value ? addKeys : removeKeys).push(key);
            }
            return await this.addOrRemove(addKeys, removeKeys);
        }
    }

    abstract addAll(keys: string[]): Promise<void>;

    abstract removeAll(keys: string[]): Promise<void>;

    abstract deleteAll(keys: string[]): Promise<void>;

    abstract updateAll(keys: string[], values: DataValues<T>): Promise<number>;

    addKey(key: string): Promise<void> {
        return this.addAll([key]);
    }

    removeKey(key: string): Promise<void> {
        return this.removeAll([key]);
    }

    deleteKey(key: string): Promise<void> {
        return this.deleteAll([key])
    }


    updateKey(key: string, values: DataValues<T>): Promise<boolean> {
        return this.updateAll([key], values)
            .then(affectedRows => affectedRows > 0);
    }

    abstract insertKey(values: DataValues<T>): Promise<string>;


    protected async _each(
        keyOrKeys: DataKeyOrKeysInput<T> | undefined,
        callback: (keys: string[]) => Promise<void>) {

        if (keyOrKeys !== undefined) {
            if (Array.isArray(keyOrKeys)) {
                return callback(keyOrKeys.map(DataKey))
            }
            return callback([DataKey(keyOrKeys)]);
        }

        for await (const rows of chunks(this.selectKeys().find(), 100)) {
            await callback(rows.map(row => row.$key));
        }
    }


    async update(values: DataValues<T>): Promise<number>
    async update(keyOrKeys: DataKeyOrKeysInput<T>, values: DataValues<T>): Promise<number>
    async update(...args): Promise<number> {
        let values;
        let keyOrKeys = undefined;
        if (args.length === 1) {
            [values] = args;
        } else {
            [keyOrKeys, values] = args;
        }
        let affectedRows = 0;
        await this._each(keyOrKeys, async keys => {
            affectedRows += await this.updateAll(keys, values)
        })
        return affectedRows
    }

    async add(keyOrKeys?: DataKeyOrKeysInput<T>) {
        return this._each(keyOrKeys, keys => this.addAll(keys))
    }

    async remove(keyOrKeys?: DataKeyOrKeysInput<T>) {
        return this._each(keyOrKeys, keys => this.removeAll(keys))
    }

    async delete(keyOrKeys?: DataKeyOrKeysInput<T>) {
        return this._each(keyOrKeys, keys => this.deleteAll(keys))
    }

    async insert(values: DataValues<T>): Promise<DataRow<T>> {
        return this.getOrFail(
            await this.insertKey(values)
        )
    }


    // cursoring

    abstract readonly cursor: DataCursor;

    abstract withCursor<T>(cursor: DataCursor): DataSource<T>;

    as<K extends string & keyof Children, Children>(
        this: DataSource<DataUnionChildren<Children>>,
        type: K
    ): DataSource<Children[K]> {

        return this.withCursor({
            ...this.cursor,
            type
        })
    }


    of<K extends keyof Required<T>>(
        propertyName: string & K, value: DataKeyInput<T[K]>): DataSource<T> {
        return this.withCursor(
            DataCursor.of(this.cursor, propertyName, DataKey(value))
        )
    }

    at<K extends RelationKeys<T>>(
        propertyName: string & K,
        key: DataKeyInput<ArrayTypeOrObject<T[K]>>
    ):
        DataSource<ArrayTypeOrObject<Required<T>[K]>> {
        return this.withCursor(
            DataCursor.at(this.cursor, propertyName, DataKey(key))
        )
    }

    skip(count: number): DataSource<T> {
        return this.withCursor({...this.cursor, skip: count})
    }

    take(count: number): DataSource<T> {
        return this.withCursor({...this.cursor, take: count})
    }


    order(orders: DataOrder<T>[]): DataSource<T>
    order(by: DataExp<T>, sort: DataSort, nulls?: DataNullsSort): DataSource<T>
    order(expOrOrders, sort?, nulls?) {
        if (typeof sort === "string")
            return this.withCursor({
                ...this.cursor, order: [
                    ...this.cursor.order,
                    {by: expOrOrders, sort: <DataSort>sort, nulls}
                ]
            })
        return this.withCursor({...this.cursor, order: expOrOrders})
    }


    select<T, S extends DataSelection<T>>(
        this: DataSource<T>,
        selection: S
    ): DataSource<DataSelectionRow<T, S>> {
        return this.withCursor({
            ...this.cursor,
            selection: DataSelection.merge(
                this.cursor.selection,
                <AnyDataSelection>selection
            )
        })
    }

    pick<T, Fields extends DataFields<T>>(this: DataSource<T>,
                                          fields: Fields):
        DataSource<DataFieldsRow<T, Fields>> {
        return <any>this.select({
            pick: [],
            fields
        })
    }

    addFields<T, Fields extends DataFields<T>>(
        this: DataSource<T>,
        fields: Fields):
        DataSource<T & DataFieldsRow<T, Fields>> {

        return this.withCursor({
            ...this.cursor,
            selection: DataSelection.merge(
                this.cursor.selection,
                {fields}
            )
        })
    }

    filter<T>(this: DataSource<T>, ...exps: DataExp<T>[]): DataSource<T> {
        const filter = DataExp({$and: exps});
        if (typeof filter === "undefined")
            return this;
        return this.withCursor({
            ...this.cursor,
            filter: DataExp(this.cursor.filter, filter)
        })

    }


}


export type DataCursorPath = {
    // TODO: rename to "onwer"
    invert: boolean, propertyName: string, key: string
};



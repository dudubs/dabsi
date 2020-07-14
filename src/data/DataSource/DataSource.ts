import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {ArrayTypeOrObject, ExtractKeys} from "../../common/typings";
import {DataExp} from "../../json-exp/DataExp";
import {DataCursor, RelationMap} from "../DataCursor";
import {DataItem, DataKey, DataKeyInput} from "../DataItem";
import {DataValues} from "./DataValues";

export abstract class DataSource<T> {


    async countAndQuery(): Promise<[number, DataItem<T>[]]> {
        // TODO: Optimizing
        return [
            await this.count(),
            await this.items()
        ]
    }

    // select(DataSelectionOld)

    abstract items(): Promise<DataItem<T>[]>;

    async* find(pageSize = 10): AsyncIterableIterator<DataItem<T>> {
        let source: DataSource<T> = this;
        while (true) {
            const items = await source.items();
            yield* items;
            if (pageSize > items.length)
                break;
            source = source.skip(source.cursor.skip + pageSize);
        }
    }

    abstract count(): Promise<number>;

    abstract has(): Promise<boolean>;

    async getOrFail(key?: string | number): Promise<DataItem<T>> {
        return defined(await this.get(key?.toString()),
            () => `No row "${key}"`);
    }

    async get(key?: string | number): Promise<DataItem<T> | undefined> {
        if (typeof key === "number")
            key = String(key)
        const result = await this
            .filter(typeof key === "string" ? {$is: key} : undefined)
            .take(1)
            .items();
        return result[0]
    }

    // relating
    abstract addAll(keys: string[]): Promise<void>;

    abstract removeAll(keys: string[]): Promise<void>;

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

    add(keyOrKeys: string | string[]): Promise<void> {
        return this.addAll(typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys)
    }

    remove(keyOrKeys: string | string[]): Promise<void> {
        return this.removeAll(typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys)
    }

    // writing

    abstract insert(values: DataValues<T>): Promise<string>;

    abstract update(key: DataKeyInput<T>, values: DataValues<T>): Promise<void>;

    abstract deleteAll(keys: string[]): Promise<void>;

    async insertAndGet(values: DataValues<T> = {}): Promise<DataItem<T>> {
        return await this.getOrFail(await this.insert(values));
    }

    async delete(keyOrKeys?: string | string[]) {
        if (keyOrKeys) {
            return this.deleteAll(typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys)
        }

        const keys: string[] = [];
        for await (let row of this.select([]).find()) {
            keys.push(row.$key);

            if (keys.length > 10) {
                await this.deleteAll(keys);
                keys.length = 0;
            }
        }

        if (keys.length)
            await this.deleteAll(keys);
    }


    // cursoring

    abstract readonly cursor: DataCursor;

    abstract withCursor<T>(cursor: DataCursor): DataSource<T>;


    of<K extends keyof T>(propertyName: string & K, value: DataKeyInput<T[K]>): DataSource<T> {
        return this.withCursor(
            DataCursor.of(this.cursor, propertyName, DataKey(value))
        )
    }

    at<K extends ExtractKeys<Required<T>, object>>(
        propertyName: string & K,
        key: DataKeyInput<ArrayTypeOrObject<T[K]>>
    ):
        DataSource<ArrayTypeOrObject<Required<T>[K]>> {
        return this.withCursor(
            DataCursor.at(this.cursor, propertyName, DataKey(key))
        )
    }


    load(relationMap: RelationMap<T>): DataSource<T> {
        return this.loadOnly({...this.cursor.relationMap, ...relationMap})
    }

    loadOnly(relationMap: RelationMap<T>): DataSource<T> {
        return this.withCursor<T>({
            ...this.cursor,
            relationMap
        })
    }

    skip(count: number): DataSource<T> {
        return this.withCursor({...this.cursor, skip: count})
    }

    take(count: number): DataSource<T> {
        return this.withCursor({...this.cursor, take: count})
    }

    noSort(): DataSource<T> {
        return this.withCursor({...this.cursor, order: []})
    }


    sort(by: DataExp<T>, sort: "ASC" | "DESC", nulls?: "FIRST" | "LAST"): DataSource<T> {
        return this.withCursor({
            ...this.cursor, order:
                [...this.cursor.order, {by, sort, nulls}]
        })
    }


}


export type DataCursorPath = {
    // TODO: rename to "onwer"
    invert: boolean, propertyName: string, key: string
};

import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {ArrayTypeOrObject, ExtractKeys} from "../../common/typings";
import {JSONExp} from "../../json-exp/JSONExp";
import {DataCursor, DataLoadMap} from "../DataCursor";
import {DataItem} from "../DataItem";
import {DataFindOptions, DataQuery, DataQueryResult} from "../DataQuery";

export type DataValues<T> = Partial<T>;


export abstract class DataSource<T> {

    abstract withCursor<T>(cursor: DataCursor): DataSource<T>;

    async getOrFail(key?: string): Promise<T> {
        return defined(await this.get(key), () => `No row "${key}"`);
    }

    async get(key?: string): Promise<T | undefined> {
        const result = await this.query({
            filter: typeof key === "string" ? {$is: key} : undefined,
            count: false,
            take: 1
        });
        return result.items[0]?.row
    }

    // query QueryProps => QueryResult

    async insertItem(values: DataValues<T> = {}): Promise<DataItem<T>> {
        return await this.getItemOrFail(await this.insert(values));
    }

    abstract query(query?: DataQuery<T>): Promise<DataQueryResult<T>>;

    abstract insert(values: DataValues<T>): Promise<string>;

    abstract update(key: string, values: DataValues<T>): Promise<void>;

    abstract addAll(keys: string[]): Promise<void>;

    abstract find(options?: DataFindOptions<T>): AsyncIterableIterator<DataItem<T>>;

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

    abstract deleteAll(keys: string[]): Promise<void>;

    delete(keyOrKeys: string | string[]) {
        return this.deleteAll(typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys)
    }

    abstract count(filter?: JSONExp<T>): Promise<number>;

    abstract has(filter?: JSONExp<T>): Promise<boolean>;

    async getItem(key?: string): Promise<DataItem<T> | undefined> {
        if (typeof key === "string")
            return {
                key, row: await this.getOrFail(key),
            }
        return (await this.query()).items[0]
    }

    async getItemOrFail(key?: string): Promise<DataItem<T>> {
        return defined(await this.getItem(key), 'No item')
    }

    abstract readonly cursor: DataCursor;

    of<U>(propertyName: string & ExtractKeys<Required<T>, object>, value: string): DataSource<T> {
        return this.withCursor(
            DataCursor.of(this.cursor, propertyName, value)
        )
    }

    at<K extends ExtractKeys<Required<T>, object>>(propertyName: string & K, key: string):
        DataSource<ArrayTypeOrObject<Required<T>[K]>> {
        return this.withCursor(
            DataCursor.at(this.cursor, propertyName, key)
        )
    }


    load(loadMap: DataLoadMap<T>): DataSource<T> {
        return this.loadOnly({...this.cursor.loadMap, ...loadMap})
    }

    loadOnly(loadMap: DataLoadMap<T>): DataSource<T> {
        return this.withCursor<T>({
            ...this.cursor,
            loadMap
        })
    }
}


export type DataCursorPath = {
    // TODO: rename to "onwer"
    invert: boolean, propertyName: string, key: string
};

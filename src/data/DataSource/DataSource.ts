import {defined} from "../../common/object/defined";
import {entries} from "../../common/object/entries";
import {ArrayTypeOrObject, KeysByValue} from "../../common/typings";
import {JSONExp} from "../../json-exp/JSONExp";
import {DataCursor} from "../DataCursor";
import {DataFields} from "../DataFields";
import {DataItem} from "../DataItem";
import {DataQuery, DataQueryResult} from "../DataQuery";

export type DataValues<T> = Partial<T>;


export abstract class DataSource<T> {

    abstract withCursor<T>(cursor: DataCursor): DataSource<T>;

    async get(key?: string): Promise<T> {
        const result = await this.query({
            filter: typeof key === "string" ? {$key: key} : undefined,
            count: false,
            take: 1
        });
        return defined(result.items[0], () => `No data key "${key}".`).row
    }

    // query QueryProps => QueryResult

    abstract query(query?: DataQuery<T>): Promise<DataQueryResult<T>>;

    abstract insert(values: DataValues<T>): Promise<string>;

    abstract update(key: string, values: DataValues<T>): Promise<void>;

    protected abstract addAll(keys: string[]): Promise<void>;

    protected abstract removeAll(keys: string[]): Promise<void>;

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

    protected abstract deleteAll(keys: string[]): Promise<void>;

    delete(keyOrKeys: string | string[]) {
        return this.deleteAll(typeof keyOrKeys === "string" ? [keyOrKeys] : keyOrKeys)
    }

    abstract count(filter?: JSONExp<T>): Promise<number>;

    abstract has(filter?: JSONExp<T>): Promise<boolean>;

    getFields(): DataFields<T> {
        const fields: DataFields<T> = {
            ...this.getDefaultFields(),
            ...<any>this.cursor.fields
        };
        for (let key of this.cursor.exclude) {
            delete fields[key];
        }
        return fields;
    }

    async getItem(key?: string): Promise<DataItem<T>> {
        if (typeof key === "string")
            return {key, row: await this.get(key)}
        return defined((await this.query()).items[0],'No item')
    }

    abstract readonly cursor: DataCursor;

    of<U>(name: string & KeysByValue<T, object>, value: string): DataSource<T> {
        return this.withCursor(this.cursor.of(name, value))
    }

    at<K extends KeysByValue<T, object>>(name: string & K, value: string):
        DataSource<ArrayTypeOrObject<T[K]>> {
        return this.withCursor(this.cursor.at(name, value))
    }

    abstract getDefaultFields(): DataFields<T>;


}


export type DataPathItem = { owner: boolean, propertyName: string, key: string };
export type DataPath = DataPathItem[];

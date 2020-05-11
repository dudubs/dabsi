import {defined} from "../common/object/defined";
import {ArrayTypeOrObject, KeysByValue} from "../common/typings";
import {JSONExp} from "../json-exp/JSONExp";
import {DataFields, DataRow} from "./DataFields";
import {DataItem} from "./DataItem";
import {DataQuery, DataQueryResult} from "./DataQuery";
import {DataCursor} from "./DataSource/DataCursor";

export type DataValues<T> = Partial<T>;


export abstract class DataSource<T> {

    abstract withCursor<T>(cursor: DataCursor): DataSource<T>;

    abstract delete(key: string): Promise<void>;

    async get<Fields extends DataFields<T>>(key: string, fields: Fields): Promise<DataRow<T, Fields>> {
        const result = await this.query({
            keys: [key],
            fields,
            count: false
        });
        return defined(result.items[0], () => `No data key "${key}".`).row
    }

    // query QueryProps => QueryResult

    abstract query<Fields extends DataFields<T>>(query: DataQuery<T, Fields>): Promise<DataQueryResult<T, Fields>>;

    abstract insert(values: DataValues<T>): Promise<string>;

    abstract update(key: string, values: DataValues<T>): Promise<void>;

    abstract add(key: string): Promise<void>;

    abstract remove(key: string): Promise<void>;

    async removeAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.remove(key);
        }
    }

    async deleteAll(keys: string[]): Promise<void> {
        for (let key of keys) {
            await this.delete(key);
        }
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

    async getItem(key: string): Promise<DataItem<T>> {
        const fields: DataFields<T> = {...this.getDefaultFields(), ...<any>this.cursor.fields};
        for (let key of this.cursor.exclude) {
            delete fields[key];
        }
        return {
            key, row: <any>await this.get(key, this.getFields())
        }
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


export type DataPathItem = { type: "AT" | "OF", name: string, value: string };
export type DataPath = DataPathItem[];

import {Lazy} from "../../common/patterns/lazy";
import {ArrayTypeOrObject, KeysByValue} from "../../common/typings";
import {JSONExp} from "../../json-exp/JSONExp";
import {DataFields, DataRow} from "../DataFields";
import {DataItem} from "../DataItem";
import {DataQuery, DataQueryResult} from "../DataQuery";

export type DataValues<T> = Partial<T>;


export abstract class DataSource<T> {

    abstract delete(key: string): Promise<void>;

    abstract get<Fields extends DataFields<T>>(key: string, fields: Fields): Promise<DataRow<T, Fields>>;

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

    abstract find<Fields extends DataFields<T>>(query: DataQuery<T, Fields>): Promise<DataQueryResult<T, Fields>>;

    abstract count(filter?: JSONExp<T>): Promise<number>;

    abstract has(filter?: JSONExp<T>): Promise<boolean>;

    async getItem(key: string): Promise<DataItem<T>> {


        return {
            key, row: <any>await this.get(key,
                <any>this.cursor?.selections ?? this.getDefaultSelections())
        }
    }

    protected withPath(path: DataPathItem) {
        return this.withCursor({
            ...this.cursor,
            selections: undefined,
            fields: undefined,
            path: [...this.cursor?.path ?? [], path]
        })
    }

    of<U>(name: string & KeysByValue<T, object>, value: string): DataSource<T> {
        return this.withPath({type: "OF", name, value})
    }

    at<K extends KeysByValue<T, object>>(name: string & K, value: string):
        DataSource<ArrayTypeOrObject<T[K]>> {
        return this.withPath({type: "AT", name, value})
    }


    abstract cursor?: DataSourceCursor;

    protected abstract withCursor<T = any>(cursor: DataSourceCursor): DataSource<T>;

    select<Fields extends DataFields<T>>(fields: Fields): DataSource<DataRow<T, Fields>> {
        return this.withCursor({
            ...this.cursor,
            fields: {...this.cursor?.fields, ...fields},
            selections: Object.keys(fields)
        })
    }

    abstract getDefaultSelections(): DataFields<T>;

    @Lazy() get selections(): DataFields<T> {
        const {selections, fields} = this.cursor ?? {};
        if (!(fields && selections))
            return this.getDefaultSelections();
        return <any>selections.toObject(key => [key, fields[key] ?? key])
    }


}

export type DataSourceCursor = {
    path?: DataPathItem[],
    fields?: DataFields<any>,
    selections?: string[]
};

export type DataPathItem = { type: "AT" | "OF", name: string, value: string };



/*
    DataSourceHandler(Users, {
        fields: {...},
        writable: [],
        readable: [""],
        relations: {
            groups: {
                allow:...
                relations: ....
            }
        }
    })


    .server
 */

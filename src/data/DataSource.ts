import {mergeObject} from "../common/object/mergeObject";
import {ArrayTypeOrObject, KeysByValue} from "../common/typings";
import {JSONExp} from "../json-exp/JSONExp";
import {DataFields, DataRow} from "./DataFields";
import {DataQuery, DataQueryResult} from "./DataQuery";

export type DataValues<T> = Partial<T>;

export abstract class DataSource<T> {

    abstract delete(key: string): Promise<void>;

    abstract get<Fields extends DataFields<T>>(key: string, fields: Fields): Promise<DataRow<T, Fields>>;

    abstract insert(values: DataValues<T>): Promise<string>;

    abstract update(key: string, values: DataValues<T>): Promise<void>;

    abstract add(key: string): Promise<void>;

    abstract remove(key: string): Promise<void>;

    abstract find<Fields extends DataFields<T>>(query: DataQuery<T, Fields>): Promise<DataQueryResult<T, Fields>>;

    abstract count(filter?: JSONExp<T>): Promise<number>;

    of<U>(name: string & KeysByValue<T, object>, value: string): DataSource<T> {
        return mergeObject(this, {
            path: [{
                type: "OF", name, value
            }]
        })
    }

    at<K extends KeysByValue<T, object>>(name: string & K, value: string):
        DataSource<ArrayTypeOrObject<T[K]>> {
        return <any>mergeObject(this, {
            path: [{
                type: "AT", name, value
            }]
        })
    }

    path: Array<DataPathKey> = [];


}

export type DataPathKey = { type: "AT" | "OF", name: string, value: string };



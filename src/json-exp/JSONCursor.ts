import {mergeObject} from "../common/object/mergeObject";
import {Awaitable} from "../common/typings";
import {DataExp} from "./DataExp";


/*


 */

export abstract class JSONCursor<T> {

    loaders = Array<(row: T, raw: object) => Awaitable>();

    fields: Record<string, DataExp<T>> = {};

    order = Array<[DataExp<T>, boolean]>();

    filters = Array<DataExp<T>>();

    offset: number = 0;

    limit: number = 0;

    select<K extends string>(key: K, exp: DataExp<T>): JSONCursor<T & Record<K, string>>;

    select<K extends string, U>(key: K, exp: DataExp<T>,
                                loader: (raw: string) => Awaitable<U>): JSONCursor<T & Record<K, U>>;

    select(key, exp, loader?) {
        return <any>mergeObject(this, {
            fields: {[key]: exp},
            loaders: [async (row, raw) => {
                row[key] = loader ? await loader(raw[key]) : raw[key];
            }]
        })
    }

    filter(exp: DataExp<T>): this {
        return mergeObject(this, {
            filters: [exp]
        })
    }

    sort(exp: DataExp<T>, reverse = false): this {
        return mergeObject(this, {
            order: [[exp, reverse]]
        })
    }

    load<U = {}>(loader: (row: T, raw: object) => Awaitable<U>): JSONCursor<T & U> {
        return <any>mergeObject(this, {loaders: [loader]})
    }

    take(count): this {
        return mergeObject(this, {limit: count})
    }

    skip(count) {
        return mergeObject(this, {skip: count})
    }


}


import {mergeObject} from "../common/object/mergeObject";
import {Awaitable} from "../common/typings";
import {JSONExp} from "./JSONExp";


/*


 */

export abstract class JSONCursor<T> {

    loaders = Array<(row: T, raw: object) => Awaitable>();

    fields: Record<string, JSONExp<T>> = {};

    order = Array<[JSONExp<T>, boolean]>();

    filters = Array<JSONExp<T>>();

    offset: number = 0;

    limit: number = 0;

    select<K extends string>(key: K, exp: JSONExp<T>): JSONCursor<T & Record<K, string>>;

    select<K extends string, U>(key: K, exp: JSONExp<T>,
                                loader: (raw: string) => Awaitable<U>): JSONCursor<T & Record<K, U>>;

    select(key, exp, loader?) {
        return <any>mergeObject(this, {
            fields: {[key]: exp},
            loaders: [async (row, raw) => {
                row[key] = loader ? await loader(raw[key]) : raw[key];
            }]
        })
    }

    filter(exp: JSONExp<T>): this {
        return mergeObject(this, {
            filters: [exp]
        })
    }

    sort(exp: JSONExp<T>, reverse = false): this {
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


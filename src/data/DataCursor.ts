import {isEmptyObject} from "../common/object/isEmptyObject";
import {mapObject} from "../common/object/mapObject";
import {ArrayTypeOrObject, ExtractKeys} from "../common/typings";
import {JSONExp, JSONFieldKey} from "../json-exp/JSONExp";
import {DataFields, DataRow} from "./DataFields";
import {JSONExpMapper} from "./DataSource/JSONExpMapper";

export class DataCursorTranslator extends JSONExpMapper<any> {
    constructor(public fields: DataFields<any>) {
        super();
    }

    translateFieldExp(key: JSONFieldKey<any>): JSONExp<any> {
        if (key in this.fields) {
            if (typeof this.fields[key] !== "string") {
                return this.translate(this.fields[key])
            }
        }
        return super.translateFieldExp(key);
    }
}

export type DataLoadMapValue<T> = boolean | DataLoadMap<T>;

export type DataLoadMap<T> = {
    [K in ExtractKeys<Required<T>, object>]?:
    DataLoadMapValue<T[K]>
};

/*

    owner relation
    keys relation

    children
 */

export class DataCursorOwner<T = any> {
    constructor(
        public childKeys: Record<string, string>,
        public filter: JSONExp<T>,
        public propertyName: string,
        public key: string
    ) {
    }
}

export class DataCursor<T = any> {

    fields: DataFields<any> = {};

    filter: JSONExp<any>;

    exclude: string[] = [];

    excludeAll = false;

    childKeys: Record<string, string> = {};

    loadMap: DataLoadMap<any> = {};

    constructor(
        public owners: DataCursorOwner[]
    ) {
    }
}

export namespace DataCursor {
    export function create<T>(): DataCursor<T> {
        return new DataCursor<T>([]);
    }

    export function filter<T>(cursor: DataCursor<T>, exps: JSONExp<T>[]): DataCursor<T> {
        return {
            ...cursor, filter: JSONExp({
                $and: [cursor.filter, {$and: exps}]
            })
        }
    }

    export function at<T, K extends keyof T>(cursor: DataCursor<T>,
                                             propertyName: string & K,
                                             key: string): DataCursor<ArrayTypeOrObject<T[K]>> {
        const cursorAt = new DataCursor([
            ...cursor.owners,
            new DataCursorOwner(
                cursor.childKeys,
                cursor.filter,
                propertyName,
                key)
        ]);


        if (typeof cursor.loadMap === "object") {
            const loadMapAt = cursorAt.loadMap[propertyName];
            if (typeof loadMapAt === "object") {
                cursorAt.loadMap = loadMapAt;
            }

        }
        return cursorAt;
    }

    export function of<T, K extends keyof T>(cursor: DataCursor<T>,
                                             propertyName: string & K,
                                             key: string): DataCursor<T> {
        return {
            ...cursor,
            childKeys: {...cursor.childKeys, [propertyName]: key}
        }
    }

    export function translate<T>(cursor: DataCursor<T>,
                                 exp: JSONExp<T>): JSONExp<T> {
        return <any>new DataCursorTranslator(<any>cursor.fields).translate(exp)
    }

    export function translateFields<T>(cursor: DataCursor<T>,
                                       fields: DataFields<T>): DataFields<T> {
        const translator = new DataCursorTranslator(cursor.fields);
        return <any>mapObject(fields, exp => translator.translate(exp))
    }

    export function extend<T, Fields extends DataFields<T>>(
        cursor: DataCursor<T>,
        fields: Fields): DataCursor<T & DataRow<T, Fields>> {


        return {
            ...cursor, fields: {
                ...cursor.fields,
                ...translateFields(cursor, fields)
            }
        }
    }


    export function pick<T, K extends keyof T>(
        cursor: DataCursor<T>,
        keys: (string & K)[]): DataCursor<Pick<T, K>> {
        return {

            ...cursor,
            excludeAll: true,
            fields: keys.toObject(key => [key,
                cursor.fields[key] ?? key
            ])
        }
    }


    export function omit<T, K extends keyof T>(cursor: DataCursor<T>,
                                               keys: (string & K)[]):
        DataCursor<Omit<T, K>> {
        const fields = {...cursor.fields};
        const exclude = new Set<string>();
        for (let key of keys) {
            if (key in cursor.fields) {
                delete fields[key];
            } else {
                exclude.add(key);
            }
        }
        return {
            ...cursor,
            fields, exclude: [...exclude]
        }
    }

    export function concat(left: DataCursor, right: DataCursor): DataCursor {
        if (right.owners.length) {
            return {
                ...right,
                owners: [...left.owners,
                    ...right.owners
                ]
            }
        }
        return {
            owners: left.owners,
            fields: right.fields,
            exclude: right.exclude,
            excludeAll: right.excludeAll,
            loadMap: isEmptyObject(right.loadMap) ?
                left.loadMap : right.loadMap, // merge
            childKeys: {...right.childKeys, ...left.childKeys},
            filter: JSONExp(left.filter, right.filter)
        }
    }
}

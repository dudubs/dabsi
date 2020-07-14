import {isEmptyObject} from "../common/object/isEmptyObject";
import {mapObject} from "../common/object/mapObject";
import {ArrayTypeOrObject, ExtractKeys} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataFields, DataRow} from "./DataFields";
import {DataFieldsTranslator} from "./DataFieldsTranslator";
import {DataOrder} from "./DataOrder";

export type DataLoadMapValue<T> = boolean | RelationMap<T>;

export type RelationMap<T> = {
    [K in ExtractKeys<Required<T>, object>]?:
    DataLoadMapValue<T[K]>
};

export type DataCursorOwner<T = any> = {

    constants: Record<string, string>,

    filter: DataExp<T>,
    propertyName: string,
    key: string
};


export const EmptyDataCursor: DataCursor<any> = {

    // selection
    fields: {},
    exclude: [],
    excludeAll: false,
    relationMap: {}, // -

    // + relations
    // +


    // position
    owners: [],

    //

    // constants
    constants: {},
    filter: undefined,


    // querying
    skip: 0,
    take: 0,
    order: []
};

// TODO: change to type, EmptyDataCursor const.
export type DataCursor<T = any> = {

    // selection: DataSelectionOld


    fields: DataFields<any>;

    // selection
    exclude: string[];

    excludeAll: boolean;

    // TODO: rename
    constants: Record<string, string>;

    filter: DataExp<any>;

    relationMap: RelationMap<any>;

    // cur
    skip: number;
    take: number;

    order: DataOrder<T>[];


    owners: DataCursorOwner[];

}

export namespace DataCursor {


    export function at<T, K extends keyof T>(cursor: DataCursor<T>,
                                             propertyName: string & K,
                                             key: string): DataCursor<ArrayTypeOrObject<T[K]>> {
        const cursorAt: DataCursor = {
            ...EmptyDataCursor,
            owners: [...cursor.owners,
                {
                    filter: cursor.filter,
                    constants: cursor.constants,
                    propertyName,
                    key
                }],
        };

        if (typeof cursor.relationMap === "object") {
            const relationMapAt = cursorAt.relationMap[propertyName];
            if (typeof relationMapAt === "object") {
                cursorAt.relationMap = relationMapAt;
            }

        }
        return cursorAt;
    }

    export function of<T, K extends keyof T>(cursor: DataCursor<T>,
                                             propertyName: string & K,
                                             key: string): DataCursor<T> {
        return {
            ...cursor,
            constants: {...cursor.constants, [propertyName]: key}
        }
    }

    export function translate<T>(cursor: DataCursor<T>,
                                 exp: DataExp<T>): DataExp<T> {
        return <any>new DataFieldsTranslator(<any>cursor.fields).translate(exp)
    }

    export function translateFields<T>(cursor: DataCursor<T>,
                                       fields: DataFields<T>): DataFields<T> {
        const translator = new DataFieldsTranslator(cursor.fields);
        return <any>mapObject(fields, exp => {
            return translator.translate(exp);
        })
    }

    export function extend<T, Fields extends DataFields<T>>(
        cursor: DataCursor<T>,
        fields: Fields): DataCursor<T & DataRow<T, Fields>> {


        return {
            ...cursor, fields: {
                ...cursor.fields,
                ...translateFields(cursor, fields)
            },
            order: []
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
            ]),
            order: []
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
            fields,
            exclude: [...exclude],
            order: []
        }
    }

    export function concat(left: DataCursor, right: DataCursor): DataCursor {
        if (right.owners.length) {
            return {
                ...right,
                owners: [...left.owners,
                    ...right.owners
                ],
            }
        }
        return {
            owners: left.owners,
            fields: right.fields,
            exclude: right.exclude,
            excludeAll: right.excludeAll,
            relationMap: isEmptyObject(right.relationMap) ?
                left.relationMap : right.relationMap, // merge
            constants: {...right.constants, ...left.constants},
            filter: DataExp(left.filter, right.filter),
            skip: right.skip,
            take: right.take,
            order: right.order
        }
    }

}

import {ArrayTypeOrObject, ExtractKeys} from "../common/typings";
import {DataExp} from "../json-exp/DataExp";
import {DataOrder} from "./DataOrder";
import {DataSelection} from "./DataSelection";

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


export const EmptyDataCursor: DataCursor = {
    selection: {},
    owners: [],
    constants: {},
    filter: undefined,
    skip: 0,
    take: 0,
    order: [],
    type: null
};

// TODO: change to type, EmptyDataCursor const.
export type DataCursor<T = any> = {

    type: string | null;

    filter: DataExp<any>;
    constants: Record<string, string>;

    selection: DataSelection<T>;

    // range
    skip: number;
    take: number;

    order: DataOrder<T>[];

    owners: DataCursorOwner[];

}

export namespace DataCursor {


    export function at<T, K extends keyof T>(cursor: DataCursor<T>,
                                             propertyName: string & K,
                                             key: string):
        DataCursor<ArrayTypeOrObject<T[K]>> {
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

        const relationSelection = cursor.selection.relations?.[<any>propertyName];
        if (relationSelection && (typeof relationSelection === "object")) {
            cursorAt.selection = <DataSelection.RelationToOne<any>>relationSelection;
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
            constants: {...right.constants, ...left.constants},
            filter: DataExp(left.filter, right.filter),
            selection: right.selection,
            skip: right.skip,
            take: right.take,
            order: right.order,
            type: null

            // old
            // fields: right.fields,
            // exclude: right.exclude,
            // excludeAll: right.excludeAll,
            // relationMap: isEmptyObject(right.relationMap) ?
            //     left.relationMap : right.relationMap, // merge
        }
    }


}

/*

    merge(o, {
        asd: ""

    })
 */


import {entries} from "./entries";

type Merger<T> = (value: T) => T;

export type KeyToValueOrReducer<T> = {
    [K in keyof T]:

    Merger<T[K]> | T[K]
};

export type ObjectMerger<T> =
    <R extends {
        [K in keyof T]: T[K] extends Merger<infer U> ? U :
            Exclude<T[K], (...args) => any>
    }, K extends keyof R>(value: Pick<R, K>) => R;

export function merger<T extends Record<string, any>>(
    props: T
): ObjectMerger<T> {
    return function (this:any,obj?: any): any {
        return merge(obj ?? this, props)
    }
}


export function merge<T, K extends keyof T>(
    obj: T,
    props: Pick<KeyToValueOrReducer<T>, K>
): T {

    const proto = obj && Object.getPrototypeOf(obj)
    obj = {...obj}
    for (const [key, merger] of entries(props)) {
        if (typeof merger === "function") {
            obj[key] = merger(obj[key])
        } else {
            obj[key] = merger;
        }
    }
    return proto ? Object.setPrototypeOf(obj, proto) : obj;
}

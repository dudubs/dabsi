import {entries} from "./entries";

export type ObjectMerger<T> = <U extends T>(obj: U, ...args: (Partial<U> | undefined)[]) => U;

function _mergersMerger(mergers: Record<any, Merger<any>>) {
    return Merger((left: any, right) => {
        if (!(left && right)) return left || right;
        const merged = {...left, ...right};
        for (let [key, rightValue] of entries(right)) {
            const merger = mergers[key];
            if (merger) {
                merged[key] = merger(left[key], rightValue);
            }
        }
        return merged;
    })
}

export type DefaultMerger<T> = (obj: T, props: Partial<T> | undefined) => T;

function _defaultMerger<T>(merge: DefaultMerger<T>): ObjectMerger<T> {
    return (obj: any, ...args) => {
        for (let props of args) {
            obj = merge(obj, props);
        }
        return obj;
    }
}

export type ObjectMergers<T> = { [K in keyof T]?: Merger<T[K]> };

export function ObjectMerger<T>(merge: DefaultMerger<T>): ObjectMerger<T>
export function ObjectMerger<T>(mergers: ObjectMergers<T>): ObjectMerger<T>
export function ObjectMerger(mergeOrMergers) {
    if (typeof mergeOrMergers === "function") {
        return _defaultMerger(mergeOrMergers);
    } else {
        return _mergersMerger(mergeOrMergers);
    }

}



export type Merger<T> = (...args: T[]) => T;

export function Merger<T>(merge: (left: T, right: T) => T) {
    return (left, ...args) => {
        for (let right of args) {
            left = merge(left, right);
        }
        return left;
    }
}

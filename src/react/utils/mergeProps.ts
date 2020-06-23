import {Ref} from "react";
import {entries} from "../../common/object/entries";
import {setRef} from "./setRef";


export const $merge = "$merge";
export const $override = "$override";


export type PropMerger<T> =
    Record<typeof $merge, (value: T) => T> | Record<typeof $override, T>;

export function PropMerger<T>(merger: (value: T) => T): PropMerger<T> {
    return {[$merge]: merger}
}

export type RefOrCallback = Ref<any> | ((...args: any[]) => void);

function mergeCallbacks(prevCallback: Function, nextCallback: Function) {
    return function () {
        const prevResult = prevCallback.apply(this, arguments);
        return nextCallback.apply(this, arguments) ??
            prevResult;
    }
}

function mergeRefs(prevRef, nextRef) {
    return current => {
        setRef(prevRef, current);
        setRef(nextRef, current)
    }
}

export function mergeProp(prevValue, nextValue) {


    const nextType = typeof nextValue;

    if (nextType === "object") {

        const merger = nextValue?.[$merge];
        if (typeof merger === "function") {
            return merger.call(nextValue, prevValue)
        }
        if ($override in nextValue) {
            return nextValue[$override];
        }
    }
    const prevType = typeof prevValue;

    if ((prevType === "undefined") ||
        (nextType === "undefined")) {
        return prevValue ?? nextValue;
    }

    if (isRefObject(prevValue) || isRefObject(nextValue)) {
        return mergeRefs(prevValue, nextValue);
    }

    if (prevType === nextType) {
        switch (prevType) {
            case "string":
                return `${prevValue} ${nextValue}`;
            case "function":
                return mergeCallbacks(prevValue, nextValue);
            case "object":
                return mergeProps(prevValue, nextValue)
        }
    }

    return nextValue;

}

export type NextProp<T> =
    Exclude<T, PropMerger<any>>
    | PropMerger<T>
    | (T extends object ? NextProps<T> : never);

export type NextProps<P> = {
    [K in keyof Required<P>]?: NextProp<P[K]>
}

/*

 */

export function mergeProps<P,
    E extends NextProps<P>>(
    prevProps: P | undefined,
    nextProps: E,
): P & E {

    let _props = {...prevProps};


    for (let [key, nextValue] of entries(nextProps)) {
        _props[key] = mergeProp(
            _props[key],
            nextValue
        )
    }

    return _props as any;
}


export function isRefObject(o): o is React.RefObject<any> {
    return o && (typeof o === "object") && ("current" in o)
}

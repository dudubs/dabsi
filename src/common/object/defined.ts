import {Nullable} from "../typings";

export function defined<T>(value: T, errorOrCallback?): NonNullable<T> {
    if (value == null)
        throw new Error(
            typeof errorOrCallback === "function" ? errorOrCallback() :
                errorOrCallback);
    // @ts-ignore
    return value;
}


export function definedAt<T, K extends keyof T>(obj: T, key: K): NonNullable<T[K]> {
    return defined(obj[key], () => `No ${key}`)
}

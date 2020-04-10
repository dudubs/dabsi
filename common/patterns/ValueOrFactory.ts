import {ObjectFactory} from "./ObjectFactory";

export type ValueOrFactory<T> = T | ObjectFactory<T>;

export function ValueOrFactory<T>(valueOrFactory: ValueOrFactory<T>): T {
    if (typeof valueOrFactory === "function")
        return ObjectFactory(<ObjectFactory<T>>valueOrFactory);
    return valueOrFactory;
}

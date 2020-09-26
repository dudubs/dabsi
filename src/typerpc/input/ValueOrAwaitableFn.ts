import {Awaitable} from "../../common/typings";

export type ValueOrAwaitableFn<T> = T | (() => Awaitable<T>);

export async function ValueOrAwaitableFn<T>(value: ValueOrAwaitableFn<T>): Promise<T> {
    if (typeof value === "function") {
        return (<any>value)();
    }
    return value;
}
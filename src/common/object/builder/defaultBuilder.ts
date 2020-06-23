import {Builder} from "../buildObject";

export function defaultBuilder<T>(
    defaultValue: T
): Builder<T | undefined> {
    return value => value ?? defaultValue;
}

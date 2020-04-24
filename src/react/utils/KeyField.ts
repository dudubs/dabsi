import {ReactElement} from "react";
import {KeysByValue} from "../../common/typings";
import {withDefaultKey} from "./withDefaultKey";

export type KeyField<T> = KeysByValue<T, string> |
    ((item: T) => string);

export function KeyField2<T>(keyField: KeyField<T>): (item: T) => string {
    if (typeof keyField === "function")
        return keyField;
    if (typeof keyField === "string")
        return item => String(item[keyField]);
    throw new Error();
}


export function KeyField<T>(
    keyField: KeyField<T>,
    item: T
) {
    switch (typeof keyField) {
        case "string":
            return item[keyField];
        case "function":
            return keyField(item);
        default:
            throw new TypeError('Invalid KeyField.');
    }
}

export function withDefaultKeyField<T>(keyField: KeyField<T>,
                                       item: T,
                                       element: ReactElement) {
    return withDefaultKey(KeyField(keyField, item), element)
}

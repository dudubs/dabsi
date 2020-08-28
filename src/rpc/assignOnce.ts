import {entries} from "../common/object/entries";
import {AssignKeys} from "../common/typings";

export function assignOnce<T extends object, U extends object | null>(
    source: U,
    target: T,):  AssignKeys<T, U> {
    for (const [key, value] of entries(source)) {
        if (target.hasOwnProperty(key))
            throw new Error(`Can't assign ${key}`)
        target[key] = value;
    }
    return <any>target;
}

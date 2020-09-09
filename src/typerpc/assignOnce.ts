import {entries} from "../common/object/entries";
import {AssignKeys} from "../common/typings";

export function assignOnce<T extends object, U extends object | null>(

    target: T,
    source: U,):  AssignKeys<T, U> {
    for (const [key, value] of entries(source)) {
        if (target.hasOwnProperty(key))
            throw new Error(`Can't assign ${key}`)
        target[key] = value;
    }
    return <any>target;
}

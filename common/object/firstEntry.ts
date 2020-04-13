import {firstKey} from "./firstKey";

export function firstEntry(obj: object): [string, any] | undefined {
    const key = firstKey(obj);
    if (key !== undefined)
        return [key, obj[key]]
}


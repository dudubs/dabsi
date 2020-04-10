import {firstKey} from "./firstKey";

export function firstEntry(obj: object) {
    const key = firstKey(obj);
    if (key !== undefined)
        return [key, obj[key]]
}

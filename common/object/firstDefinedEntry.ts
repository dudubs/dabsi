import {defined} from "./defined";
import {firstEntry} from "./firstEntry";

export function firstDefinedEntry(obj): [string, any] {
    // @ts-ignore
    return defined(firstEntry(obj), `No entry for objectl`)
}

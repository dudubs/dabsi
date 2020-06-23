import {defined} from "./defined";
import {firstEntry} from "./firstEntry";

export function firstDefinedEntry(obj): [string, any] {
    return defined(firstEntry(obj), `No entry for ${obj}`)
}

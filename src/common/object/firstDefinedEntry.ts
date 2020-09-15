import {defined} from "./defined";
import {firstEntry} from "./firstEntry";

export function firstDefinedEntry<T=any>(obj:Record<string, T>): [string, T] {
    const entry = firstEntry(obj);
    return defined(entry.length?entry:undefined, `No entry for ${obj}`)
}

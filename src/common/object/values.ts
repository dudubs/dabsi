import {keys} from "./keys";

export function* values<T>(obj: Record<any, T>): IterableIterator<T> {
    for (const key of keys(obj)) {
        yield obj[key]
    }
}

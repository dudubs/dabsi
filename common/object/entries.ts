import {keys} from "./keys";

export function* entries<V>(obj:Record<string, V>): IterableIterator<[string, V]> {
    for (const key of keys(obj)) {
        // @ts-ignore
        yield [key, obj[key]]
    }
}

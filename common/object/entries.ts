import {keys} from "./keys";

export function* entries<V>(obj:Record<any, V>): IterableIterator<[string, V]> {
    for (const key in keys(obj)) {
        // @ts-ignore
        yield [key, obj[key]]
    }
}

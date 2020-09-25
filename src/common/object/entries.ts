import {keys} from "./keys";

export function* entries<V = any>(obj: Record<string, V> | undefined | null): IterableIterator<[string, V,number]> {
    let index=0;
    for (const key of keys(obj)) {
        // @ts-ignore
        yield [key, obj[key],index++]
    }
}

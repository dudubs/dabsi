export function* keys<K extends PropertyKey = string>(obj: Record<K, any> | undefined | null): IterableIterator<K> {
    if (obj) for (const key in obj) {
        if (typeof key !== "string")
            continue;
        if (obj.hasOwnProperty(key)) {
            yield key
        }
    }
}



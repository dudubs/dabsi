export function mapObject<T, R>(
    obj: Record<any, T>, mapper: (
        value: T,
        key: string
    ) => R
): Record<any, R> {
    const out = {};
    for (const key in obj) {
        if(typeof key!=="string")
            continue;
        if ((<object>obj).hasOwnProperty(key))
            out[key] = mapper(obj[key], key);
    }
    return out;
}



export function mapObject<T, R>(
    obj: Record<any, T>, mapper: (
        value: T,
        key: PropertyKey
    ) => R
): Record<any, R> {
    const out = {};
    for (const key in obj) {
        if ((<object>obj).hasOwnProperty(key))
            out[key] = mapper(obj[key], key);
    }
    return out;
}



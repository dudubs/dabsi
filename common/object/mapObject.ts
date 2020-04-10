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


export function _mapObject<T=any>(
    obj: Record<any, T>|undefined, mapper: (
        value: T,
        key: PropertyKey
    ) => any
): any {
    if (!obj)
        return;
    const out = {};
    for (const key in obj) {
        if ((<object>obj).hasOwnProperty(key))
            out[key] = mapper(obj[key], key);
    }
    return out;
}


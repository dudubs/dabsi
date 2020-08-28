import {entries} from "./entries";

export function mapObject<T, R>(
    obj: Record<any, T>, mapper: (
        value: T,
        key: string
    ) => R | undefined,
): Record<any, R> {
    const result = {};
    for (const [key, value] of entries(obj)) {

        result[key] = mapper(value, key);
    }
    return result;
}



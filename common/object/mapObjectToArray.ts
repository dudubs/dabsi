import {entries} from "./entries";

export function mapObjectToArray<T, U>(
    obj: Record<any, T>, mapper: (value: T, key: string) => U
): U[] {
    const arr: U[] = [];
    for (const [key, value] of entries(obj)) {
        arr.push(mapper(value, key))
    }
    return arr;
}

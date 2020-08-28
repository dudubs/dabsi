import {entries} from "./entries";

export function mapObjectToArray<T, U>(
    obj: Record<any, T>, mapper: (value: T, key: string, index: number) => U,
): U[] {
    let index = 0;
    const arr: U[] = [];
    for (const [key, value] of entries(obj)) {
        if (value !== undefined)
            arr.push(mapper(value, key, index++))
    }
    return arr;
}


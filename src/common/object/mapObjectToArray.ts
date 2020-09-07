import {entries} from "./entries";

export function mapObjectToArray<T, U,K extends string>(
    obj: Record<K, T>, mapper: (value: T, key: string, index: number) => U|undefined,
): U[] {
    let index = 0;
    const arr: U[] = [];
    for (const [key, value] of entries(obj)) {
        const nextValue = mapper(value, key, index++);
        if (nextValue !== undefined)
            arr.push(nextValue)
    }
    return arr;
}


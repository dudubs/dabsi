export async function asyncIterableToArray<T>(
    iterator: AsyncIterable<T>
): Promise<T[]> {
    const array: T[] = [];
    for await (const item of iterator) {
        array.push(item);
    }
    return array;
}



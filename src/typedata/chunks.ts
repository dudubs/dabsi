export async function* chunks<T>(
    iterable: AsyncIterableIterator<T>,
    size: number
): AsyncIterableIterator<T[]> {

    let chunk: T[] = [];

    for await (const item of iterable) {
        chunk.push(item);
        if (chunk.length === size) {
            yield chunk;
            chunk = [];
        }
    }

    if (chunk.length)
        yield chunk;

}

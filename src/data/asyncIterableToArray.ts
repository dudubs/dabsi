import {Seq} from "immutable";

export async function asyncIterableToArray<T>(
    iterator: AsyncIterable<T>
): Promise<T[]> {
    const array: T[] = [];
    for await (const item of iterator) {
        array.push(item);
    }
    return array;
}


export function toIndexedSeq<T>(
    item: T | undefined,
    getNextItem: (item: T) => T | undefined
): Seq.Indexed<T> {

    return Seq.Indexed(flat())

    function* flat() {
        while (typeof item !== "undefined") {
            yield item;
            item = getNextItem(item);
        }

    }
}

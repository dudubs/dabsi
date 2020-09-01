import {IndexedSeq} from "./immutable2";

export function flatToSeq<T>(
    first: T,
    getNext: (prev: T) => T | undefined | null
): IndexedSeq<T> {
    return IndexedSeq<T>([first]).flatMap(function* (value: any) {
        for (; value !== null; value = getNext(value)) {
            yield value;
        }
    })
}

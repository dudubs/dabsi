import {IndexedSeq} from "../immutable2";

export function flatToSeq<T>(
    first: T,
    getNext: (prev: T) => T | undefined | null
): IndexedSeq<T> {
    return IndexedSeq<T>([first]).flatMap(function* (value: any) {
        while (value != null) {
            yield value;
            value = getNext(value)
        }
    })
}

import {Ref} from "react";
import {setRef} from "@dabsi/react/utils/setRef";
import {PropsBuilder} from "@dabsi/common/object/buildObject";

export type RefBuilder<K extends string, T> = PropsBuilder<Partial<Record<K, Ref<T>>>>;


export function refBuilder<T, P extends string = "ref">(
    ref: Ref<T>, prop?: P
): RefBuilder<P, T>
export function refBuilder<T, K extends keyof T,
    P extends string = "ref", >(ref: [T, K], prop?: P): RefBuilder<P, T[K]>
export function refBuilder(ref, key = "ref") {
    return {
        [key]: prevRef => value => {
            setRef(prevRef, value);
            if (Array.isArray(ref)) {
                ref[0][ref[1]] = value;
            } else {
                setRef(ref, value)
            }
        }
    }
}

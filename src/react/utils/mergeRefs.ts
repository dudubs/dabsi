import {Ref, RefCallback} from "react";
import {setRef} from "./setRef";

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
    return value => {
        for (let ref of refs) {
            setRef(ref, value)
        }
    }
}
import {Nullable} from "../../common/typings";


export type ObjectRef<T> = { current: T };

export function ObjectRef<T>(): ObjectRef<T | undefined>
export function ObjectRef<T>(current: T): ObjectRef<T>
export function ObjectRef<T>(current?) {
    return {current}
}

export type CallbackRef<T> = (current: T) => void;


export type Ref<T> = ObjectRef<T> | CallbackRef<T> | Nullable;


export function Ref<T, K extends keyof T>(obj: T, key: K): CallbackRef<T[K]> {
    return current => {
        obj[key] = current;
    }
}

export function updateRef<T>(ref: Ref<T>[] | Ref<T>, current: T) {
    if (typeof ref === "function") {
        ref(current);
    } else if (typeof ref === "object") {
        if (Array.isArray(ref)) {
            for (const subRef of ref) {
                updateRef(subRef, current);
            }
        } else if (ref) {
            ref.current = current;
        }
    }
}

export function attachRef<T>(...refs: Ref<T>[]): CallbackRef<T> {
    return current => {
        updateRef(refs, current);
    }
}

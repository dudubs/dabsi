import {Builder} from "@dabsi/common/object/buildObject";

export function callbackBuilder<T extends ((...args: any[]) => void) | undefined>(
    ...callbacks: T[]
): Builder<T | undefined> {
    return (prevCallback): any => {
        if ((callbacks.length === 1) && !prevCallback)
            return callbacks[0];
        if (callbacks.length === 0)
            return prevCallback;
        return (...args): any => {
            prevCallback?.(...args);
            for (let callback of callbacks) {
                callback?.(...args);
            }
        }
    }
}

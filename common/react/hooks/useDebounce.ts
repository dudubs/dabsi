import {useMemo} from "react";

export type Debounce = {
    isPending(): boolean,
    wait(ms?: number): Promise<void>;
    cancel(): void;
};

export function Debounce(defaultMs: number = 1000): Debounce {
    let counter = 0;
    let isPending = false;
    let timeout: ReturnType<typeof setTimeout>;
    return {
        isPending(): boolean {
            return isPending
        },
        cancel: () => {
            counter++;
            clearTimeout(timeout);
        },
        wait: (ms = defaultMs) => {

            if (timeout !== undefined) {
                clearTimeout(timeout);
            }

            const id = ++counter;
            isPending = true;
            return new Promise<void>(resolve => {
                timeout = setTimeout(() => {
                    if (id === counter) {
                        isPending = false;
                        resolve();
                    }
                }, ms);
            });
        }
    }
}


export function DebounceOld(ms) {
    let counter = 0;
    return async () => {
        const id = ++counter;
        return new Promise(resolve => {
            setTimeout(() => {
                if (id === counter)
                    resolve();
            }, ms)
        })
    }
}

export function useDebounce(ms?: number, deps = []) {
    return useMemo(() => Debounce(ms), deps)
}





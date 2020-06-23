import {useMemo} from "react";

export type Debounce = {
    isPending(): boolean,
    wait(ms?: number, cancel?: boolean): Promise<void>;
    cancel(): void;
    resolve(): void;
};

export function Debounce(defaultMs: number = 1000): Debounce {
    let counter = 0;
    let isPending = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let lastResolve: any;
    return {
        isPending(): boolean {
            return isPending
        },
        cancel: () => {
            counter++;
            if (timeout !== undefined)
                clearTimeout(timeout);
        },
        resolve: () => {
            timeout && clearTimeout(timeout);
            timeout = undefined;
            lastResolve?.();
        },
        wait: (ms = defaultMs, cancel = false) => {
            if (cancel) {
                counter++;
            }
            if (timeout !== undefined) {
                clearTimeout(timeout);
            }
            const id = ++counter;
            isPending = true;
            return new Promise<void>(resolve => {
                lastResolve = resolve;
                timeout = setTimeout(() => {
                    if (id === counter) {
                        isPending = false;
                        lastResolve = undefined;
                        resolve();
                    }
                }, ms);
            });
        }
    }
}


export function useDebounce(ms?: number, deps = []) {
    return useMemo(() => Debounce(ms), deps)
}



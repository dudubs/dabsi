import {useMemo} from "react";
import {Waiter} from "../../../common/async/Waiter";

export type Debounce = {
    wait(ms?: number): Promise<boolean>;
    cancel(): void;
    resolve(): void;
};


export function Debounce(defaultMs: number = 1000): Debounce {

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let lastWaiter: Waiter<boolean> | undefined = undefined;
    return {

        cancel,
        resolve: () => {
            if(timeout!==undefined) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            const waiter = lastWaiter;
            lastWaiter = undefined;
            waiter?.resolve(false);
        },
        wait: (ms = defaultMs) => {
            cancel();

            if (timeout !== undefined) {
                clearTimeout(timeout);
            }

            const waiter = lastWaiter = Waiter();

            timeout = setTimeout(() => {
                timeout = undefined;
                waiter.resolve(lastWaiter !== waiter);
            }, ms);

            return waiter;

        }
    }

    function cancel() {
        const waiter = lastWaiter;
        lastWaiter = undefined;
        waiter?.resolve(true);
        if (timeout !== undefined) {
            clearTimeout(timeout);
            timeout = undefined;
        }
    }
}


export function useDebounce(ms?: number, deps = []) {
    return useMemo(() => Debounce(ms), deps)
}



import {useEffect, useState} from "react";


export function useEffectedState<T>(deps: [T, ...any[]]): [T, (state: T) => void]
export function useEffectedState<T, U extends any[]>(deps: U, initState: (...args: U) => T): [T, (state: T) => void]
export function useEffectedState<T, U extends any[]>(deps, initState?) {
    if (deps[0] === undefined)
        throw new Error(`deps must to contain least one item`);

    if (!initState) {
        initState = state => {
            return state;
        };
    }

    const [state, setState] = useState(() => {
        return initState(...deps);
    });
    useEffect(() => {
        setState(initState(...deps));
    }, deps);
    return [state, setState];
}

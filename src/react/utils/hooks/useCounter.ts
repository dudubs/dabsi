import {useState} from "react";

export function useCounter(start = 0): [number, (value?: number) => void] {
    const [state, setState] = useState(() => start);

    return [state, (value = 1) => {
        setState(state + value);
    }]
}

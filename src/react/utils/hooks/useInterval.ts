import {useEffect} from "react";
import {useCounter} from "./useCounter";

export function useInterval(ms): number {
    const [n, next] = useCounter(0);
    useEffect(() => {
        const id = setInterval(() => {
            next();
        }, ms);
        return () => {
            clearInterval(id);
        }
    }, [n]);
    return n;
}

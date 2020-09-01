import {useMemo} from "react";

export function useParams<T extends (...params: any[]) => any>(
    func: T,
    ...parameters: Parameters<T>
): ReturnType<T> {
    return useMemo(() => func.apply(null, parameters), parameters)
}

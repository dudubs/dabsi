import {useEffect} from "react";
import {Store} from "./Store";

export function useStoreEffect<T>(store: Store<T>,
                                  callback: (state: T) => void) {
    useEffect(() => {
        return store.listen(callback)
    }, [store])
}

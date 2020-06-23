import {useDebounce} from "./hooks/useDebounce";
import {Store} from "./Store";
import {useStoreEffect} from "./useStoreEffect";

export function useStoreEffectWithDebounce<T>(
    store: Store<T>,
    ms: number,
    callback: (state: T) => void) {
    const debounce = useDebounce();
    useStoreEffect(store, state => {
        debounce.wait(ms).then(() => callback(state))
    })
}

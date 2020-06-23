import {useState} from "react";
import {ValueOrFactory} from "../../common/patterns/ValueOrFactory";
import {Store} from "./Store";

export function useStore<T = any>(valueOrFactory: ValueOrFactory<T>): Store<T> {
    const [state, setState] = useState<T>(() => {
        return ValueOrFactory(valueOrFactory);
    });
    return new Store<T>(() => state, setState);
}

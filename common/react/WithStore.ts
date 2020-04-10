import {ReactElement} from "react";
import {Store} from "./Store";

export function WithStore<T>({state, children: render}: {
    state: T, children(store: Store<T>): ReactElement
}) {
    return render(Store.use(state));
}

import {AnyRouter} from "../../router";
import {ContextOrType} from "../utils/ContextOrType";
import {provide} from "../utils/provide";
import {ReactRouterRenderers, ReactRouterRendererProps} from "./OldReactRouter";

export function ReactRouterContext<T extends AnyRouter, U>(
    type: ContextOrType<U>,
    getValue: (props: ReactRouterRendererProps<T>) => U
): (router: T) => T {
    return router => {
        ReactRouterRenderers(router).push(props => {
            return provide(type, getValue(props), props.children)
        });
        return router;
    }
}

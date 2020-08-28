import {withHooks} from "../utils/withHooks";
import {AnyReactRouter, ReactRouterRendererProps, ReactRouterRenderHook} from "./OldReactRouter";

export function createReactRouterRendererHook(
    toRender: (props: ReactRouterRendererProps<any>) => boolean,
    getRouter?: (router: AnyReactRouter) => AnyReactRouter
): ReactRouterRenderHook {
    return function <T extends AnyReactRouter>(this: T, callback): any {
        return (getRouter ? getRouter(this) : this).render(
            withHooks(
                props => toRender(props) ? callback(props) : props.children
            )
        )
    };
}

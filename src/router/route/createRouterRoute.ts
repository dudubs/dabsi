import {OptionalObjectArg} from "../../common/typings";
import {RouterContextType} from "../context";
import {RouterInstanceType} from "../instance";
import {AnyRouter} from "../Router";
import {createRoute} from "./createRoute";
import {Route} from "./Route";


export type RouteProps<Router extends AnyRouter> = {
    instance: RouterInstanceType<Router>,
    context: RouterContextType<Router>
};


export function createRouterRoute<T extends AnyRouter>(
    router: T,
    ...[props]: OptionalObjectArg<RouteProps<T>>
): Route<T> {
    return <any>createRoute({
        parent: undefined,
        instance: (<RouteProps<T>>props)?.instance,
        context: (<RouteProps<T>>props)?.context,
        name: undefined,
        router,

    })
}

import {UndefinedArgs, UndefinedObject} from "../../common/typings";
import {createRoute} from "./createRoute";
import {Route, RouteProps} from "./Route";
import {AnyRouter} from "../Router";
import {RouterContextOf} from "../context";


export type UndefinedRouteProps<Router extends AnyRouter> = {
    context: RouterContextOf<Router>,
    instance: keyof Router['instanceType'] extends never ?
        undefined : Router['instanceType']
};


export function createRouterRoute<T extends AnyRouter>(
    router: T,
    ...[props]: UndefinedArgs<UndefinedObject<UndefinedRouteProps<T>>>
): Route<T> {
    return <any>createRoute({
        parent: undefined,
        instance: (<RouteProps<T>>props)?.instance,
        context: (<RouteProps<T>>props)?.context,
        name: undefined,
        router,

    })
}

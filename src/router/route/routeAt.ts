import {OptionalArg} from "../../common/typings";
import {RouterContextType} from "../context";
import {AnyRouter} from "../Router";
import {anyRouterAt, RouterAt} from "../routerAt";
import {createRoute} from "./createRoute";
import {AnyRoute, Route} from "./Route";


export function routeAt<Router extends AnyRouter, K extends keyof Router['children']>(
    this: Route<Router>,
    key: string & K,
    ...[context]: OptionalArg<RouterContextType<Router['children'][K]>>
): Route<RouterAt<Router, K>> {
    return <any>anyRouteAt(<AnyRoute>this, key, context)
}

export function anyRouteAt<Router extends AnyRouter = AnyRouter>(
    route: Route<Router>, key: string, context): Route<Router> {
    return <any>createRoute({
        parent: <any>route,
        instance: route.instance,
        context,
        name: key,
        router: anyRouterAt(route.router, key)
    })
}

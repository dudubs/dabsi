import {Awaitable} from "../common/typings";
import {AnyRouter, Router, RouterParams} from "./Router";
import {RouterAt} from "./RouterAt";
import {RouterContext} from "./RouterContext";
import {createRouterLocation, RouterLocation} from "./RouterLocation";

declare module "./Router" {
    interface Router {
        routeType: {
            parent: AnyRoute | undefined;
            at: typeof _at
            toLocation: typeof _toLocation,
            name: string | undefined;
        };
        extendRoute: typeof _extendRoute;
    }
}

declare module "./RouterAt" {
    interface IRouterAt<T> {
        routeType: T['routeType'];
    }
}
Router.routeType = {
    at: _at,
    toLocation: _toLocation,
    parent: undefined,
    name: undefined
};
Router.extendRoute = _extendRoute;

export type AnyRoute = Route<AnyRouter>;

export type Route<T extends AnyRouter = Router> = T['routeType'] & {
    router: T;
    context: RouterContext<T>;
    parent: AnyRoute | undefined;
    name: string | undefined;
    routeType: object|undefined,
};

export type RouteAt<T extends AnyRouter, K extends keyof T['children']> =
    Route<RouterAt<T, K>>;

export function createRoute<T extends AnyRouter>(
    parent: AnyRoute | undefined,
    router: T,
    context: RouterContext<T>,
    name: string | undefined,
    routeType: object | undefined = parent?.routeType
): AnyRoute {
    return {
        ...router.routeType,
        ...routeType,
        routeType: routeType,
        parent,
        router,
        context, name
    }
}

export function Route<T extends AnyRouter>(
    router: T,
    ...[context]: RouteArgs<T>
): Route<T> {
    // @ts-ignore
    return createRoute(undefined, router, <any>context ?? {}, undefined)
}

///

export type RouteArgs<T extends AnyRouter> =
    RouterContext<T> extends undefined ?
        [RouterContext<T>?]
        : [RouterContext<T>];

function _at<T extends AnyRouter, K extends keyof T['children']>(
    this: Route<T>,
    key: K, ...[context]: RouteArgs<T['children'][K]>): RouteAt<T, K> {
    // @ts-ignore
    return createRoute(this, this.router.at(key), context, <string>key)
}

function _extendRoute<T extends AnyRouter,
    U extends object>(this: T, routeType: U):
    T & { routeType: U } {
    return {...this, routeType: {...this.routeType, ...routeType}}
}

function _toLocation<T extends AnyRouter>(this: Route<T>): RouterLocation<T> {
    return createRouterLocation(undefined, this.router,
        this.router.contextAdapter?.pack(this.context))
}

import {assert} from "../common/assert";
import {cloneObject} from "../common/object/cloneObject";
import {mergeProperties} from "../common/object/mergeProperties";
import {UndefinedArgs, UndefinedObject} from "../common/typings";
import {AnyRouter, Router, RouterParams} from "./Router";
import {RouterAt} from "./RouterAt";
import {RouterContext} from "./RouterContext";
import {RouterInstance} from "./RouterInstance";
import {AnyRouterLocation, RouterLocation} from "./RouterLocation";

declare module "./Router" {
    interface Router {
        routeType: {
            parent: AnyRoute | undefined;
            at: typeof _at,
            loadAt: typeof _loadAt,
            toLocation: typeof _toLocation,
            stack: typeof _stack;
            name: string | undefined;
            root: AnyRoute;
        };
        extendRoute: typeof _extend;
    }
}

declare module "./RouterAt" {
    interface IRouterAt<T> {
        routeType: T['routeType'];
    }
}

Router.routeType = {
    at: _at,
    loadAt: _loadAt,
    toLocation: _toLocation,
    stack: _stack,
    parent: undefined,
    name: undefined,
    get root() {
        return this.parent?.root ?? this;
    }
};
Router.extendRoute = _extend;

export type AnyRoute = Route<AnyRouter>;

export type Route<T extends AnyRouter = Router> = T['routeType'] & T['instanceType'] & {
    router: T;
    context: RouterContext<T>;
    parent: AnyRoute | undefined;
    name: string | undefined;
    root: T['routeType'];
    instance: RouterInstance<T>
};

export function AnyRoute(props: {
    parent: AnyRoute | undefined,
    router: AnyRouter,
    instance: object | undefined,
    name: string | undefined,
    context: any
}): AnyRoute {
    return Object.setPrototypeOf({
        ...props.instance,
        instance: props.instance,
        parent: props.parent,
        router: props.router,
        context: props.context,
        name: props.name
    }, props.router.routeType)

}

export type RouteProps<T extends AnyRouter> = {
    instance: RouterInstance<T>,
    context: RouterContext<T>
};


export function Route<T extends AnyRouter>(
    router: T,
    ...[props]: UndefinedArgs<UndefinedObject<RouteProps<T>>>
): Route<T> {
    return <any>AnyRoute({
        parent: undefined,
        instance: (<RouteProps<T>>props)?.instance,
        context: (<RouteProps<T>>props)?.context,
        name: undefined,
        router,
    })
}

export async function _loadAt<T extends AnyRouter,
    K extends keyof T['children']>(
    this: Route<T>,
    key: string & K,
    ...[params]: UndefinedArgs<RouterParams<T['children'][K]>>
): Promise<Route<RouterAt<T, K>>> {
    const router = this.router.at(key);
    if (router.contextAdapter) {
        const context = await router.contextAdapter.load(params);
        // @ts-ignore
        return this.at(key, context);
    }
    // @ts-ignore
    return this.at(key);
}

function _at<T extends AnyRouter, K extends keyof T['children']>(
    this: Route<T>,
    key: string & K,
    ...[context]: UndefinedArgs<RouterContext<T['children'][K]>>
): Route<RouterAt<T, K>> {
    return <any>AnyRoute({
        parent: <AnyRoute>this,
        instance: this.instance,
        context,
        name: key,
        router: this.router.at(key)
    })
}


export type RouterWithRouteType<U extends object> = { routeType: U };

function _extend<T extends AnyRouter, U extends object>(this: T, routeType: U): T & RouterWithRouteType<U> {
    return <any>cloneObject(this, {routeType: <any>mergeProperties(this.routeType, routeType)})
}

function _toLocation<T extends AnyRouter>(this: Route<T>): RouterLocation<T> {
    return AnyRouterLocation({
        parent: this.parent?.toLocation(),
        router: this.router,
        instance: this.instance,
        params: this.router.contextAdapter?.pack(this.context)
    })
}

function _stack<T extends AnyRouter, K extends keyof T['stack']>
(this: Route<T>, key: K): Route<RouterAt<T['stack'][K], K>> {
    if (this.name === key) {
        return this;
    }
    if (!this.parent)
        throw new Error(`No router "${key}" in stack.`)
    return this.parent.stack(key);
}

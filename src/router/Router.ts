import {mergeObject} from "../common/object/mergeObject";
import {mergeProperties} from "../common/object/mergeProperties";
import {UndefinedIf, UndefinedIfNoKeys} from "../common/typings";

export type AnyRouter = Router<any>;

export interface RouterInit {
    name: string;
    children: Record<string, AnyRouter>;
    stack: Record<string, AnyRouter>;
    params: Record<string, (text: string) => any>;
}

export interface DefaultRouterInit {
    children: {},
    params: {},
    stack: {}
    name: never,
    parent: never;

}

export interface Router<Init extends RouterInit = DefaultRouterInit> {

    children: Init['children'];

    params: Init['params'];

    stack: Init['stack'];

    routerType: {};

    extend: typeof _extend;

    route: typeof _route;

    param: typeof _param;

}


export type UndefinedRouterParams<T extends AnyRouter> =
    UndefinedIfNoKeys<RouterParams<T>>;

export type RouterParams<Router extends AnyRouter> = {
    [K in keyof Router['params']]: ReturnType<Router['params'][K]>
};


export type RouterWithRouterType<T extends object> = T & { routerType: T };
export type RouterWithChild<K extends string, Router extends AnyRouter> =
    { children: Record<K, Router> };
export const Router: Router = <Router>{
    children: {},
    params: {},
    stack: {},
    routerType: {},
    extend: _extend,
    route: _route,
    param: _param,
};


function _route<TRouter extends AnyRouter,
    K extends string,
    ChildRouter extends AnyRouter = Router>(
    this: TRouter,
    key: K,
    router?: ChildRouter
):
    TRouter & RouterWithChild<K, ChildRouter> {

    return mergeObject(this, {
        children: {
            [key]: router ?? Router
        }
    })

}

export type RouterWithParam<K extends string, V> =
    { params: Record<K, (value: string) => V> };

function _param<Router extends AnyRouter, K extends string, V = string>
(this: Router, key: K, type?: (value: string) => V):
    Router & RouterWithParam<K, V> {
    return mergeObject(this, {
        params: {[key]: type ?? String}
    })
}

function _extend<T extends AnyRouter, U extends object>(this: T, routerType: U):
    T & RouterWithRouterType<U> {
    routerType = <any>mergeProperties(this.routerType, routerType);
    return Object.setPrototypeOf({...this, routerType}, routerType)
}


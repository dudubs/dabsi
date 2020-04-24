import {mergeObject} from "../common/object/mergeObject";
import {mergeProperties} from "../common/object/mergeProperties";

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

    stack?: Init['stack'];

    routerType: {};


    extend: typeof _extend;

    route: typeof _route;

    param: typeof _param;


}


export type RouterParams<T extends AnyRouter> = {
    [K in keyof T['params']]: ReturnType<T['params'][K]>
};


export type ExtendRouter<T extends AnyRouter, U extends object> =
    T & U & { routerType: U };


export const Router: Router = <Router>{
    children: {},
    params: {},
    stack: {},
    routerType: {},
    extend: _extend,
    route: _route,
    param: _param,
};


function _route<T extends AnyRouter,
    K extends string,
    U extends AnyRouter = Router>(this: T, key: K, router?: U):
    T & { children: Record<K, U> } {

    return mergeObject(this, {
        children: {
            [key]: router ?? Router
        }
    })

}

function _param<T extends AnyRouter, K extends string, U = string>(this: T, key: K, type?: (value: string) => U):
    T & { params: Record<K, (value: string) => U> } {
    throw new Error();
}

function _extend<T extends AnyRouter, U extends object>(this: T, routerType: U):
    ExtendRouter<T, U> {
    routerType = <any>mergeProperties(this.routerType, routerType);
    return Object.setPrototypeOf({...this, routerType}, routerType)
}


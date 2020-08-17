/*

    Router children
        Route
    Router instance

 */

import {Assign} from "../common/typings";
import {routerAt} from "./routerAt";


import {routerClass} from "./routerClass";
import {routerExtend} from "./routerExtend";
import {routerParam} from "./routerParam";
import {routerRoute} from "./routerRoute";

export interface RouterProps {
    stackType: Record<string, AnyRouter>

    children: Record<string, AnyRouter>

    routeType: any;

    routerType: any;

    locationType: any;
}

export type AnyRouter = Assign<Router, RouterProps>;


export interface Router {


    routerType: {};

    params: {}

    stackType: {},

    children: {};
}


export type RouterWithRouterType<T extends object> =
    T & { routerType: T };

export type RouterWithChild<K extends string, Router extends AnyRouter> =
    { children: Record<K, Router> };


export const Router: Router = <Router>{
    children: {},
    params: {},
    routerType: {},
    extend: routerExtend,
    route: routerRoute,
    class: routerClass,
    param: routerParam,
    at: routerAt
};



import {at} from "./at";
import {extendRoute} from "./extendRoute";
import {loadAt} from "./loadAt";
import {stack} from "./stack";
import {toLocation} from "./toLocation";
import {AnyRouter, Router} from "../Router";
import {RouterContextOf} from "../context";
import {RouterInstanceOf} from "../instance";

declare module "../Router" {
    interface Router {
        routeType: {
            parent: AnyRoute | undefined;
            at: typeof at,
            loadAt: typeof loadAt,
            toLocation: typeof toLocation,
            stack: typeof stack;
            name: string | undefined;
            root: AnyRoute;
        };
        extendRoute: typeof extendRoute;
    }
}

declare module "../at" {
    interface IRouterAt<T> {
        routeType: T['routeType'];
    }
}


export type AnyRoute = Route<AnyRouter>;

export type Route<T extends AnyRouter = Router> =
    T['routeType'] & T['instanceType'] & {
    router: T;
    context: RouterContextOf<T>;
    parent?: Route<AnyRouter> | undefined;
    name: string | undefined;
    root: T['routeType'];
    instance: RouterInstanceOf<T>
};


export type RouteProps<T extends AnyRouter> = {
    instance: RouterInstanceOf<T>,
    context: RouterContextOf<T>
};


export type RouterWithRouteType<U extends object> = { routeType: U };


Router.routeType = {
    at,
    loadAt,
    toLocation,
    stack,
    parent: undefined,
    name: undefined,
    get root() {
        return this.parent?.root ?? this;
    }
};

Router.extendRoute = extendRoute;



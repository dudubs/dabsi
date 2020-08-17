import {RouterContextType} from "../context";
import {AnyRouter, Router} from "../Router";
import {routerExtendRoute} from "./extendRoute";
import {routeAt} from "./routeAt";
import {routeLoadAt} from "./routeLoadAt";
import {routeStack} from "./routeStack";
import {routeToLocation} from "./routeToLocation";

declare module "../Router" {

    interface RouterProps {
        routeType: any;
    }

    interface Router {
        routeType: {
            parent: AnyRoute | undefined;
            at: typeof routeAt,
            loadAt: typeof routeLoadAt,
            toLocation: typeof routeToLocation,
            stack: typeof routeStack;
            name: string | undefined;
            root: AnyRoute;
        };
        extendRoute: typeof routerExtendRoute;
    }
}


Router.routeType = {
    at: routeAt,
    loadAt: routeLoadAt,
    toLocation: routeToLocation,
    stack: routeStack,
    parent: undefined,
    name: undefined,
    get root() {
        return this.parent?.root ?? this;
    }
};

Router.extendRoute = routerExtendRoute;


export type AnyRoute = Route<AnyRouter>;


export type Route<Router extends AnyRouter> =
    & Router['routeType']
    & Router['instanceType']
    & {
    router: Router;
    context: RouterContextType<Router>
    parent?: Route<AnyRouter> | undefined;
    name: string | undefined;
    root: Router['routeType'];
    instance: Router['instanceType']
};


export type RouterWithRouteType<U extends object> = { routeType: U };

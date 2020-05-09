import {History} from "history";
import {ReactNode} from "react";
import {mapFactory} from "../../common/map/mapFactory";
import {definedAt} from "../../common/object/defined";
import {Router, RouterWithRouterType, RouterWithRouteType} from "../../router";
import {Route} from "../../router/Route";
import {AnyRouter} from "../../router/Router";
import {RouterWithInstanceType} from "../../router/RouterInstance";
import {RouterWithOptions} from "../../router/RouterOptions";
import {withHooks} from "../utils/withHooks";
import {getRoutePath} from "./getRoutePath";

export type ReactRouterRendererProps<T extends AnyRouter> = {
    children: ReactNode,
    route: Route<T>,
    isIndex: boolean,
    isDefault: boolean,
    isContainer: boolean,
    isContent: boolean,
    contentRoute: AnyReactRoute;
    path: string
};


export type ReactRouterRenderer<T extends AnyReactRouter> =
    (props: ReactRouterRendererProps<T>) => ReactNode;

export type AnyReactRoute = Route<AnyReactRouter>;

export type ReactRouter = Router &
    RouterWithRouterType<{
        render: typeof _render;
        renderIndex: ReactRouterRenderHook;
        renderDefault: ReactRouterRenderHook;
        renderContainer: ReactRouterRenderHook;
    }> &
    RouterWithRouteType<{
        push: typeof _pushRoute;
        history: History | null
    }> &
    RouterWithInstanceType<{}>
    & RouterWithOptions<{ hasIndex: boolean }>
    ;


export type AnyReactRouter = AnyRouter & ReactRouter;

export const ReactRouterRenderers =
    mapFactory(new WeakMap(), (router: AnyRouter):
    ReactRouterRenderer<any>[] => []);

export const ReactRouter: ReactRouter = Router
    .extend({
        render: _render,
        renderIndex: ReactRouterRenderHook(router => router.isIndex,
            router => router.configure({hasIndex: true})),
        renderDefault: ReactRouterRenderHook(router => router.isDefault),
        renderContainer: ReactRouterRenderHook(router => router.isContainer),

    }).extendRoute({
        push: _pushRoute,
        history: null
    }).config({hasIndex: false})

export function _pushRoute(this: AnyReactRoute): void {
    definedAt(this, "history").push(getRoutePath(this));
}

function _render<T extends AnyReactRouter>(this: T, callback: ReactRouterRenderer<T>): T {
    ReactRouterRenderers(this).push(callback);
    return this;
}

export type ReactRouterRenderHook = <T extends AnyReactRouter>(
    this: T,
    callback: (props: ReactRouterRendererProps<T>) => ReactNode) => T;

export function ReactRouterRenderHook(
    toRender: (props: ReactRouterRendererProps<any>) => boolean,
    getRouter?: (router: AnyReactRouter) => AnyReactRouter
): ReactRouterRenderHook {
    return function <T extends AnyReactRouter>(this: T, callback): any {
        return (getRouter ? getRouter(this) : this).render(
            withHooks(
                props => toRender(props) ? callback(props) : props.children
            )
        )
    };
}


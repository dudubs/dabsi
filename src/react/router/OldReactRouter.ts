import {History} from "history";
import {ReactNode} from "react";
import {WeakMapFactory} from "../../common/map/mapFactory";
import {AnyRouter, Route, Router, RouterWithRouterType, RouterWithRouteType} from "../../router";
import {RouterWithInstanceType} from "../../router/instance";
import {RouterWithOptions} from "../../router/options";
import {createReactRouterRendererHook} from "./createReactRouterRendererHook";
import {reactRouterPush} from "./reactRouterPush";
import {reactRouterRender} from "./reactRouterRender";

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

export type OldReactRouter =
    Router &
    RouterWithRouterType<{
        render: typeof reactRouterRender;
        renderIndex: ReactRouterRenderHook;
        renderDefault: ReactRouterRenderHook;
        renderContainer: ReactRouterRenderHook;
    }> &
    RouterWithRouteType<{
        push: typeof reactRouterPush;
        history: History | null
    }> &
    RouterWithInstanceType<{}> &
    RouterWithOptions<{ hasIndex: boolean }>
    ;


export type AnyReactRouter = AnyRouter & OldReactRouter;

export const ReactRouterRenderers =
    WeakMapFactory((router: AnyRouter):
    ReactRouterRenderer<any>[] => []);

export const OldReactRouter: OldReactRouter = Router
    .extend({
        render: reactRouterRender,
        renderIndex: createReactRouterRendererHook(router => router.isIndex,
            router => router.configure({hasIndex: true})
        ),
        renderDefault: createReactRouterRendererHook(
            router => router.isDefault
        ),
        renderContainer: createReactRouterRendererHook(
            router => router.isContainer
        ),

    }).extendRoute({
        push: reactRouterPush,
        history: null
    })
    .config({hasIndex: false})

export type ReactRouterRenderHook = <T extends AnyReactRouter>(
    this: T,
    callback: (props: ReactRouterRendererProps<T>) => ReactNode) => T;


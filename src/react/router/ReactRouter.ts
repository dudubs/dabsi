import {History} from "history";
import {ReactNode} from "react";
import {mapFactory} from "../../common/map/mapFactory";
import {definedAt} from "../../common/object/defined";
import {ExtendRoute, Router} from "../../router";
import {Route} from "../../router/Route";
import {AnyRouter, ExtendRouter} from "../../router/Router";
import {withHooks} from "../utils/withHooks";
import {getRoutePath} from "./getRoutePath";

export type ReactRouterRendererProps<T extends AnyReactRouter> = {
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


export type ReactRouter = ExtendRoute<ExtendRouter<Router, {
    render: typeof _render;
    renderIndex: ReactRouterRenderHook;
    renderDefault: ReactRouterRenderHook;
    renderContainer: ReactRouterRenderHook;
    getRenderers<T extends AnyReactRouter>(this: T): ReactRouterRenderer<T>[];
}>, {
    push: typeof _push;
    history: History | null
}>


export type AnyReactRouter = AnyRouter & ReactRouter;

const _getRenderers =
    mapFactory(new WeakMap(), (router: AnyReactRouter):
    ReactRouterRenderer<any>[] => []);

export const ReactRouter: ReactRouter = Router
    .extend({
        render: _render,
        renderIndex: ReactRouterRenderHook(router => router.isIndex),
        renderDefault: ReactRouterRenderHook(router => router.isDefault),
        renderContainer: ReactRouterRenderHook(router => router.isContainer),
        getRenderers(this: AnyReactRouter) {
            return _getRenderers(this);
        }
    }).extendRoute({
        push: _push,
        history: null
    });

export function _push(this: AnyReactRoute): void {
    definedAt(this, "history").push(getRoutePath(this));
}

function _render<T extends AnyReactRouter>(this: T, callback: ReactRouterRenderer<T>): T {
    this.getRenderers().push(callback);
    return this;
}

type ReactRouterRenderHook = <T extends AnyReactRouter>(
    this: T,
    callback: (props: ReactRouterRendererProps<T>) => ReactNode) => T;

export function ReactRouterRenderHook(
    toRender: (props: ReactRouterRendererProps<any>) => boolean
): ReactRouterRenderHook {
    return function <T extends AnyReactRouter>(this: T, callback) {
        return this.render(
            withHooks(
                props => toRender(props) ? callback(props) : props.children
            )
        )
    };
}

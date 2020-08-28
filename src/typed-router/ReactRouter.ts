import {History} from "history"
import {ReactElement, ReactNode} from "react";
import {WeakMapFactory} from "../common/map/mapFactory";
import {Renderer} from "../react/renderer";
import {createUndefinedContext} from "../react/utils/hooks/createUndefinedContext";
import {getNextPath} from "../router/utils/getNextPath";
import {ReactRouterLocation, ReactRouterRoute} from "./ReactRouterLocation";
import {AnyRouter, Router, TRouter} from "./Router";

export const HistoryContext = createUndefinedContext<History>();

export type TReactRouter = TRouter & { routerType: typeof ReactRouter };

type WrapperProps<T extends TReactRouter> = {
    location: ReactRouterLocation<T>,
    route: ReactRouterRoute
    children: ReactElement
};
type RendererProps<T extends TReactRouter> = {
    location: ReactRouterLocation<T>
};
type DefaultRendererProps<T extends TReactRouter> =
    RendererProps<T> & { route: ReactRouterRoute };

export type ReactRouterProps = {
    renderer?: Renderer<RendererProps<any>>
    defaultRenderer?: Renderer<DefaultRendererProps<any>>
    wrappers: Renderer<WrapperProps<any>>[]
};

export const getReactRouterProps = WeakMapFactory((_: Router<TReactRouter>): ReactRouterProps => {
    return {
        wrappers: []
    }
})

export namespace ReactRouter {


    export function wrap<T extends TReactRouter>(
        this: Router<T>,
        wrapper: Renderer<WrapperProps<T>>
    ): Router<T> {
        getReactRouterProps(this).wrappers.push(wrapper);
        return this;
    }

    export function renderDefault<T extends TReactRouter>(
        this: Router<T>,
        renderer: Renderer<DefaultRendererProps<T>>
    ): Router<T> {


        getReactRouterProps(this).defaultRenderer = renderer;
        return this;
    }

    export function render<T extends TReactRouter>(
        this: Router<T>,
        renderer: Renderer<RendererProps<T>>
    ): Router<T> {

        getReactRouterProps(this).renderer = renderer;
        return this;
    }
}

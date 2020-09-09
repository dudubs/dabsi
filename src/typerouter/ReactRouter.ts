import {createElement, ReactElement} from "react";
import {useLoader} from "../react/useLoader";
import {WeakMapFactory} from "../common/map/mapFactory";
import {Awaitable} from "../common/typings";
import {flatToSeq} from "../common/flatToSeq";
import {Renderer} from "../react/renderer";
import {EmptyFragment} from "../react/utils/EmptyFragment";
import {ReactRouterLocation, ReactRouterRouteProps, ReactRouterRoutePropsContext} from "./ReactRouterLocation";
import {AnyRouter, Router, TRouter, RouterPlugin} from "./Router";

export type TReactRouter = TRouter & { routerType: typeof ReactRouter };

type WrapperProps<T extends TReactRouter> = {
    location: ReactRouterLocation<T>,
    route: ReactRouterRouteProps
    children: ReactElement
};


export const getReactRouterProps = WeakMapFactory<AnyRouter, ReactRouterProps>(() => ({
    wrappers: []
}));

export type ReactRouterProps = {
    renderer?: Renderer<ReactRouterRouteProps>;
    defaultRenderer?: Renderer<ReactRouterRouteProps>;
    loadRenderer?: Renderer<ReactRouterRouteProps>;
    wrappers: Renderer<WrapperProps<any>>[];
}


export namespace ReactRouter {

    export let reactProps: ReactRouterProps;

    Object.defineProperty(ReactRouter, 'reactProps', {
        get(this: Router<TReactRouter>): ReactRouterProps {
            return getReactRouterProps(this);
        }
    })

    export function wrap<T extends TReactRouter>(
        this: Router<T>,
        wrapper: Renderer<WrapperProps<T>>
    ): Router<T> {
        getReactRouterProps(this).wrappers.push(wrapper);
        return this;
    }

    export function renderDefault<T extends TReactRouter>(
        this: Router<T>,
        renderer: Renderer<ReactRouterRouteProps<T> & { type: "default" }>
    ): Router<T> {
        this.reactProps.defaultRenderer = renderer;
        return this;
    }

    export function render<T extends TReactRouter>(
        this: Router<T>,
        component: Renderer<ReactRouterRouteProps<T>>
    ): Router<T> {
        this.reactProps.renderer = Renderer(component);
        return this;
    }

    export function renderOnLoad<T extends TReactRouter>(
        this: Router<T>,
        renderer: Renderer<ReactRouterRouteProps>
    ): Router<T> {
        this.reactProps.loadRenderer = renderer;
        return this;
    }

    export function loadAndRender<T extends TReactRouter>(
        this: Router<T>,
        loadRenderer:
            (props: ReactRouterRouteProps<T>) => Awaitable<() => ReactElement>
    ): Router<T> {
        return this.render((props) => {
            const component = useLoader(() => loadRenderer(props), [props.location])

            if (component)
                return createElement(component);


            const renderOnLoad = flatToSeq<Router<TReactRouter>>(this, router => router.parent)
                .map(router => router?.reactProps.loadRenderer)
                .find(renderer => !!renderer)


            if (renderOnLoad)
                return renderOnLoad(props);

            return EmptyFragment
        })
    }

}



import {History} from "History";
import {createElement, ReactElement, ReactNode, useEffect, useState} from "react";
import {Renderer} from "../react/renderer";
import {ReactRouterLocation, ReactRouterRouteProps, ReactRouterRoutePropsContext} from "./ReactRouterLocation";
import {AnyRouter} from "./Router";

export function ReactRouterView(
    props: {
        history: History,
        children: ReactNode,
        router: AnyRouter,
        listen?: (callback: (path: string) => void) => () => void
        path?: string,

        renderRoute?: Renderer<{
            children: ReactElement,
            route: ReactRouterRouteProps
        }>
    }
) {

    const [route, setRoute] = useState<ReactRouterRouteProps>(() =>
        getRoute(props.history.location.pathname))

    useEffect(() => {
        return props.history.listen(location => {
            setRoute(getRoute(location.pathname))
        });

    }, [props.history]);

    let children: ReactElement = createElement(ReactRouterRoutePropsContext.Provider, {
        value: route,
        children: props.children
    });

    if (props.renderRoute) {
        children = props.renderRoute({
            route,
            children
        })
    }

    return children;

    function getRoute(path: string) {
        return new ReactRouterLocation<any>(
            null,
            null,
            props.history,
            props.router,
            {}
        ).route(path);
    }

}

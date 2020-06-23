// ViewRouterMenu
// ViewRouterContent

import {History} from "history";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {UndefinedProp} from "../../common/typings";
import {AnyRoute, Route} from "../../router";

import {routeByPath} from "../../router/routeByPath";
import {RouterContextOf} from "../../router/RouterContext";
import {useDefinedContext} from "../utils/hooks/useDefinedContext";
import {mergeCallback} from "../utils/mergeCallback";
import {provide} from "../utils/provide";
import {AnyReactRouter} from "./ReactRouter";
import {ReactRouterLocation} from "./ReactRouterLocation";

export type ReactRouterContainerProps<T extends AnyReactRouter> = {
    history: History;
    router: T;
    children?: ReactNode;
} & UndefinedProp<"context", RouterContextOf<T>>;


export function useReactRouterLocation(): ReactRouterLocation {
    return useDefinedContext(ReactRouterLocation);
}

export function ReactRouterContainer<T extends AnyReactRouter>(
    props: ReactRouterContainerProps<T>) {
    const {history, children} = props;

    const [error, setError] = useState();


    // @ts-ignore
    const initRoute: Route<AnyReactRouter> = useMemo(() => {
        return AnyRoute({
            parent: undefined,
            instance: {history},
            name: undefined,
            context: props.context,
            router: props.router
        });
    }, [props.router]);

    const [location, setLocation] = useState<ReactRouterLocation>(() =>
        new ReactRouterLocation(initRoute, history.location.pathname));

    useEffect(() => {
        let counter = 0;
        updatePath(history.location.pathname);

        return mergeCallback(history.listen(({pathname}) => {
            updatePath(pathname);
        }), () => {
            counter++;
        });

        async function updatePath(path: string) {
            const id = ++counter;
            try {
                const [lastPath, route] = await routeByPath(initRoute, path);
                if (id === counter) setLocation({
                    route,
                    path: lastPath
                })
            } catch (error) {
                setError(error);
            }
        }
    }, [history]);

    if (error)
        throw error;


    return provide(ReactRouterLocation, location, children)
}


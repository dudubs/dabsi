// ViewRouterMenu
// ViewRouterContent

import {History} from "history";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {DefaultIfNever} from "../../common/typings";
import {createRoute, Route} from "../../router";
import {RouterContextType} from "../../router/context";

import {routeByPath} from "../../router/route/routeByPath";
import {useDefinedContext} from "../utils/hooks/useDefinedContext";
import {mergeCallback} from "../utils/mergeCallback";
import {provide} from "../utils/provide";
import {AnyReactRoute, AnyReactRouter} from "./OldReactRouter";
import {ReactRouterLocationOld} from "./ReactRouterLocation";

export type ReactRouterContainerProps<T extends AnyReactRouter> =
    {
    history: History;
    router: T;
    children?: ReactNode;
    context: DefaultIfNever<RouterContextType<T>, null>
};


export function useReactRouterLocation(): ReactRouterLocationOld {
    return useDefinedContext(ReactRouterLocationOld);
}

export function ReactRouterContainer<T extends AnyReactRouter>(
    props: ReactRouterContainerProps<T>) {
    const {history, children} = props;

    const [error, setError] = useState();


    // @ts-ignore
    const initRoute: Route<AnyReactRouter> = useMemo(() => {
        return createRoute({
            parent: undefined,
            instance: {history},
            name: undefined,
            context: props.context,
            router: props.router
        });
    }, [props.router]);

    const [location, setLocation] = useState<ReactRouterLocationOld>(() =>
        new ReactRouterLocationOld(initRoute, history.location.pathname));

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
                    route: route as AnyReactRoute,
                    path: lastPath
                })
            } catch (error) {
                setError(error);
            }
        }
    }, [history]);

    if (error)
        throw error;


    return provide(ReactRouterLocationOld, location, children)
}


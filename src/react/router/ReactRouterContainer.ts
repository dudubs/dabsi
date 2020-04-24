// ViewRouterMenu
// ViewRouterContent

import {History} from "history";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {Route} from "../../router";
import {createRoute} from "../../router/Route";
import {routeByPath} from "../../router/routeByPath";
import {RouterContext} from "../../router/RouterContext";
import {attachCallback} from "../utils/attachCallback";
import {provide} from "../utils/provide";
import {AnyReactRouter} from "./ReactRouter";
import {ReactRouterLocation} from "./ReactRouterLocation";

export type ReactRouterContainerProps<T extends AnyReactRouter> = {
    history: History;
    router: T;
    children?: ReactNode;
    context: RouterContext<T> ;
};


export function ReactRouterContainer<T extends AnyReactRouter>(
    props: ReactRouterContainerProps<T>) {
    const {history, children} = props;

    const [error, setError] = useState<{ error }>();



    // @ts-ignore
    const initRoute: Route<AnyReactRouter> =
        useMemo(()=>createRoute(undefined, props.router, <any>props.context, undefined,
            {history}),[props.router]);

    const [location, setLocation] = useState<ReactRouterLocation>(() =>
        new ReactRouterLocation(initRoute, history.location.pathname));

    useEffect(() => {
        let counter = 0;
        updatePath(history.location.pathname);

        return attachCallback(history.listen(({pathname}) => {
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
        throw error.error;


    return provide(ReactRouterLocation, location, children)
}


// ViewRouterMenu
// ViewRouterContent

import {History} from "history";
import {ReactNode, useEffect, useMemo, useState} from "react";
import {attachCallback} from "../utils/attachCallback";
import {provide} from "../utils/provide";
import {Route} from "../../router";
import {createRoute} from "../../router/Route";
import {routeByPath} from "../../router/routeByPath";
import {RouterContext} from "../../router/RouterContext";
import {AnyReactRouter} from "./ReactRouter";

export type ReactRouterContainerProps<T extends AnyReactRouter> = {
    history: History;
    router: T;
    children?: ReactNode;
    context: RouterContext<T> ;
};


export class ReactRouterLocation {
    constructor(
        public route: Route<AnyReactRouter>,
        public path: string
    ) {
    }
}


export function ReactRouterContainer<T extends AnyReactRouter>(
    props: ReactRouterContainerProps<T>) {
    const {history, children} = props;

    const [error, setError] = useState<{ error }>();


    const router = useMemo((): AnyReactRouter => {

        return props.router
        // .create({
        //     push: path => {
        //
        //     }
        // })


    }, []);

    // @ts-ignore
    const initRoute: Route<AnyReactRouter> =
        createRoute(undefined, router, <any>props.context, undefined,
        {history});

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


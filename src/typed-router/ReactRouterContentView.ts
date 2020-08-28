import {ReactElement} from "react";
import {EmptyFragment} from "../react/utils/EmptyFragment";
import {useDefinedContext} from "../react/utils/hooks/useDefinedContext";
import {getReactRouterProps} from "./ReactRouter";
import {ReactRouterRouteContext} from "./ReactRouterLocation";

export function ReactRouterContentView() {
    const route = useDefinedContext(ReactRouterRouteContext);

    const routerProps = getReactRouterProps(route.location.router);

    let children: ReactElement;

    if (routerProps.renderer) {
        children = routerProps.renderer({
            location: route.location
        })
    } else {
        const defaultRouter = getDefaultRouter();
        if (defaultRouter) {
            children = defaultRouter.props.defaultRenderer!({
                location: defaultRouter.location,
                route
            })
        } else {
            children = EmptyFragment;
        }
    }


    for (let parent = route.location.parent; parent; parent = parent.parent) {
        const props = getReactRouterProps(parent.router)
        const wrapperProps = {
            location: parent,
            route,
            children
        }
        for (const wrapper of props.wrappers) {
            children = wrapper(wrapperProps)
        }
    }

    return children

    function getDefaultRouter() {
        for (let location = route.location; location; location = location.parent) {
            const routerProps = getReactRouterProps(location.router);
            if (routerProps.defaultRenderer) {
                return {location, props: routerProps};
            }
        }
    }

}

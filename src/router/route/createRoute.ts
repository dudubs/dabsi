import {AnyRoute} from "./Route";
import {AnyRouter} from "../Router";

export function createRoute(props: {
    parent: AnyRoute | undefined,
    router: AnyRouter,
    instance: object | undefined,
    name: string | undefined,
    context: any
}): AnyRoute {
    return Object.setPrototypeOf({
        ...props.instance,
        instance: props.instance,
        parent: props.parent,
        router: props.router,
        context: props.context,
        name: props.name
    }, props.router.routeType)

}

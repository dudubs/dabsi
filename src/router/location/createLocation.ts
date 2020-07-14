import {AnyRouter} from "../Router";
import {RouterLocation} from "./RouterLocation";

export function createLocation(
    props: {
        parent: RouterLocation<any> | undefined,
        router: AnyRouter,
        instance: object | undefined,
        params: Record<string, any> | undefined
    }) {
    return Object.setPrototypeOf({
        ...props.instance, instance: props.instance,
        parent: props.parent,
        router: props.router,
        params: props.params
    }, props.router.locationType)

}

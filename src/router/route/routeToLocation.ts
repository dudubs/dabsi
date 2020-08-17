import {createLocation} from "../location/createLocation";
import {createRouterLocation} from "../location/createRouterLocation";
import {AnyRouter} from "../Router";
import {RouterLocation} from "../location/RouterLocation";
import {Route} from "./Route";

export function routeToLocation<T extends AnyRouter>(this: Route<T>): RouterLocation<T> {
    return createLocation({
        parent: <any> this.parent?.toLocation(),
        router: this.router,
        instance: this.instance,
        params: this.router.contextAdapter?.pack(this.context) ?? {}
    })
}

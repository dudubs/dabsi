import {OptionalObjectArg} from "../../common/typings";
import {AnyRouter} from "../Router";
import {anyRouterAt, RouterAt} from "../routerAt";
import {RouterParams} from "../routerParam";
import {createLocation} from "./createLocation";
import {RouterLocation} from "./RouterLocation";

export function locationAt<Router extends AnyRouter, K extends keyof Router['children']>(
    this: RouterLocation<Router>,
    key: string & K,
    ...[params]: OptionalObjectArg<RouterParams<Router['children'][K]>>
): RouterLocation<RouterAt<Router, K>> {
    return createLocation({
        parent: this,
        router: anyRouterAt(this.router, key),
        instance: this.instance,
        params
    });
}

import {UndefinedArgs} from "../../common/typings";
import {AnyRouter, UndefinedRouterParams} from "../Router";
import {RouterAt} from "../at";
import {createLocation} from "./createLocation";
import {RouterLocation} from "./RouterLocation";

export function at<T extends AnyRouter, K extends keyof T['children']>(
    this: RouterLocation<T>,
    key: K,
    ...[params]: UndefinedArgs<UndefinedRouterParams<T['children'][K]>>
): RouterLocation<RouterAt<T, K>> {
    return createLocation({
        parent: this,
        router: this.router.at(key),
        instance: this.instance,
        params
    });
}

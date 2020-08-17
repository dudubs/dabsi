import {cloneObject} from "../../common/object/cloneObject";
import {mergeDescriptors} from "../../common/object/mergeDescriptors";
import {AnyRouter} from "../Router";
import {RouterWithRouteType} from "./Route";

export function routerExtendRoute<T extends AnyRouter, U extends object>(this: T,
                                                                         routeType: U): T & RouterWithRouteType<U> {
    return <any>cloneObject(this, {
        routeType:
            <any>mergeDescriptors(this.routeType, routeType)
    })
}

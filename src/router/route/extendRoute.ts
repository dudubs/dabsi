import {cloneObject} from "../../common/object/cloneObject";
import {mergePropertyDescriptors} from "../../common/object/mergePropertyDescriptors";
import {AnyRouter} from "../Router";
import {RouterWithRouteType} from "./Route";

export function extendRoute<T extends AnyRouter, U extends object>(this: T,
                                                                   routeType: U): T & RouterWithRouteType<U> {
    return <any>cloneObject(this, {
        routeType:
            <any>mergePropertyDescriptors(this.routeType, routeType)
    })
}

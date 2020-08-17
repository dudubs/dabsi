import {mergeDescriptors} from "../common/object/mergeDescriptors";
import {AnyRouter, RouterWithRouterType} from "./Router";

declare module "./Router" {

    interface Router {
        extend: typeof routerExtend;

    }
}

export function routerExtend<T extends AnyRouter, U extends object>
(this: T, routerType: U):
    T & RouterWithRouterType<U> {

    routerType = <any>mergeDescriptors(this.routerType, routerType);

    return Object.setPrototypeOf({...this, routerType}, routerType)

}

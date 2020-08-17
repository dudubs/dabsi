import {cloneObject} from "../../common/object/cloneObject";
import {mergeDescriptors} from "../../common/object/mergeDescriptors";
import {AnyRouter} from "../Router";

export function routerExtendLocation<T extends AnyRouter, U extends object>(
    this: T,
    locationType: U
): T & { locationType: U } {
    return cloneObject<any, any>(this, {
        locationType: mergeDescriptors(this.locationType, locationType)
    })
}

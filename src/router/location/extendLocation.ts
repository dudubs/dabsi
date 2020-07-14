import {cloneObject} from "../../common/object/cloneObject";
import {mergePropertyDescriptors} from "../../common/object/mergePropertyDescriptors";
import {AnyRouter} from "../Router";

export function extendLocation<T extends AnyRouter, U extends object>(
    this: T,
    locationType: U
): T & { locationType: U } {
    return cloneObject<any, any>(this, {
        locationType: mergePropertyDescriptors(this.locationType, locationType)
    })
}

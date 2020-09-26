import { cloneObject } from "../../common/object/cloneObject";
import { assignAllDescriptors } from "../../common/object/assignAllDescriptors";
import { AnyRouter } from "../Router";

export function routerExtendLocation<T extends AnyRouter, U extends object>(
  this: T,
  locationType: U
): T & { locationType: U } {
  return cloneObject<any, any>(this, {
    locationType: assignAllDescriptors(this.locationType, locationType),
  });
}

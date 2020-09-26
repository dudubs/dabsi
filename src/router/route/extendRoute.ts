import { cloneObject } from "../../common/object/cloneObject";
import { assignAllDescriptors } from "../../common/object/assignAllDescriptors";
import { AnyRouter } from "../Router";
import { RouterWithRouteType } from "./Route";

export function routerExtendRoute<T extends AnyRouter, U extends object>(
  this: T,
  routeType: U
): T & RouterWithRouteType<U> {
  return <any>cloneObject(this, {
    routeType: <any>assignAllDescriptors(this.routeType, routeType),
  });
}

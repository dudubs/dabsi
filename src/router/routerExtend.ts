import { assignAllDescriptors } from "../common/object/assignAllDescriptors";
import { AnyRouter, RouterWithRouterType } from "./Router";

declare module "./Router" {
  interface Router {
    extend: typeof routerExtend;
  }
}

export function routerExtend<T extends AnyRouter, U extends object>(
  this: T,
  routerType: U
): T & RouterWithRouterType<U> {
  routerType = <any>assignAllDescriptors(this.routerType, routerType);

  return Object.setPrototypeOf({ ...this, routerType }, routerType);
}

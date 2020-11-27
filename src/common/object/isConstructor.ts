import { Constructor } from "../typings2/Constructor";

export function isConstructor<T extends object>(
  obj,
  constructor: Constructor<T>
): obj is T {
  return obj.constructor == constructor;
}

import { Constructor } from "../typings2/Constructor";

export function isConstructor<T>(f: Function): f is Constructor<any> {
  return !!f.prototype;
}

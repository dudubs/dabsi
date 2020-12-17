import { isConstructor } from "@dabsi/common/object/isConstructor";

export type Factory<T> = (() => T) | (new () => T);

export function Factory<T>(factory: Factory<T>): T {
  if (isConstructor(factory)) {
    return new factory();
  }
  return factory();
}

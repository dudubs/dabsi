import { isConstructor } from "../object/isConstructor";

export type Factory<T> = (() => T) | (new () => T);

export function Factory<T>(factory: Factory<T>): T {
  if (isConstructor(factory)) {
    return new factory();
  }
  return factory();
}

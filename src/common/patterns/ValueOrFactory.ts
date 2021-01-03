import { Factory } from "./Factory";

export type ValueOrFactory<T> = T | Factory<T>;

export function ValueOrFactory<T>(valueOrFactory: ValueOrFactory<T>): T {
  if (typeof valueOrFactory === "function")
    return Factory(valueOrFactory as Factory<T>);
  return valueOrFactory as T;
}

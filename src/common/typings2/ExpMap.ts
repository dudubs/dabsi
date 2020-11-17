import { Union } from "./Union";

export type ExpMap<T> = Union<
  {
    [K in keyof T]: Record<K, T[K]>;
  }
>;

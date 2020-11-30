import { Union } from "./Union";

export type ExcludeKeys<T, V> = Union<
  {
    [K in keyof T]: T[K] extends V ? never : K;
  }
>;

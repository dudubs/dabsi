import { Union } from "./Union";

export type ExtractKeys<T, V> = Union<
  {
    [K in keyof T]: T[K] extends V ? K : never;
  }
>;

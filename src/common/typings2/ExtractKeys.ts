import { Union } from "@dabsi/common/typings2/Union";

export type ExtractKeys<T, V> = Union<
  {
    [K in keyof T]: T[K] extends V ? K : never;
  }
>;

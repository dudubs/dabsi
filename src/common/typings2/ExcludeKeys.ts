import { Union } from "@dabsi/common/typings2/Union";

export type ExcludeKeys<T, V> = Union<
  {
    [K in keyof T]: T[K] extends V ? never : K;
  }
>;

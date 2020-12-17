import { Union } from "@dabsi/common/typings2/Union";

export type ExpMap<T> = Union<
  {
    [K in keyof T]: Record<K, T[K]>;
  }
>;

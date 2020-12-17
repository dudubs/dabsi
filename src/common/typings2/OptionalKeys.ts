import { Union } from "@dabsi/common/typings2/Union";

export type OptionalKeys<T> = Union<
  {
    [K in keyof T]: T extends Record<K, any> ? never : K;
  }
>;

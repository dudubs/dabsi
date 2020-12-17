import { Union } from "@dabsi/common/typings2/Union";

export type RequiredKeys<T> = Union<
  {
    [K in keyof T]: T extends Record<K, any> ? K : never;
  }
>;

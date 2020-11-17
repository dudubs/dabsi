import { Union } from "./Union";

export type OptionalKeys<T> = Union<
  {
    [K in keyof T]: T extends Record<K, any> ? never : K;
  }
>;

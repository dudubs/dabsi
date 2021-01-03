import { Union } from "./Union";

export type RequiredKeys<T> = Union<
  {
    [K in keyof T]: T extends Record<K, any> ? K : never;
  }
>;

import { Union } from "./Union";

export type ExcludeKeys<T, V> = Exclude<
  Union<
    {
      [K in keyof T]: T[K] extends V ? never : K;
    }
  >,
  never
>;

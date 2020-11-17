import { IsNever } from "./boolean/IsNever";
import { Union } from "./Union";

export type NeverKeys<T> = Union<
  {
    [K in keyof T]: IsNever<T[K]> extends true ? K : never;
  }
>;

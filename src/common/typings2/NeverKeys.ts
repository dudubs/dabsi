import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Union } from "@dabsi/common/typings2/Union";

export type NeverKeys<T> = Union<
  {
    [K in keyof T]: IsNever<T[K]> extends true ? K : never;
  }
>;

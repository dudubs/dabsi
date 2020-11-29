import { If, IsAny, IsUndefined } from "./boolean";
import { IsNever } from "./boolean/IsNever";
import { Or } from "./boolean/Or";
import { Union } from "./Union";

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type PartialUndefinedKeys<T, U = {}> =
  // | (U & T)
  U &
    PartialKeys<
      T,
      Union<
        {
          [K in keyof Required<T>]: If<IsUndefined<T[K]>, K>;
        }
      >
    >;

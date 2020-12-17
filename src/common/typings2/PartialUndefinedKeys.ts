import { If, IsUndefined } from "@dabsi/common/typings2/boolean";
import { Union } from "@dabsi/common/typings2/Union";

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type UndefinedKeys<T> = Union<
  {
    [K in keyof T]: If<IsUndefined<T[K]>, K>;
  }
>;

export type PartialUndefinedKeys<T, U = {}> =
  | (U & T) //
  | (U & PartialKeys<T, UndefinedKeys<T>>);

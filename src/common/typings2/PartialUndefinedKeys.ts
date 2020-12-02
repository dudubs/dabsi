import { If, IsUndefined } from "./boolean";
import { Union } from "./Union";

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type UndefinedKeys<T> = Union<
  {
    [K in keyof T]: If<IsUndefined<T[K]>, K>;
  }
>;

export type PartialUndefinedKeys<T, U = {}> =
  // | (U & T) |
  U & PartialKeys<T, UndefinedKeys<T>>;

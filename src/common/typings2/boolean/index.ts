import { Defined } from "@dabsi/common/typings2/Defined";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";

export type IsAny<T> = 0 extends 1 & T ? true : false;
export type HasKeys<T> = IsNever<T> extends true
  ? false
  : Not<IsNever<keyof T>>;
export type Not<T extends boolean> = T extends true ? false : true;
export type If<C extends boolean, T, E = never> = C extends true ? T : E;
export type IfNot<C extends boolean, T, E = never> = If<C, E, T>;
export type IsUndefined<T> = undefined extends T ? true : false;

export type IfUndefined<T, U, E = Defined<T>> = If<IsUndefined<T>, U, E>;
export type ExtractDefault<T, U, E> = T extends U ? T : E;

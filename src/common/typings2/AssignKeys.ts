import { Assign } from "./Assign";
import { HasKeys } from "@dabsi/common/typings2/boolean";

export type AssignKeys<T, U> = HasKeys<T> extends false
  ? U
  : HasKeys<U> extends false
  ? T
  : Assign<T, U>;

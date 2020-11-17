import { Assign } from "./Assign";
import { HasKeys } from "./boolean";

export type AssignKeys<T, U> = HasKeys<T> extends false
  ? U
  : HasKeys<U> extends false
  ? T
  : Assign<T, U>;

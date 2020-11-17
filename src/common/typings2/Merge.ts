import { AssignKeys } from "./AssignKeys";
import { HasKeys } from "./boolean";

export type Merge<L, R, M> = HasKeys<L> extends false
  ? R
  : HasKeys<R> extends false
  ? L
  : AssignKeys<L, M>;

import { AssignKeys } from "@dabsi/common/typings2/AssignKeys";
import { HasKeys } from "@dabsi/common/typings2/boolean";

export type Merge<L, R, M> = HasKeys<L> extends false
  ? R
  : HasKeys<R> extends false
  ? L
  : AssignKeys<L, M>;

import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";

export type IfNever<T, U, E = never> = IsNever<T> extends true ? U : E;

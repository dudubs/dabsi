import { IsNever } from "./boolean/IsNever";

export type IfNever<T, U, E = T> = IsNever<T> extends true ? U : E;

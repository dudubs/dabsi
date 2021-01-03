import { IsNever } from "./boolean/IsNever";

export type IfNever<T, U, E = never> = IsNever<T> extends true ? U : E;

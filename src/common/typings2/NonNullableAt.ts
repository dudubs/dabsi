import { IsNever } from "./boolean/IsNever";

export type NonNullableAt<
  T,
  K extends keyof Required<T>,
  D = never,
  V = NonNullable<T[K]>
> = IsNever<V> extends true ? D : V;

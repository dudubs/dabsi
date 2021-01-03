import { IsNever } from "./boolean/IsNever";

export type Pluck<
  T,
  K extends PropertyKey,
  Never = never
> = IsNever<T> extends true
  ? Never
  : Required<T> extends Record<K, infer U>
  ? U
  : Never;

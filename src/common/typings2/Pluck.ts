import { IsNever } from "./boolean/IsNever";

export type PluckDefined<
  T,
  K extends PropertyKey,
  Never = never
> = IsNever<T> extends true
  ? Never
  : Required<T> extends Record<K, infer U>
  ? U
  : Never;

export type Pluck<T, K> = K extends keyof T ? T[K] : never;

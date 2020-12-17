import { RequiredKeys } from "@dabsi/common/typings2/RequiredKeys";

export type OptionalOnly<T, K extends keyof T = never> = Omit<
  T,
  Exclude<RequiredKeys<T>, K>
>;

import { RequiredKeys } from "./RequiredKeys";

export type OptionalOnly<T, K extends keyof T = never> = Omit<
  T,
  Exclude<RequiredKeys<T>, K>
>;

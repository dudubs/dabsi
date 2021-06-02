import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";

export type PartialConfigKeys<
  T extends {
    OptionalConfig;
    RequiredConfig;
  },
  K extends keyof T["OptionalConfig"] | keyof T["RequiredConfig"] = never
> = PartialUndefinedKeys<
  Omit<T["OptionalConfig"], K>,
  Omit<T["RequiredConfig"], K>
>;

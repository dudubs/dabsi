import { Builder } from "@dabsi/common/object/buildObject";

export function defaultBuilder<T>(defaultValue: T): Builder<T | undefined> {
  return value => value ?? defaultValue;
}

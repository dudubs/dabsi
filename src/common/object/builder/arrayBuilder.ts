import { Builder } from "@dabsi/common/object/buildObject";

export function arrayBuilder<T>(
  ...builders: (T[] | ((value: T, index: number) => boolean))[]
): Builder<T[] | undefined> {
  return value => {
    for (let builder of builders) {
      if (typeof builder === "function") {
        value = value?.filter(builder);
      } else {
        value = value ? [...value, ...builder] : builder;
      }
    }
    return value;
  };
}

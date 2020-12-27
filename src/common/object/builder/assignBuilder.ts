import { Builder } from "@dabsi/common/object/buildObject";

export function assignBuilder<T>(props: Partial<T>): Builder<T> {
  return obj => {
    return { ...obj, ...props };
  };
}

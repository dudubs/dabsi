import { ExcludeKeys } from "@dabsi/common/typings2/ExcludeKeys";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { entries } from "@dabsi/common/object/entries";

export type Builder<T> = (prev: T) => T;

export type ValueOrBuilder<T> = Exclude<T, Builder<any>> | Builder<T>;

export type PropsBuilder<T> = {
  [K in keyof Required<T>]?: ValueOrBuilder<T[K]>;
};

export type FnBuilder<T> = <U extends T>(value: U) => void;

export type AssignBuilder<T> = (Partial<T> | undefined)[];

export type ObjectBuilder<T> =
  | PropsBuilder<T>
  | FnBuilder<T>
  | AssignBuilder<T>;

export function buildObjectProps<T>(props: T, keyToBuilder: PropsBuilder<T>) {
  for (let [key, builderOrValue] of entries(keyToBuilder)) {
    if (typeof builderOrValue === "function") {
      props[key] = builderOrValue(props[key]);
    } else {
      props[key] = builderOrValue;
    }
  }
}

export function buildObject<T>(obj: T, ...builders: ObjectBuilder<T>[]) {
  return _buildObject(obj, builders);
}

export function _buildObject<T>(obj: T, builders: ObjectBuilder<T>[]) {
  obj = { ...obj };
  for (let builder of builders) {
    switch (typeof builder) {
      case "function":
        builder(obj);
        break;
      case "object":
        if (Array.isArray(builder)) {
          for (let props of builder) {
            Object.assign(obj, props);
          }
        } else {
          buildObjectProps(obj, builder);
        }
        break;
    }
  }
  return obj;
}

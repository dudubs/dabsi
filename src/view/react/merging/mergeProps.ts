import { entries } from "@dabsi/common/object/entries";
import { ReactRef } from "@dabsi/view/react/ref";
import { merge } from "immutable4";
import { mergeCallbacks } from "./mergeCallbacks";

export type PropMerger<T> =
  | Record<"$merge", MergeProps<T> | ((value: T | undefined) => T)>
  | Record<"$default", T>
  | Record<"$override", T>;

export type MergeProp<T> =
  | Exclude<T, PropMerger<any>>
  | PropMerger<T>
  | (T extends object ? MergeProps<T> : never);

export type MergeProps<P> = {
  [K in keyof Required<P>]?: MergeProp<P[K]>;
};

export function mergeProps<P, E extends MergeProps<P>>(
  propMap: P | undefined,
  mergerMap: E
): P & E {
  let _props = { ...propMap };

  for (let [key, merger] of entries(mergerMap)) {
    try {
      _props[key] = mergeProp(_props[key], merger);
    } catch (error) {
      if (error.constructor === MergeError) {
        error.message = `at ${JSON.stringify(key)}, ${error.message}`;
      }
      throw error;
    }
  }

  return _props as any;
}

class MergeError extends Error {}

export function mergeProp(value, merger) {
  const mergerType = typeof merger;
  const valueType = typeof value;

  // TODO: $reverse

  if (mergerType === "undefined") {
    return value ?? merger;
  }
  if (ReactRef.isRefObject(value) || ReactRef.isRefObject(merger)) {
    return ReactRef.merge(value, merger);
  }

  if (merger && mergerType === "object") {
    if (merger.constructor !== Object) {
      return merger;
    }

    if ("$default" in merger) {
      return value ?? merger.$default;
    }

    if ("$override" in merger) {
      return merger.$override;
    }

    if (typeof merger.$merge === "function") {
      return merger.$merge(value);
    }

    if (typeof merger.$merge === "object") {
      return mergeProps(value, merger.$merge);
    }

    if (merger.type && merger.props) {
      // react-element
      return merger;
    }
    throw new MergeError(`Can't merge object`);
  }

  if (valueType === mergerType) {
    switch (valueType) {
      case "string":
        return `${value} ${merger}`;
      case "function":
        return mergeCallbacks(value, merger);
    }
  }

  return merger;
}

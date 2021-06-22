import { entries } from "@dabsi/common/object/entries";
import { locateError } from "@dabsi/typemodule/locateError";
import { ReactRef } from "@dabsi/view/react/ref";

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

export default function mergeProps<P, E extends MergeProps<P>>(
  propMap: P | undefined,
  mergerMap: E
): P & E {
  let _props = { ...propMap };

  for (let [key, merger] of entries(mergerMap)) {
    try {
      _props[key] = _mergeProp(_props[key], merger);
    } catch (error) {
      throw locateError(error, `mergining ${JSON.stringify(key)}`);
    }
  }

  return _props as any;
}

export function _mergeProp(value, merger) {
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
    throw new Error(`Can't merge object`);
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

export function mergeCallbacks(prevCallback: Function, nextCallback: Function) {
  return function (this: any) {
    const prevResult = prevCallback.apply(this, arguments);
    return nextCallback.apply(this, arguments) ?? prevResult;
  };
}

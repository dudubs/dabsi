import { entries } from "@dabsi/common/object/entries";
import { ReactRef } from "@dabsi/view/react/ref";
import { mergeCallbacks } from "./mergeCallbacks";

export const $merge = "$merge";
const $default = "$default";

export type BaseMergeProp<T> =
  | Record<typeof $merge, (value: T) => T>
  | Record<typeof $default, T>;

export type MergeProp<T> =
  | Exclude<T, BaseMergeProp<any>>
  | BaseMergeProp<T>
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
    _props[key] = mergeProp(_props[key], merger);
  }

  return _props as any;
}

export function mergeProp(prop, merger) {
  const mergerType = typeof merger;
  const propType = typeof prop;

  // TODO: $reverse

  if (mergerType === "undefined") {
    return prop ?? merger;
  }
  if (ReactRef.isRefObject(prop) || ReactRef.isRefObject(merger)) {
    return ReactRef.merge(prop, merger);
  }

  if (merger && mergerType === "object") {
    if ($default in merger) {
      return prop ?? merger[$default];
    }

    const customMergeProp = merger[$merge];
    if (typeof customMergeProp === "function") {
      return customMergeProp.call(merger, prop);
    }
    if (propType === "undefined") {
      if (Object.getPrototypeOf(merger) === Object.prototype)
        return mergeProps({}, merger);
    }
  }

  if (propType === mergerType) {
    switch (propType) {
      case "string":
        return `${prop} ${merger}`;
      case "function":
        return mergeCallbacks(prop, merger);
      case "object":
        throw new Error(`Can't merge object`);
    }
  }

  return merger;
}

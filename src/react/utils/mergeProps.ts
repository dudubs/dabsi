import { Ref } from "react";
import { entries } from "../../common/object/entries";
import { setRef } from "./setRef";

export const $merge = "$merge";
const $default = "$default";

export type PropMerger<T> =
  | Record<typeof $merge, (value: T) => T>
  | Record<typeof $default, T>;

function mergeCallbacks(prevCallback: Function, nextCallback: Function) {
  return function (this: any) {
    const prevResult = prevCallback.apply(this, arguments);
    return nextCallback.apply(this, arguments) ?? prevResult;
  };
}

function mergeRefs(prevRef, nextRef) {
  return (current) => {
    setRef(prevRef, current);
    setRef(nextRef, current);
  };
}

export function mergeProp(prevValue, nextValue) {
  const nextType = typeof nextValue;

  const prevType = typeof prevValue;

  // TODO: $reverse

  if (nextValue && nextType === "object") {
    if ($default in nextValue) {
      return prevValue ?? nextValue[$default];
    }

    const merger = nextValue[$merge];
    if (typeof merger === "function") {
      return merger.call(nextValue, prevValue);
    }
    if (prevType === "undefined") {
      if (Object.getPrototypeOf(nextValue) === Object.prototype)
        return mergeProps({}, nextValue);
    }
  }

  if (nextType === "undefined") {
    return prevValue ?? nextValue;
  }

  if (isRefObject(prevValue) || isRefObject(nextValue)) {
    return mergeRefs(prevValue, nextValue);
  }

  if (prevType === nextType) {
    switch (prevType) {
      case "string":
        return `${prevValue} ${nextValue}`;
      case "function":
        return mergeCallbacks(prevValue, nextValue);
      case "object":
        if (Array.isArray(prevType) && Array.isArray(nextType)) {
          console.info("mergeBetweenArrays");
          return [...prevValue, ...nextValue];
        }
        return mergeProps(prevValue, nextValue);
    }
  }

  return nextValue;
}

export type NextProp<T> =
  | Exclude<T, PropMerger<any>>
  | PropMerger<T>
  | (T extends object ? NextProps<T> : never);

export type NextProps<P> = {
  [K in keyof Required<P>]?: NextProp<P[K]>;
};

/*

 */

export function mergeProps<P, E extends NextProps<P>>(
  prevProps: P | undefined,
  nextProps: E
): P & E {
  let _props = { ...prevProps };

  for (let [key, nextValue] of entries(nextProps)) {
    _props[key] = mergeProp(_props[key], nextValue);
  }

  return _props as any;
}

export function isRefObject(o): o is React.RefObject<any> {
  return o && typeof o === "object" && "current" in o;
}

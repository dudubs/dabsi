import { mapObject } from "@dabsi/common/object/mapObject";

export function bindObject<T extends object, U extends any[]>(
  ns: T,
  ...nsArgs: U
): {
  [K in keyof T]: T[K] extends (...args: [...U, ...infer A]) => any
    ? (...args: A) => ReturnType<T[K]>
    : never;
} {
  return <any>mapObject(ns as any, (v, k) => {
    if (typeof v === "function") {
      return function (this, ...args) {
        return ns[k].call(this, ...nsArgs, ...args);
      };
    }
  });
}

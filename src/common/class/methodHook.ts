import { Fn } from "@dabsi/common/typings2/Fn";

export default function methodHook<T, K extends keyof T>(
  target: T,
  propertyName: K,
  getFn: (
    original: T[K]
  ) => (
    this: T,
    ...args: Parameters<Extract<T[K], Fn>>
  ) => ReturnType<Extract<T[K], Fn>>
) {
  target[propertyName] = <any>getFn(target[propertyName]);
}

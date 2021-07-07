import { entries } from "@dabsi/common/object/entries";

export default function assignDescriptors<T, U>(
  target: T,
  source: U,
  ignore?: (keyof T)[]
): T & Omit<U, keyof T> {
  if (!source) return <any>target;
  for (const [key, descriptor] of entries(
    Object.getOwnPropertyDescriptors(source)
  )) {
    if (key in target) {
      if (ignore && ignore.indexOf(<any>key) > -1) continue;
      throw new Error(`Can't override descriptor of "${key}".`);
    }
    Object.defineProperty(target, key, descriptor);
  }
  return <any>target;
}

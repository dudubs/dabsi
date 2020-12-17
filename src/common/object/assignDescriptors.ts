import { entries } from "@dabsi/common/object/entries";

export function assignDescriptors<T extends object, U extends object>(
  source: T,
  target: U
): Omit<T, keyof U> & U {
  for (const [key, desc] of entries(Object.getOwnPropertyDescriptors(source))) {
    if (!target.hasOwnProperty(key)) {
      Object.defineProperty(target, key, desc);
    }
  }

  return Object.setPrototypeOf(target, source);
}

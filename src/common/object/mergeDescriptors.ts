import { entries } from "./entries";

export function mergeDescriptors<T extends object, U extends object>(
  base: T,
  child: U
): Omit<T, keyof U> & U {
  for (const [key, desc] of entries(Object.getOwnPropertyDescriptors(base))) {
    if (!child.hasOwnProperty(key)) {
      Object.defineProperty(child, key, desc);
    }
  }

  return Object.setPrototypeOf(child, base);
}

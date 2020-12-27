import { defined } from "@dabsi/common/object/defined";

export function definedAt<T, K extends keyof T>(
  obj: T,
  key: K
): NonNullable<T[K]> {
  return defined(obj[key], () => `No ${key}`);
}

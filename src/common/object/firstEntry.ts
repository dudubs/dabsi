import { firstKey } from "@dabsi/common/object/firstKey";

export function firstEntry<T = any>(obj: Record<string, T>): [string, T] | [] {
  const key = firstKey(obj);
  if (key !== undefined) return [key, obj[key]];
  return [];
}

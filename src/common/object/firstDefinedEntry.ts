import { defined } from "@dabsi/common/object/defined";
import { firstEntry } from "@dabsi/common/object/firstEntry";

export function firstDefinedEntry<T = any>(
  obj: Record<string, T>
): [string, T] {
  const entry = firstEntry(obj);
  return defined(entry.length ? entry : undefined, `No entry for ${obj}`);
}

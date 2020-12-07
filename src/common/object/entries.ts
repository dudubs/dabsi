import { keys } from "./keys";

export function* entries<V = any>(
  obj: Record<string, V> | undefined | null
): IterableIterator<[string, V, number, boolean]> {
  let index = 0;
  let lastKey: any = null;
  if (!obj) return;
  for (const key of keys(obj)) {
    if (lastKey !== null) {
      yield [lastKey, obj[lastKey], index++, false];
    }
    lastKey = key;
  }
  if (lastKey !== null) {
    yield [lastKey, obj[lastKey], index, true];
  }
}

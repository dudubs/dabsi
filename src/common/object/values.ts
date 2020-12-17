import { keys } from "@dabsi/common/object/keys";

export function* values<T>(obj: Record<string, T>): IterableIterator<T> {
  for (const key of keys(obj)) {
    yield obj[key];
  }
}

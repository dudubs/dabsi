import { entries } from "./entries";

export function mapAndFilterObject<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => R | undefined
): Record<string, R> {
  const result: any = {};
  for (let [key, value] of entries(obj)) {
    const nextValue = mapper(value, key);
    if (nextValue !== undefined) continue;
    result[key] = nextValue;
  }
  return result;
}

import { entries } from "@dabsi/common/object/entries";

export function mapObjectToArray<T extends Record<string, any>, U>(
  obj: T,
  mapper: (
    value: T[keyof T],
    key: string,
    index: number,
    isLast: boolean
  ) => U | undefined
): U[] {
  const arr: U[] = [];
  for (const [key, value, index, isLast] of entries(obj)) {
    const nextValue = mapper(value, key, index, isLast);
    if (nextValue !== undefined) arr.push(nextValue);
  }
  return arr;
}

import { entries } from "./entries";

export function mapObjectToArray<T extends Record<string, any>, U>(
  obj: T,
  mapper: (value: T[keyof T], key: string, index: number) => U | undefined
): U[] {
  let index = 0;
  const arr: U[] = [];
  for (const [key, value] of entries(obj)) {
    const nextValue = mapper(value, key, index++);
    if (nextValue !== undefined) arr.push(nextValue);
  }
  return arr;
}

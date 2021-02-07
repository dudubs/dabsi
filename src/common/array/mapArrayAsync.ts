import { Awaitable } from "@dabsi/common/typings2/Async";

export default async function <T, U>(
  array: T[],
  callback: (item: T, index: number) => Awaitable<U>
): Promise<U[]> {
  const result: U[] = [];
  for (const [index, item] of array.entries()) {
    result.push(await callback(item, index));
  }
  return result;
}

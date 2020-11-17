import { Awaitable } from "../typings2/Async";
import { entries } from "./entries";

export function mapObject<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => R
): Record<string, R> {
  const result: any = {};
  for (const [key, value] of entries(obj)) {
    result[key] = mapper(value, key);
  }
  return result;
}

export async function mapObjectAsync<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => Awaitable<R>
): Promise<Record<string, R>> {
  const result: any = {};
  for (const [key, value] of entries(obj)) {
    result[key] = await mapper(value, key);
  }
  return result;
}

import { Awaitable } from "@dabsi/common/typings2/Async";

export async function toAsync<T>(callback: () => Awaitable<T>): Promise<T> {
  return callback();
}

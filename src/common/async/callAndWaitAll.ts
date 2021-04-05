import { Fn } from "@dabsi/common/typings2/Fn";

export async function callAndWaitAll<T extends Fn>(
  callbacks: T[],
  ...args: Parameters<T>
): Promise<any[]> {
  return Promise.all(callbacks.map(callback => callback.apply(null, args)));
}

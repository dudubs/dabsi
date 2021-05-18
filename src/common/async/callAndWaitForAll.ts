import { Fn } from "@dabsi/common/typings2/Fn";

export default async function callAndWaitForAll<T extends Fn>(
  callbacks: T[],
  ...args: Parameters<T>
): Promise<any[]> {
  return Promise.all(callbacks.map(callback => callback.apply(null, args)));
}

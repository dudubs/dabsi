import { Waiter } from "@dabsi/common/async/Waiter";
import { entries } from "@dabsi/common/object/entries";
import { Awaitable, Awaited } from "@dabsi/common/typings2/Async";

export type AwaitableMap = Record<string, Awaitable>;

export function AwaitableMap<T extends AwaitableMap>(
  awaitableMap: T
): Promise<
  {
    [K in keyof T]: Awaited<T[K]>;
  }
> {
  const result: any = {};
  const waiter = Waiter<void>();
  let counter = 0;
  for (const [key, awaitable] of entries(awaitableMap)) {
    counter++;
    Promise.resolve(awaitable)
      .then(value => {
        result[key] = value;
        if (!--counter) {
          waiter.resolve();
        }
      })
      .catch(error => {
        waiter.reject(error);
      });
  }

  if (!counter) {
    waiter.resolve();
  }
  return waiter.then(() => result);
}

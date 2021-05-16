import { Timeout } from "@dabsi/common/async/Timeout";
import { Awaitable } from "@dabsi/common/typings2/Async";

export async function waitFor<T>(
  callback: () => Awaitable<T | undefined>,
  ms = 50
): Promise<T> {
  while (true) {
    const value = await callback();
    if (value !== undefined) {
      return value;
    }
    await Timeout(ms);
  }
}

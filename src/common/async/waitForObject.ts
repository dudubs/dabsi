import { entries } from "@dabsi/common/object/entries";
import { values } from "@dabsi/common/object/values";
import { Awaitable, Awaited } from "@dabsi/common/typings2/Async";

export function waitForObject<T extends Record<string, Awaitable>>(
  o: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  const result: any = {};
  const promises: any[] = [];
  for (const [key, value] of entries(o)) {
    promises.push(
      Promise.resolve(value).then(value => {
        result[key] = value;
      })
    );
  }
  return Promise.all(promises).then(() => result);
}

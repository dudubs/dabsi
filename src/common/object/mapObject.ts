import { Awaitable } from "@dabsi/common/typings2/Async";
import { entries } from "@dabsi/common/object/entries";

export function mapObject<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string, index: number, isLast: boolean) => R,
  alias?: (key: string) => string
): Record<string, R> {
  const result: any = {};
  for (const [key, value, index, isLast] of entries(obj)) {
    result[alias ? alias(key) : key] = mapper(value, key, index, isLast);
  }
  return result;
}

export function mapObjectAsync<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => Awaitable<R>
): Promise<Record<string, R>> {
  const result: any = {};
  const promises: Promise<any>[] = [];
  const errors: { key; error }[] = [];
  for (const [key, value] of entries(obj)) {
    promises.push(
      Promise.resolve(mapper(value, key))
        .then(value => {
          result[key] = value;
        })
        .catch(error => {
          errors.push({ error, key });
        })
    );
  }
  return Promise.all(promises).then(() => {
    if (errors.length) {
      const [{ key, error }] = errors;
      if (typeof error.stack === "string") {
        error.stack = error.stack.replace(/(\n\s*at\s+)/, x =>
          [x, `key ${JSON.stringify(key)}`, x].join("")
        );
      }
      throw error;
    }
    return result;
  });
}

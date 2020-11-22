import { ExtractKeys } from "../typings2/ExtractKeys";
import { Fn } from "../typings2/Fn";

export function pushAsyncHook<T, K extends ExtractKeys<T, Fn>>(
  where: T,
  key: K,
  next: T[K] | undefined,
  after: boolean = false
) {
  if (!next) return;
  const prev = where[key] as Fn;
  where[key] = after ? <any>async function (this) {
        await prev.apply(this, arguments);
        return await (next as any).apply(this, arguments);
      } : <any>async function (this) {
        await (next as any).apply(this, arguments);
        return await prev.apply(this, arguments);
      };
}

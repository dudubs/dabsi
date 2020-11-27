import { ExtractKeys } from "../typings2/ExtractKeys";
import { Fn } from "../typings2/Fn";
import { isPromiseLike } from "./isPromiseLike";

export function pushHook<T, K extends ExtractKeys<T, Fn>>(
  where: T,
  key: K,
  next: T[K] | undefined,
  inverse: boolean = false
) {
  if (!next) return;
  const prev = where[key] as Fn;
  where[key] = <any>function (this, ...args) {
    return inverse
      ? chainFn(next, prev, this, args)
      : chainFn(prev, next, this, args);
  };
}

export function chainFn(prev, next, thisArg, args) {
  const result = prev.apply(thisArg, args);
  if (isPromiseLike(result)) {
    return Promise.resolve(result).then(() => next.apply(thisArg, args));
  }
  return next.apply(thisArg, args);
}

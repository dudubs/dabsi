import { from, MonoTypeOperatorFunction, pipe } from "rxjs";
import { concatMap, filter, map } from "rxjs/operators";
import { Awaitable } from "@dabsi/common/typings2/Async";

export function filterAsync<T>(
  predicate: (value: T, index: number) => Awaitable<boolean>,
  thisArg?: any
): MonoTypeOperatorFunction<T>;
export function filterAsync(predicate) {
  return pipe(
    concatMap(async value => {
      return { value, filter: !!(await from(predicate(value)).toPromise()) };
    }),
    filter(x => x.filter),
    map(x => x.value)
  );
}

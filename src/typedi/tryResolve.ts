import catchError from "@dabsi/common/async/catchError";
import { resolve } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

export function tryResolve<T, U = undefined>(
  resolver: Resolver<T>,
  other?: Resolver<U>
) {
  return (context => {
    return catchError(
      ResolveError,
      () => resolve(resolver, context),
      () => {
        if (other) {
          return Resolver.resolve(other, context);
        }
      }
    );
  }).toCheck(context => {
    other && Resolver.check(other, context);
  });
}

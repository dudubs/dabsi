import catchError from "@dabsi/common/async/catchError";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver } from "@dabsi/typedi/Resolver";

const _operator = "try";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T, U = undefined>(resolver: Resolver<T>, other?: Resolver<U>) {
  return (context => {
    return catchError(
      ResolveError,
      () => Resolver.resolve(resolver, context),
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

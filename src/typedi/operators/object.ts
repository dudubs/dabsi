import catchError from "@dabsi/common/async/catchError";
import { createObjectProxy } from "@dabsi/common/object/createObjectProxy";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  ResolverContext,
  CustomResolver,
  IResolver,
  Resolver,
  ResolverType,
} from "@dabsi/typedi/Resolver";

const _operator = "object";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T extends ResolverContext>(
  resolverMap: T
): CustomResolver<
  {
    [K in keyof T]: ResolverType<T[K]>;
  }
> {
  const resolve = createObjectProxy(resolverMap, (resolver, key, context) =>
    catchError(
      ResolveError,
      () => Resolver.resolve(resolver, context),
      error => {
        throw new ResolveError(`at key '${key}':${error.message}`);
      }
    )
  );
  return ((context): any => {
    return resolve(context);
  }).toCheck(context => {
    Resolver.checkObject(resolverMap, context);
  });
}

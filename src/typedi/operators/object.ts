import catchError from "@dabsi/common/async/catchError";
import { createObjectProxy } from "@dabsi/common/object/createObjectProxy";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  CustomResolver,
  Resolved,
  Resolver,
  ResolverMap,
} from "@dabsi/typedi/Resolver";

const NAME = "object";

Resolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T extends ResolverMap>(
  resolverMap: T
): CustomResolver<
  {
    [K in keyof T]: Resolved<T[K]>;
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

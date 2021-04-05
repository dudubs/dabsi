import catchError from "@dabsi/common/async/catchError";
import { createObjectProxy } from "@dabsi/common/object/createObjectProxy";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    object<T extends ResolverMap>(
      resolverMap: T
    ): CustomResolver<
      {
        [K in keyof T]: Resolved<T[K]>;
      }
    >;
  }
}

Resolver.object = function (resolverMap) {
  const resolve = createObjectProxy(resolverMap, (resolver, key, context) =>
    catchError(
      ResolveError,
      () => Resolver.resolve(resolver, context),
      error => {
        throw new ResolveError(`at key '${key}':${error.message}`);
      }
    )
  );
  return Resolver.create(
    (context): any => {
      return resolve(context);
    },
    context => {
      Resolver.checkObject(resolverMap, context);
    }
  );
};

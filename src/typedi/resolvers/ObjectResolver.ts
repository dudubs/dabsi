import catchError from "@dabsi/common/async/catchError";
import { createObjectProxy } from "@dabsi/common/object/createObjectProxy";
import { entries } from "@dabsi/common/object/entries";
import nested from "@dabsi/common/string/nested";
import { checkResolver } from "@dabsi/typedi/operators/checkResolver";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, Resolver, ResolverType } from "@dabsi/typedi/Resolver";

export type AnyResolverMap<T = any> = Record<string, Resolver<T>>;

export function ObjectResolver<T extends AnyResolverMap>(
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
    checkResolverMap(resolverMap, context);
  });
}

export function checkResolverMap(
  resolverMap: AnyResolverMap,
  context: AnyResolverMap
) {
  const errors: [key: string, message: string][] = [];
  let message = "";
  for (const [key, resolver] of entries(resolverMap)) {
    try {
      checkResolver(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        errors.push([key, error.message]);
        message += `${message ? "\nAlso at" : "At"} key '${key}':${nested(
          error.message
        )}`;
        continue;
      }
      throw error;
    }
  }
  if (message) {
    throw new ResolveError(message);
  }
}

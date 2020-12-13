import { createObjectProxy } from "../../common/object/createObjectProxy";
import { entries } from "../../common/object/entries";
import { inspect } from "../../logging/inspect";
import { ResolveError } from "../ResolveError";
import { CustomResolver, Resolver, ResolverType } from "../Resolver";
import { checkResolver } from "../operators/checkResolver";

export type AnyResolverMap<T = any> = Record<string, Resolver<T>>;

export function ObjectResolver<T extends AnyResolverMap>(
  resolverMap: T
): CustomResolver<
  {
    [K in keyof T]: ResolverType<T[K]>;
  }
> {
  const resolve = createObjectProxy(resolverMap, (resolver, _, context) =>
    Resolver.resolve(resolver, context)
  );
  return ((context): any => {
    return resolve(context);
  }).toCheck(context => {
    for (const [key, resolver] of entries(resolverMap)) {
      try {
        checkResolver(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          throw new ResolveError(`at key ${inspect(key)}, ${error.message}`);
        }
        throw error;
      }
    }
  });
}

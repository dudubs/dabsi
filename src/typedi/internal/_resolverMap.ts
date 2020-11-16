import { entries } from "../../common/object/entries";
import { mapObject } from "../../common/object/mapObject";
import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { CustomResolver, Resolver, ResolverType } from "../Resolver";
import { ResolveError } from "../ResolveError";

export type AnyResolveMap = Record<string, Resolver>;

export function _resolverMap<T extends AnyResolveMap>(
  resolveMap: T
): CustomResolver<
  {
    [K in keyof T]: ResolverType<T[K]>;
  }
> {
  return ((context): any => {
    return mapObject(resolveMap, resolver => _resolve(resolver, context));
  }).toCheck(context => {
    for (const [key, resolver] of entries(resolveMap)) {
      try {
        _check(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          throw new ResolveError(`at key:${key}, ${error.message}`);
        }
        throw error;
      }
    }
  });
}

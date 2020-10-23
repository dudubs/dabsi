import { entries } from "../common/object/entries";
import { mapObject } from "../common/object/mapObject";
import { CustomResolver, Resolver, ResolverType } from "./Resolver";

export type AnyResolveMap = Record<string, Resolver>;

export function ResolveMap<T extends AnyResolveMap>(
  resolveMap: T
): CustomResolver<
  {
    [K in keyof T]: ResolverType<T[K]>;
  }
> {
  return ((context): any => {
    return mapObject(resolveMap, resolver =>
      Resolver.resolve(resolver, context)
    );
  }).toCheck(context => {
    for (const [key, resolver] of entries(resolveMap)) {
      Resolver.check(resolver, context);
    }
  });
}

// AssignResolver(AppContext, UserContext)

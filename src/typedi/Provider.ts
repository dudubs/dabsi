import { flatObject } from "@dabsi/common/object/flatObject";
import { checkResolverSymbol } from "@dabsi/typedi/operators/checkResolver";
import { resolveSymbol } from "@dabsi/typedi/resolve";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

export function Provider(
  resolverMap: ResolverMap<any>
): <T>(resolver: Resolver<T>) => CustomResolver<T>;
export function Provider(context) {
  context = flatObject(context);

  return (resolver) => {
    return ((parentContext) => {
      return resolver[resolveSymbol](
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    }).toCheck((parentContext) => {
      resolver[checkResolverSymbol]?.(
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    });
  };
}

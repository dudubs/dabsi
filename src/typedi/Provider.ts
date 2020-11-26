import { flatObject } from "../common/object/flatObject";
import { checkResolverSymbol } from "./operators/checkResolver";
import { resolveSymbol } from "./resolve";
import { CustomResolver, Resolver, ResolverMap } from "./Resolver";

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

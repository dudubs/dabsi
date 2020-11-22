import { flatObject } from "../common/object/flatObject";
import { Type } from "../common/typings2/Type";
import { checkResolverSymbol } from "./checkResolver";
import { resolveSymbol } from "./resolve";
import { ResolverMap, CustomResolver, Resolver } from "./Resolver";

export function Provider(
  context: ResolverMap<any>
): <T>(resolver: Resolver<T>) => CustomResolver<T>;
export function Provider(context) {
  context = flatObject(context);

  return resolver => {
    return (parentContext => {
      return resolver[resolveSymbol](
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    }).toCheck(parentContext => {
      resolver[checkResolverSymbol]?.(
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    });
  };
}

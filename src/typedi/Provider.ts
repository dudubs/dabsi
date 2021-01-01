import { flatObject } from "@dabsi/common/object/flatObject";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

export function Provider(
  resolverMap: ResolverMap<any>
): <T>(resolver: Resolver<T>) => CustomResolver<T>;
export function Provider(context) {
  context = flatObject(context);

  return resolver => {
    return (parentContext => {
      return resolver[Resolver.resolveSymbol](
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    }).toCheck(parentContext => {
      resolver[Resolver.checkSymbol]?.(
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    });
  };
}

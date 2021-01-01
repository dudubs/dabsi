import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Forward } from "@dabsi/typedi/Forward";
import { Resolver } from "@dabsi/typedi";

export const getInjectableMetadata = WeakMapFactory((target: Function) => {
  return {
    target,
    isInjectable: false,
    resolvers: [] as Resolver[],
  };
});

export const getInjectableResolver = WeakMapFactory(
  (target: Function): Resolver<any[]> => {
    const designParamTypes: Function[] =
      Reflect.getMetadata("design:paramtypes", target) || [];

    const metadata = getInjectableMetadata(target);
    return Resolver.array(
      designParamTypes.map((designType, index) => {
        let resolverCache;
        return (
          metadata.resolvers[index] ??
          (context => {
            return Resolver.resolve(getResolver(), context);
          }).toCheck(context => {
            Resolver.check(getResolver(), context);
          })
        );

        function getResolver(): Resolver {
          return (
            resolverCache ||
            (resolverCache =
              Forward.getParameterType(target, index) || designType)
          );
        }
      })
    );
  }
);

export function Injectable() {
  return target => {
    const metadata = getInjectableMetadata(target);
    metadata.isInjectable = true;
    const paramsResolver = getInjectableResolver(target);

    target[Resolver.resolveSymbol] = function (context) {
      if (metadata.target !== this) {
        return Resolver.resolveType(this, context);
      }
      return new this(...Resolver.resolve(paramsResolver, context));
    };

    target[Resolver.checkSymbol] = function (context) {
      if (metadata.target !== this) {
        return Resolver.checkType(this, context);
      }
      Resolver.check(paramsResolver, context);
    };
  };
}

import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Resolver } from "@dabsi/typedi";
import { Forward } from "@dabsi/typedi/Forward";

export const getInjectableMetadata = WeakMapFactory((target: Function) => {
  return {
    target,
    isInjectable: false,
    resolvers: [] as Resolver[],
  };
});
export function getDesignParamTypes(target: Function): Function[] {
  return Reflect.getMetadata("design:paramtypes", target) || [];
}
export const getInjectableResolver = WeakMapFactory(
  (target: Function): Resolver<any[]> => {
    const designParamTypes = getDesignParamTypes(target);

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
      }),
      index => {
        return target
          .toString()
          .match(/constructor\s*\((?<args>[^)]+)\)/)
          ?.groups?.args.split(",")[0];
      }
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

import { WeakMapFactory } from "../common/map/mapFactory";
import { checkResolver, checkResolverSymbol } from "./checkResolver";
import { checkTypeResolver } from "./checkTypeResolver";
import { resolve, resolveSymbol } from "./resolve";
import { ArrayResolver } from "./ArrayResolver";
import { Forward } from "./Forward";
import { Resolver } from "./Resolver";
import { resolveType } from "./resolveType";

import "./FnResolver";
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
    return ArrayResolver(
      designParamTypes.map((designType, index) => {
        let resolverCache;
        return (
          metadata.resolvers[index] ??
          (context => {
            return resolve(getResolver(), context);
          }).toCheck(context => {
            checkResolver(getResolver(), context);
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
    target[resolveSymbol] = function (context) {
      if (metadata.target !== this) {
        return resolveType(this, context);
      }
      return new this(...resolve(paramsResolver, context));
    };

    target[checkResolverSymbol] = function (context) {
      if (metadata.target !== this) {
        return checkTypeResolver(this, context);
      }
      checkResolver(paramsResolver, context);
    };
  };
}

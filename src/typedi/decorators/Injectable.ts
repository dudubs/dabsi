import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import {
  checkResolver,
  checkResolverSymbol,
} from "@dabsi/typedi/operators/checkResolver";
import { checkTypeResolver } from "@dabsi/typedi/operators/checkTypeResolver";
import { resolve, resolveSymbol } from "@dabsi/typedi/resolve";
import { ArrayResolver } from "@dabsi/typedi/resolvers/ArrayResolver";
import { Forward } from "@dabsi/typedi/Forward";
import { Resolver } from "@dabsi/typedi/Resolver";
import { resolveType } from "@dabsi/typedi/resolveType";

import "@dabsi/typedi/resolvers/FnResolver";
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

import { WeakMapFactory } from "../common/map/mapFactory";
import { _check, checkSymbol } from "./internal/_check";
import { _checkType } from "./internal/_checkType";
import { _resolve, resolveSymbol } from "./internal/_resolve";
import { _arrayResolver } from "./internal/_arrayResolver";
import { Forward } from "./Forward";
import { Resolver } from "./Resolver";
import { _resolveType } from "./internal/_resolveType";

import "./FnResolver";
export const getInjectableMetadata = WeakMapFactory((target: Function) => {
  return {
    target,
    isInjectable: false,
    resolvers: [] as Resolver[],
  };
});

export function Injectable() {
  return target => {
    const designParamTypes: Function[] = Reflect.getMetadata(
      "design:paramtypes",
      target
    );

    const metadata = getInjectableMetadata(target);
    metadata.isInjectable = true;
    const paramsResolver = _arrayResolver(
      designParamTypes.map((designType, index) => {
        let resolverCache;

        return (
          metadata.resolvers[index] ??
          (context => {
            return _resolve(getResolver(), context);
          }).toCheck(context => {
            _check(getResolver(), context);
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
    target[resolveSymbol] = function (context) {
      if (metadata.target !== this) {
        return _resolveType(this, context);
      }
      return new this(..._resolve(paramsResolver, context));
    };

    target[checkSymbol] = function (context) {
      if (metadata.target !== this) {
        return _checkType(this, context);
      }
      _check(paramsResolver, context);
    };
  };
}

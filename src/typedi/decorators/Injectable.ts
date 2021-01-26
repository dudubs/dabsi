import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import {
  getParamResolverMap,
  getParamsResolvers,
  Resolver,
} from "@dabsi/typedi";
import getParameterName from "@dabsi/typedi/decorators/getParameterName";
import { Forward } from "@dabsi/typedi/Forward";
export const getInjectableMetadata = WeakMapFactory((target: Function) => {
  return {
    target,
    isInjectable: false,
  };
});

export function getDesignParamTypes(target: Function): Function[] {
  return Reflect.getMetadata("design:paramtypes", target) || [];
}

export const getConstructorParamsResolver = WeakMapFactory(
  (target: Function): Resolver<any[]> => {
    return Resolver.array(
      getParamsResolvers(
        Reflect.getMetadata("design:paramtypes", target) || [],
        getParamResolverMap.map.get(target),
        index => Forward.getParameterType(target, index)
      ),
      index => {
        return getParameterName(target, index, true);
      }
    );
  }
);

export function Injectable() {
  return target => {
    const metadata = getInjectableMetadata(target);
    metadata.isInjectable = true;
    const paramsResolver = getConstructorParamsResolver(target);

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

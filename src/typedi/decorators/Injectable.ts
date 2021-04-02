import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Forward } from "@dabsi/common/reflection/Forward";
import { Resolver } from "@dabsi/typedi";
import { getParameterName } from "@dabsi/common/reflection/getParameterName";
import { parameterResolverMap } from "@dabsi/typedi/injectability";

export const getInjectableMetadata = WeakMapFactory((target: Function) => {
  return {
    target,
    isInjectable: false,
  };
});

export function getDesignParamTypes(target: Function): Function[] {
  return Reflect.getMetadata("design:paramtypes", target) || [];
}

export function getParamsResolvers(
  paramTypes: Function[],
  paramResolverMap: Map<number, Resolver> | undefined,
  getForwardParamType: (index: number) => undefined | Function
): Resolver[] {
  return paramTypes.map((paramType, index) => {
    if (paramResolverMap?.has(index)) {
      return paramResolverMap.get(index)!;
    }
    return Resolver.forward(() => {
      return <any>(
        (paramResolverMap?.get(index) ||
          getForwardParamType(index) ||
          paramTypes[index]!)
      );
    });
  });
}

export const getConstructorParamsResolver = WeakMapFactory(
  (target: Function): Resolver<any[]> => {
    return Resolver.array(
      getParamsResolvers(
        Reflect.getMetadata("design:paramtypes", target) || [],

        parameterResolverMap.get(target),
        index => Forward.getParameterType(target, index)
      ),
      index => {
        return getParameterName(target, index);
      }
    );
  }
);

export function Injectable() {
  return target => {
    target[Resolver.resolveSymbol] = function (context) {
      if (target !== this) {
        return Resolver.resolveType(this, context);
      }
      return Resolver.Injectability.resolve(this, context);
    };

    target[Resolver.checkSymbol] = function (context) {
      if (target !== this) {
        return Resolver.checkType(this, context);
      }
      Resolver.Injectability.check(this, context);
    };
  };
}

// Resolve.resolveClass(a,context)

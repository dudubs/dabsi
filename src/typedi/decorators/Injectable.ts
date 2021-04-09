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
    Resolver.define(
      target,
      function (context) {
        if (target !== this) {
          return Resolver.Providability.resolve(this, context);
        }
        return Resolver.Injectability.invoke(this, context);
      },
      function (context) {
        if (target !== this) {
          return Resolver.Providability.check(this, context);
        }
        Resolver.Injectability.check(this, context);
      }
    );
  };
}

// Resolve.resolveClass(a,context)

import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Forward } from "@dabsi/common/reflection/Forward";
import { Resolver } from "@dabsi/typedi";
import { getParameterName } from "@dabsi/common/reflection/getParameterName";
import { parameterResolverMap } from "@dabsi/typedi/injectability";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import defined from "@dabsi/common/object/defined";

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
        defined(
          paramResolverMap?.get(index) ||
            getForwardParamType(index) ||
            paramTypes[index]!
        )
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
      index => `${target.name}:${getParameterName(target, index)}`
    );
  }
);

export function Injectable() {
  return target => {
    Resolver.define(
      target,
      function (context) {
        const resolver = Resolver.Providability.get(this, context);

        if (resolver !== undefined) {
          return Resolver.resolve(resolver, context);
        }

        if (target === this) {
          return Resolver.Injectability.invoke(this, context);
        }

        throw new Resolver.Providability.Error(this);
      },
      function (context) {
        const resolver = Resolver.Providability.get(this, context);

        if (resolver) {
          Resolver.check(resolver, context);
          return;
        }

        if (target === this) {
          return Resolver.Injectability.check(this, context);
        }
        // is sub-class
        throw new Resolver.Providability.Error(this);
      }
    );
  };
}

// Resolve.resolveClass(a,context)

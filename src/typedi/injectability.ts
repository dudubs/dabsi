import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { getParameterName } from "@dabsi/common/reflection/getParameterName";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

export const parameterResolverMap = new WeakMap<
  Function,
  Map<number, Resolver>
>();

declare module "./Resolver" {
  interface IResolver {
    Injectability: typeof ResolverInjectability;

    resolveInjectable<T>(
      target: Constructor<T>,
      context: ResolverMap<any>,
      args?: any[]
    ): T;
  }
}

const _getArgsResolver = (
  target: Function,
  propertyName: string | undefined
): Resolver<any[]> =>
  Resolver.array(
    Reflector.getParamTypes(target, propertyName).map(
      (paramType, paramIndex) =>
        parameterResolverMap.get(target)?.get(paramIndex) ||
        (paramType as Constructor)
    ),
    paramIndex => {
      const paramName = getParameterName(
        propertyName ? target.prototype[propertyName] : target,
        paramIndex
      );
      const paramType = Reflector.getParamType(
        target,
        paramIndex,
        propertyName
      );

      return `${paramName}: ${paramType.name}`;
    }
  );

namespace ResolverInjectability {
  export function resolve(
    target: any,
    context: ResolverMap,
    propertyName?: string
  ) {
    const argsResolver = _getArgsResolver(
      typeof target === "function" ? target : target.constructor,
      propertyName
    );
    const args = Resolver.resolve(argsResolver, context);

    if (propertyName) {
      return target[propertyName](...args);
    } else {
      return new (target as any)(...args);
    }
  }
  export function check(
    target: Function,
    context: ResolverMap,
    propertyName?: string
  ) {
    Resolver.check(_getArgsResolver(target, propertyName), context);
  }
}

Resolver.Injectability = ResolverInjectability;

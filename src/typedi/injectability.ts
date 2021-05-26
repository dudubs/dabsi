import { getParameterName } from "@dabsi/common/reflection/getParameterName";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

export const parameterResolverMap = new WeakMap<
  Function,
  Map<number, Resolver>
>();

declare module "./Resolver" {
  namespace Resolver {
    let Injectability: typeof ResolverInjectability;
  }
}

const _getParametersResolver = (
  target: Function,
  propertyName: string | undefined
): Resolver<any[]> =>
  Resolver.array(
    Reflector.getParamTypes(target, propertyName).map((paramType, paramIndex) =>
      ResolverInjectability.getParameterResolver(
        target,
        paramIndex,
        propertyName,
        paramType
      )
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

      return `${target.name}(...${paramName}: ${paramType.name})`;
    }
  );

namespace ResolverInjectability {
  export function getParameterResolver(
    target: Function,
    index: number,
    propertyName?: string,
    paramType?: Function
  ): Resolver<any> {
    return (
      parameterResolverMap
        .get(propertyName ? target.prototype[propertyName] : target)
        ?.get(index) ||
      <Resolver>paramType ||
      <Resolver>Reflector.getParamType(target, index, propertyName)
    );
  }

  export function invoke(
    target: any,
    context: ResolverMap,
    propertyName?: string
  ) {
    return resolve(target, context, propertyName).invoke();
  }

  export function resolve(
    target: any,
    context: ResolverMap,
    propertyName?: string
  ) {
    const paramsResolver = _getParametersResolver(
      typeof target === "function" ? target : target.constructor,
      propertyName
    );
    const args = Resolver.resolve(paramsResolver, context);

    return {
      args,
      invoke: () => {
        if (propertyName) {
          return target[propertyName](...args);
        } else {
          return new (target as any)(...args);
        }
      },
    };
  }

  export function check(
    target: Function,
    context: ResolverMap,
    propertyName?: string
  ) {
    Resolver.check(_getParametersResolver(target, propertyName), context);
  }
}

Resolver.Injectability = ResolverInjectability;

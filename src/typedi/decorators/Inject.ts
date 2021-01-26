import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { getInjectableMetadata } from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/Resolver";

export function Inject<T>(resolver?: Resolver<T>): ParameterDecorator {
  return (target, propertyName, index: number) => {
    resolver &&
      (getParamResolverMap(propertyName ? target[propertyName] : target)[
        index
      ] = resolver);
  };
}

export const getParamResolverMap = WeakMapFactory(() => ({}));

export function getParamsResolvers(
  paramTypes: Function[],
  paramResolverMap: Record<string, Resolver> | undefined,
  getForwardParamType: (index: number) => undefined | Function
): Resolver[] {
  return paramTypes.map((paramType, index) => {
    if (paramResolverMap?.[index]) return paramResolverMap[index];

    return Resolver.forward(() => {
      return <any>(
        (paramResolverMap?.[index] ||
          getForwardParamType(index) ||
          paramTypes[index]!)
      );
    });
  });
}

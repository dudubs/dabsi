import { parameterResolverMap } from "@dabsi/typedi/injectability";
import { Resolver } from "@dabsi/typedi/Resolver";

export function Inject<T>(resolver?: Resolver<T>): ParameterDecorator {
  return (target, propertyName, index: number) => {
    resolver &&
      parameterResolverMap
        .touch(propertyName ? target[propertyName] : target, () => new Map())
        .set(index, resolver);
  };
}

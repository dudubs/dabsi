import { getInjectableMetadata, Injectable } from "./Injectable";
import { Resolver } from "./Resolver";

export function Inject<T>(resolver?: Resolver<T>): ParameterDecorator {
  return (target: Function, propertyName, index: number) => {
    const metadata = getInjectableMetadata(target);

    metadata.resolvers[index] = resolver!;

    setImmediate(() => {
      if (!metadata.isInjectable) {
        Injectable()(target);
      }
    });
  };
}

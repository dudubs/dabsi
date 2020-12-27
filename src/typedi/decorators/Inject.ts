import {
  getInjectableMetadata,
  Injectable,
} from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/Resolver";

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

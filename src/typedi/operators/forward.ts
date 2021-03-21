import Lazy from "@dabsi/common/patterns/lazy";
import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const NAME = "forward";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(getResolver: () => Resolver<T>): CustomResolver<T> {
  const _getResolver = Lazy(() => {
    return getResolver();
  });
  return (context => {
    return Resolver.resolve(_getResolver(), context);
  }).toCheck(context => {
    Resolver.check(_getResolver(), context);
  });
}

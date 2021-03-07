import Lazy from "@dabsi/common/patterns/lazy";
import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const _operator = "forward";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(getResolver: () => Resolver<T>): CustomResolver<T> {
  const _getResolver = Lazy(() => {
    return getResolver();
  });
  return (context => {
    return Resolver.resolve(_getResolver(), context);
  }).toCheck(context => {
    Resolver.check(_getResolver(), context);
  });
}

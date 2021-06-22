import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function withContext<T>(
      resolver: Resolver<T>,
      context: ResolverMap
    ): Resolver<T>;
  }
}

Resolver.withContext = (resolver, context) => {
  if (!hasKeys(context)) return resolver;
  return Resolver.create(
    parentContext =>
      Resolver.resolve(
        resolver,
        Resolver.Context.create(parentContext, context)
      ),
    parentContext => {
      Resolver.check(
        //
        resolver,
        Resolver.Context.create(parentContext, context)
      );
    }
  );
};

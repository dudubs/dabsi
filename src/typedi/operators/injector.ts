import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { ProvidableResolver } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function injector<T extends Record<string, ProvidableResolver<any>>, U>(
      providableMap: T,
      resolver: Resolver<U>
    ): CustomResolver<
      (resolvedMap: { [K in keyof T]: InstanceType<T[K]> }) => U
    >;
  }
}

Resolver.injector = function (providableMap, resolver) {
  return Resolver.create(
    context => {
      return resolvedMap => {
        const subContext = Object.create(context);
        for (const [key, providable] of entries(providableMap)) {
          const resolved = resolvedMap[key];
          if (resolved == null) {
            throw new ResolveError(`No resolve for ${key}`);
          }
          subContext[Resolver.Providability.token(providable)] = () => resolved;
        }
        return Resolver.resolve(resolver, subContext);
      };
    },
    context => {
      context = Object.create(context);
      for (const [key, providable] of entries(providableMap)) {
        context[Resolver.Providability.token(providable)] = () => {
          throw new ResolveError(`No resolve for "${key}"`);
        };
      }
      Resolver.check(resolver, context);
    }
  );
};
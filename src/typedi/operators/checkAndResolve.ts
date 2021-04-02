import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    checkAndResolve<T>(resolver: Resolver<T>, context: ResolverMap<any>): T;
  }
}

Resolver.checkAndResolve = function (resolver, context) {
  Resolver.check(resolver, context);
  return Resolver.resolve(resolver, context);
};

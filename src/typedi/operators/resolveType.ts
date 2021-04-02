import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    resolveType(type: Type<any>, context: ResolverMap<any>);
  }
}

Resolver.resolveType = function method(
  type: Type<any>,
  context: ResolverMap<any>
) {
  const resolver = context[getTypeToken(type)];
  if (!resolver) {
    throw new ResolveError(`No resolver for "${getTypeToken(type)}".`);
  }
  return Resolver.resolve(resolver, context);
};

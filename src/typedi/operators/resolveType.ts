import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "resolveType";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(type: Type<any>, context: ResolverMap<any>) {
  const resolver = context[getTypeToken(type)];
  if (!resolver) {
    throw new ResolveError(`No resolver for "${getTypeToken(type)}".`);
  }
  return Resolver.resolve(resolver, context);
}

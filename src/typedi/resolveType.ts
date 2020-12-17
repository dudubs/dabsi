import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { resolve } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { ResolverMap } from "@dabsi/typedi/Resolver";

export function resolveType(type: Type<any>, context: ResolverMap<any>) {
  const resolver = context[getTypeToken(type)];
  if (!resolver) {
    throw new ResolveError(`No resolver for "${getTypeToken(type)}".`);
  }
  return resolve(resolver, context);
}

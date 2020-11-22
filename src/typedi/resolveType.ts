import { Type } from "../common/typings2/Type";
import { getTypeToken } from "./getTypeToken";
import { resolve } from "./resolve";
import { ResolverMap } from "./Resolver";

export function resolveType(type: Type<any>, context: ResolverMap<any>) {
  const resolver = context[getTypeToken(type)];
  return resolve(resolver, context);
}

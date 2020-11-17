import { Type } from "../../common/typings2/Type";
import { getTypeToken } from "../getTypeToken";
import { _resolve } from "./_resolve";
import { ResolverMap, Resolver } from "../Resolver";

export function _resolveType(type: Type<any>, context: ResolverMap<any>) {
  const resolver = context[getTypeToken(type)];
  return _resolve(resolver, context);
}

import { Type } from "../../common/typings";
import { getTypeToken } from "../getTypeToken";
import { _resolve } from "./_resolve";
import { Context, Resolver } from "../Resolver";

export function _resolveType(type: Type<any>, context: Context<any>) {
  const resolver = context[getTypeToken(type)];
  return _resolve(resolver, context);
}

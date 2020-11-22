import { Type } from "../common/typings2/Type";
import { getTypeToken } from "./getTypeToken";
import { ResolverMap } from "./Resolver";
import { ResolveError } from "./ResolveError";

export function checkTypeResolver(type: Type<any>, context: ResolverMap<any>) {
  for (
    let baseType = type;
    typeof baseType === "function";
    baseType = Object.getPrototypeOf(baseType)
  ) {
    const token = getTypeToken(type);
    if (token in context) {
      return;
    }
  }
  throw new ResolveError(`Can't resolve ${getTypeToken(type)}`);
}

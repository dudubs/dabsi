import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { ResolverMap } from "@dabsi/typedi/Resolver";
import { ResolveError } from "@dabsi/typedi/ResolveError";

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
  throw new ResolveError(`Can't resolve <Type ${type.name}>`);
}

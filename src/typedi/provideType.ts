import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { ResolverMap, Resolver } from "@dabsi/typedi/Resolver";

export function provideType<T>(
  type: Type<T>,
  resolver: Resolver<T>
): ResolverMap<T> {
  const context = {};
  for (
    let baseType = type;
    typeof baseType === "function" && baseType !== Function.prototype;
    baseType = Object.getPrototypeOf(baseType)
  ) {
    context[getTypeToken(baseType)] = resolver;
  }
  return context;
}

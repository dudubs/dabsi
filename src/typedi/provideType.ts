import { Type } from "@dabsi/common/typings2/Type";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { ResolverMap, Resolver } from "@dabsi/typedi/Resolver";

export function provideType<T>(
  type: Type<T>,
  resolver: Resolver<T>
): ResolverMap<T> {
  return {
    [getTypeToken(type)]: resolver,
  };
}

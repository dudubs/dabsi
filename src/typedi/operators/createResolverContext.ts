import { hasKeys } from "@dabsi/common/object/hasKeys";
import { AnyResolverMap } from "@dabsi/typedi/resolvers/ObjectResolver";

export function createResolverContext(
  nextContext: AnyResolverMap | undefined,
  context: AnyResolverMap
): AnyResolverMap {
  if (hasKeys(nextContext)) {
    return Object.setPrototypeOf({ ...nextContext }, context);
  }
  return context;
}

import { hasKeys } from "@dabsi/common/object/hasKeys";

import { AnyResolverMap, IResolver } from "@dabsi/typedi/Resolver";

const _operator = "createContext";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(
  nextContext: AnyResolverMap | undefined,
  context: AnyResolverMap
): AnyResolverMap {
  if (hasKeys(nextContext)) {
    return Object.setPrototypeOf({ ...nextContext }, context);
  }
  return context;
}

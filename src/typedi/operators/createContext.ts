import { hasKeys } from "@dabsi/common/object/hasKeys";

import {
  ResolverContext,
  IResolver,
  TypeResolver,
  Resolver,
  ResolverType,
} from "@dabsi/typedi/Resolver";
import { TokenResolver } from "@dabsi/typedi/TokenResolver";

const _operator = "createContext";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(
  context: ResolverContext,
  ...args: ResolverContext[]
): ResolverContext {
  context = Object.create(context);
  Resolver.provide.apply(Resolver, args);
  return context;
}

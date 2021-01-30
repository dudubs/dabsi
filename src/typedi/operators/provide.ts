import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  IResolver,
  Resolver,
  ResolverContext,
  ResolverType,
  TypeResolver,
} from "@dabsi/typedi/Resolver";
import { TokenResolver } from "@dabsi/typedi/TokenResolver";

const _operator = "provide";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(context: ResolverContext, ...args: ResolverContext[]) {
  Object.assign(context, ...args);
}

import { IResolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "provide";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(context: ResolverMap, ...args: ResolverMap[]) {
  Object.assign(context, ...args);
}

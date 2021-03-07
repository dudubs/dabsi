import { IResolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "createContext";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(context: ResolverMap, ...args: ResolverMap[]): ResolverMap {
  context = Object.create(context);
  Object.assign(context, ...args);
  return context;
}

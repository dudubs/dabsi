import { IResolver, ResolverMap } from "@dabsi/typedi/Resolver";

const NAME = "provide";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method(context: ResolverMap, ...args: ResolverMap[]) {
  Object.assign(context, ...args);
}

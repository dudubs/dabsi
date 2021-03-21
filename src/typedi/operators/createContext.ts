import { IResolver, ResolverMap } from "@dabsi/typedi/Resolver";

const NAME = "createContext";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method(context: ResolverMap, ...args: ResolverMap[]): ResolverMap {
  context = Object.create(context);
  Object.assign(context, ...args);
  return context;
}

import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    resolve<T>(resolver: Resolver<T>, context: ResolverMap<any>): T;
  }
}

Resolver.resolve = function (resolver, context) {
  if (!context) {
    throw new Error("No context");
  }
  if (resolver == null) {
    throw new Error("No resolver");
  }

  try {
    return resolver[Resolver.resolveSymbol](context);
  } catch (error) {
    if (error.constructor === TypeError) {
      const x = resolver[Resolver.resolveSymbol];
      console.log({ x });
    }
    throw error;
  }
};

import catchError from "@dabsi/common/async/catchError";

import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const NAME = "try";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(
  //
  resolver: Resolver<T>
): Resolver<T | undefined> {
  return context => {
    return catchError(
      ResolveError,
      () => Resolver.resolve(resolver, context),
      (): any => {
        return undefined;
      }
    );
  };
}

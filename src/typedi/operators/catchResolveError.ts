import { RpcError } from "@dabsi/typerpc/Rpc";
import { resolve } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

export function catchResolveError<T>(
  resolver: Resolver<T>,
  callback: (error: ResolveError) => void
): CustomResolver<T> {
  return (context => resolve(resolver, context)).toCheck(context => {
    try {
      Resolver.check(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        return callback(error);
      }
      throw error;
    }
  });
}

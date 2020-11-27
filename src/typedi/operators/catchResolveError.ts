import { RpcError } from "../../typerpc/Rpc";
import { resolve } from "../resolve";
import { ResolveError } from "../ResolveError";
import { CustomResolver, Resolver } from "../Resolver";

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

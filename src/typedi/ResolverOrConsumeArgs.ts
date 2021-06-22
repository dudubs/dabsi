import { Resolver } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";

export type ResolverOrConsumeArgs<T, Deps extends ResolverDeps> =
  | [resolver: Resolver<T>]
  | ConsumeArgs<T, Deps>;

export function ResolverOrConsumeArgs(
  args: ResolverOrConsumeArgs<any, any>
): Resolver<any> {
  if (args.length === 2) {
    return ConsumeArgs(args as [any, any])!;
  }
  return args[0];
}

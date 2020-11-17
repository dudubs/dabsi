import { Resolver } from "../../../typedi";
import { ConsumeDeps, ConsumeFactory } from "../../../typedi/internal/_consume";
import { SystemResolvers } from "../SystemResolvers";

export function SystemCommand<T, U extends ConsumeDeps>(
  deps: U,
  callback: ConsumeFactory<T, U>
): T {
  return Resolver.checkAndResolve(
    Resolver.consume(deps, callback),
    SystemResolvers
  );
}

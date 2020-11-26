import { Resolver } from "../../../typedi";
import {
  ConsumeDeps,
  ConsumeFactory,
  Consumer,
} from "../../../typedi/Consumer";
import { SystemResolvers } from "../SystemResolvers";

export function SystemCommand<T, U extends ConsumeDeps>(
  deps: U,
  callback: ConsumeFactory<T, U>
): T {
  return Resolver.checkAndResolve(Consumer(deps, callback), SystemResolvers);
}

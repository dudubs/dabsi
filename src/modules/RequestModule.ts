import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

@Module()
export default class RequestModule {
  log = log.get("REQUEST");
  readonly context: AnyResolverMap = {};

  require(resolver) {
    throw new Error("todo.");
  }

  constructor(@Inject() protected runner: ModuleRunner) {}
}

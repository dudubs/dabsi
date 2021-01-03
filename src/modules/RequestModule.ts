import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

@Module()
export default class RequestModule {
  log = log.get("REQUEST");
  readonly context: AnyResolverMap = {};

  protected requiredResolvers: Resolver[] = [];

  require(...resolvers: Resolver[]) {
    this.requiredResolvers.push(...resolvers);
  }

  constructor(@Inject() protected runner: ModuleRunner) {}
}

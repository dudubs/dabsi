import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import catchError from "../common/async/catchError";
import { ResolveError } from "../typedi/ResolveError";
import { Cli, CliError } from "./Cli";

@Module()
export default class RequestModule {
  log = log.get("REQUEST");

  readonly context: AnyResolverMap = Object.setPrototypeOf(
    {},
    this.runnerContext
  );

  protected requiredResolvers: Resolver[] = [];

  require(...resolvers: Resolver[]) {
    this.requiredResolvers.push(...resolvers);
  }

  constructor(
    @Inject() cli: Cli,
    @Inject(c => c) protected runnerContext: AnyResolverMap
  ) {
    cli.command("check", cli =>
      cli.onRun(() => {
        Resolver.checkObject(this.context, this.context);
      })
    );
  }
}

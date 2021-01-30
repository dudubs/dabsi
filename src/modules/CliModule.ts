import { Cli } from "@dabsi/modules/Cli";
import {
  ResolverContext,
  Inject,
  Injectable,
  Module,
  Resolver,
} from "@dabsi/typedi";
import yargs from "yargs";

@Module()
export default class CliModule {
  cli = new Cli();

  constructor(@Inject(c => c) context: ResolverContext) {
    Resolver.provide(context, { ...Cli.provide(() => this.cli) });
  }

  async main(scriptName: string) {
    const y = yargs.scriptName(scriptName);
    await this.cli.onBuild.invoke(y);
    return await this.cli.run(y.help().argv);
  }
}

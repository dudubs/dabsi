import { Cli } from "@dabsi/modules/Cli";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class SessionModule {
  // TODO: cli session clean|show ...

  constructor(@Inject() cli: Cli) {
    cli.command("session", cli => cli.command("clean", cli => cli));
  }
}

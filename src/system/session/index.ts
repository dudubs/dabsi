import { Cli } from "@dabsi/modules/Cli";
import { SystemModule } from "@dabsi/system/core";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class SessionModule {
  // TODO: cli session clean|show ...

  constructor(
    @Inject() protected systemModule: SystemModule,
    @Inject() cli: Cli
  ) {
    cli.command("session", new Cli().command("clean", new Cli()));
  }
}

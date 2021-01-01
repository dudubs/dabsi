import { Inject, Module } from "@dabsi/typedi";
import { Cli } from "@dabsi/modules/Cli";

@Module()
export class ServerModule {
  public readonly cli = new Cli();

  log = log.get("SERVER");

  constructor(@Inject() cli: Cli) {
    cli.command(
      "start",
      this.cli.onRun(() => {
        this.log.info("starting...");
      })
    );
  }
}

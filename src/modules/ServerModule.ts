import { Inject, Module } from "../typedi";
import { Cli } from "./Cli";

@Module()
export class ServerModule {
  public readonly cli = new Cli();

  log = log.get("SERVER");

  constructor(@Inject() cli: Cli) {
    cli.command(
      "start",
      this.cli.install({
        run: () => {
          this.log.info("starting...");
        },
      })
    );
  }
}

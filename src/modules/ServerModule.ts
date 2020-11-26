import { Module } from "../typedi";
import { Inject } from "../typedi";
import { Cli } from "./Cli";

@Module()
export class ServerModule {
  public readonly cli = new Cli();

  log = log.get("SERVER");

  constructor(@Inject() cli: Cli) {
    cli.connect(
      "start",
      this.cli.push({
        run: () => {
          this.log.info("starting...");
        },
      })
    );
  }
}

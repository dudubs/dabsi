import { Module } from "../typedi/Module";
import { Inject } from "../typedi/Inject";
import { Cli } from "./Cli";

@Module()
export class ServerModule {
  public readonly cli = new Cli();

  constructor(@Inject() cli: Cli) {
    cli.connect(
      "start",
      this.cli.push({
        run: () => {
          console.log("starting server...");
        },
      })
    );
  }
}

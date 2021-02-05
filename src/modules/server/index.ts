import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import { Module } from "@dabsi/typedi";

@Module()
export default class ServerModule {
  log = log.get("SERVER");

  onStart = Hookable<(args: any) => Awaitable>();

  onStop = Hookable<(args: any) => Awaitable>();

  constructor(cli: Cli) {
    cli
      .command("start", cli =>
        cli.onRun(async args => {
          this.log.info("starting...");
          await this.onStart.invoke(args);
        })
      )
      .command("stop", cli =>
        cli.onRun(async args => {
          this.log.info("stoping...");
          await this.onStop.invoke(args);
        })
      );
  }
}

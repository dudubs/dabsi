import { spawn } from "child_process";
import { pushAsyncHook } from "../common/async/pushAsyncHook";
import { Awaitable } from "../common/typings2/Async";
import { Cli } from "../modules/Cli";
import { Inject } from "../typedi";
import { Module } from "../typedi";

@Module()
export class DevModule {
  log = log.get("DEV");

  constructor(@Inject() cli: Cli) {
    cli.push({
      build: (y) => y.boolean("dev"),
      runAsParent: (args) =>
        new Promise(async (next) => {
          if (args.dev && !args.skipDev) {
            await this.hooks.runAsParent();
            this.reload();
            return;
          }
          await this.hooks.runAsChild();
          return next();
        }),
    });
  }

  protected process: { kill() } | null = null;

  protected hooks = {
    runAsChild: (): Awaitable => void 0,
    runAsParent: (): Awaitable => void 0,
  };

  reload() {
    if (this.process) {
      this.process.kill();
      this.log.info("reloading");
    }
    this.process = spawn(
      process.argv[0],
      [...process.execArgv, ...process.argv.slice(1), "--skip-dev"],
      {
        stdio: "inherit",
        env: process.env,
      }
    );
  }

  push({
    asParent = undefined as undefined | (() => Awaitable),
    asChild = undefined as undefined | (() => void),
  }) {
    pushAsyncHook(this.hooks, "runAsParent", asParent);
    pushAsyncHook(this.hooks, "runAsChild", asChild);
  }
}

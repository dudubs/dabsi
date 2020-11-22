import { spawn } from "child_process";
import { pushAsyncHook } from "../common/async/pushAsyncHook";
import { Awaitable } from "../common/typings2/Async";
import { Cli } from "../modules/Cli";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";

@Module()
export class DevModule {
  constructor(@Inject() cli: Cli) {
    cli.connect("test", new Cli()).push({
      build: y => y.boolean("dev"),
      runAsParent: args => {
        return new Promise(async next => {
          if (!args.dev || args.skipDev) {
            if (args.skipDev) {
              await this.hooks.runAsChild();
            }
            return next();
          }
          return this.hooks.runAsParent();
        });
      },
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
      console.log("reloading");
    }
    this.process = spawn(
      process.argv[0],
      [...process.execArgv, ...process.argv.slice(1), "--skip-dev"],
      {
        stdio: [0, 1, 2],
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

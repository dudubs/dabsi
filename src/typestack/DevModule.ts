import { spawn } from "child_process";
import { pushHook } from "../common/async/pushHook";
import { Lazy } from "../common/patterns/lazy";
import { Awaitable } from "../common/typings2/Async";
import { Cli } from "../modules/Cli";
import { HooksInstaller } from "../modules/HooksInstaller";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { DevWatchdog } from "./DevWatchdog";

@Module()
export class DevModule {
  log = log.get("DEV");

  watchOnly: boolean;

  constructor(@Inject() cli: Cli) {
    cli.install({
      build: y =>
        y //
          .boolean(["dev", "d"])
          .boolean(["watch", "w"]),
      runAsParent: ({ w, watch = w, d, dev = d }) =>
        new Promise<void>(async next => {
          this.watchOnly = watch && !dev;
          if (process.env.DEV_CHILD === "true") {
            if (!this.watchOnly) await this.hooks.runAsChild();
            return next();
          }
          if (dev || watch) {
            if (!this.watchOnly) await this.hooks.runAsParent();
            const watchdog = new DevWatchdog();
            await this.hooks.buildWatchdog(watchdog);
            watchdog.listen(() => {
              this.reload();
            });
            watchdog.watch();
            this.reload();
            return;
          }
          return next();
        }),
    });
  }

  protected process: { kill() } | null = null;

  protected hooks = {
    runAsChild: (): Awaitable => void 0,
    runAsParent: (): Awaitable => void 0,
    buildWatchdog: (watchog: DevWatchdog): Awaitable => void 0,
  };

  protected reload() {
    if (this.process) {
      this.process.kill();
      this.log.info("reloading");
    }
    this.process = spawn(
      process.argv[0],
      [...process.execArgv, ...process.argv.slice(1)],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          DEV_CHILD: "true",
        },
      }
    );
  }

  install = HooksInstaller(this.hooks, this);
  push({
    asParent = undefined as undefined | (() => Awaitable),
    asChild = undefined as undefined | (() => void),
    buildWatchdog = undefined as
      | undefined
      | ((watchdog: DevWatchdog) => Awaitable),
  }) {
    pushHook(this.hooks, "runAsParent", asParent);
    pushHook(this.hooks, "runAsChild", asChild);
    pushHook(this.hooks, "buildWatchdog", buildWatchdog);
  }
}

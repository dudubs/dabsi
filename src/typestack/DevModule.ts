import { spawn } from "child_process";
import { Debounce } from "@dabsi/common/async/Debounce";
import { pushHook } from "@dabsi/common/async/pushHook";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Cli } from "@dabsi/modules/Cli";
import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import { Inject } from "@dabsi/typedi";
import { Module } from "@dabsi/typedi";
import { DevWatchdog } from "@dabsi/typestack/DevWatchdog";

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
  protected reloadDebounce = Debounce(200);
  protected async reload() {
    // if (this.isReloading) return;
    if (this.process) {
      if (!(await this.reloadDebounce())) return;
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

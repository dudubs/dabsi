import { Debounce } from "@dabsi/common/async/Debounce";
import { Awaitable } from "@dabsi/common/typings2/Async";
import watchReloadFile from "@dabsi/filesystem/watchReloadFile";
import { Cli } from "@dabsi/modules/Cli";
import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import { Inject, Module } from "@dabsi/typedi";
import { spawn } from "child_process";

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
            this.reload();
            watchReloadFile("server", () => {
              this.reload();
            });
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
}

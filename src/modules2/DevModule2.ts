import { callAndWaitAll } from "@dabsi/common/async/callAndWaitAll";
import { Debounce2 } from "@dabsi/common/async/Debounce";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DABSI_ROOT_DIR } from "@dabsi/env";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Module, Plugin } from "@dabsi/typemodule";
import { ChildProcess, spawn } from "child_process";
import fs from "fs";
import path from "path";

@Module()
export class DevModule2 {
  //

  readonly parentRunners: (() => Awaitable)[] = [
    async () =>
      Promise.all([
        //
        this.watch("server", () => this.reload()),
        this.watch("common", () => this.reload()),
        this._run(),
      ]),
  ];

  readonly childRunners: (() => Awaitable)[] = [];

  protected _reloadDebounce = new Debounce2();

  protected _process!: ChildProcess;

  async reload() {
    if (!(await this._reloadDebounce.wait())) return;
    log.info(`reloading dev server..`);
    this._process.kill();
    this._run();
  }

  protected _run() {
    this._process = spawn(
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

  installCli(@Plugin() cliModule: CliModule2) {
    cliModule.extend({
      extender: y =>
        y.option("dev", { type: "boolean", default: false, alias: "d" }),
      wrapper: async ({ dev }, execute) => {
        if (!dev) {
          return execute();
        }
        if (process.env.DEV_CHILD) {
          return Promise.all([callAndWaitAll(this.childRunners), execute()]);
        }
        await callAndWaitAll(this.parentRunners);
      },
    });
  }

  watch(platform: string, callback: () => void) {
    this.parentRunners.push(async () => {
      const watchPath = path.join(DABSI_ROOT_DIR, `reload.${platform}.lock`);
      const debounce = new Debounce2(200);
      if (
        !(await fs.promises
          .stat(watchPath)
          .then(s => s.isFile())
          .catch(() => false))
      ) {
        await fs.promises.writeFile(watchPath, "");
      }
      fs.watch(watchPath, async () => {
        if (await debounce.wait()) {
          callback();
        }
      });
    });
  }
}
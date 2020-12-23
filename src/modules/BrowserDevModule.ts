import * as fs from "fs";
import reload from "reload";
import webpack from "webpack";
import { Debounce } from "@dabsi/common/async/Debounce";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";
import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/ExpressModule";

@Module()
export class BrowserDevModule {
  log = this.devModule.log.get("BROWSER");

  constructor(
    @Inject() protected devModule: DevModule,
    @Inject() expressModule: ExpressModule,
    @Inject() browserModule: BrowserModule
  ) {
    browserModule.scripts.push("/reload/reload.js");

    devModule.install({
      buildWatchdog: watchdog => {
        watchdog.exclude.push(path => {
          return /([\\\/]|^)browser[\\\/$]/.test(path);
        });
      },
      runAsParent: async () => {
        await browserModule.init();
        webpack(browserModule.webpackConfig).watch(
          {},
          browserModule.webpackCallback
        );
      },
    });

    expressModule.install({
      routes: app => {
        if (devModule.watchOnly) return;
        const debounce = Debounce(200);
        this.log.info("starting reload server...");
        reload(app).then(server => {
          const path = "./bundle/browser";
          this.log.info(() => `watching ${path}`);
          const watcher = fs.watch(path, async () => {
            // TODO: debounce
            if (await debounce()) {
              this.log.info("reloading browser...");
              server.reload();
            }
          });
          process.on("SIGINT", () => {
            watcher.close();
            server.closeServer();
          });
        });
      },
    });
  }
}

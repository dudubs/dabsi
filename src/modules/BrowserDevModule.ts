import { Debounce } from "@dabsi/common/async/Debounce";
import watch, { POLL_TO_WATCH } from "@dabsi/filesystem/watch";
import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";

import reload from "reload";
import webpack from "webpack";

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
          { poll: POLL_TO_WATCH },
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
          const watcher = watch(path, async () => {
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

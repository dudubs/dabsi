import * as fs from "fs";
import reload from "reload";
import webpack from "webpack";
import { Debounce } from "../common/async/Debounce";
import { Inject, Module } from "../typedi";
import { DevModule } from "../typestack/DevModule";
import { BrowserPlatformModule } from "./BrowserPlatformModule";
import { ExpressModule } from "./ExpressModule";

@Module()
export class BrowserDevModule {
  log = this.devModule.log.get("BROWSER");

  constructor(
    @Inject() protected devModule: DevModule,
    @Inject() expressModule: ExpressModule,
    @Inject() mBrowserPlatform: BrowserPlatformModule
  ) {
    mBrowserPlatform.scripts.push("/reload/reload.js");

    devModule.push({
      buildWatchdog: watchdog => {
        watchdog.exclude.push(path => {
          return /([\\\/]|^)browser[\\\/$]/.test(path);
        });
      },
    });

    devModule.push({
      asParent: async () => {
        await mBrowserPlatform.init();
        webpack(mBrowserPlatform.webpackConfig).watch(
          {},
          mBrowserPlatform.webpackCallback
        );
      },
    });
    expressModule.push({
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

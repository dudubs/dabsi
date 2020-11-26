import * as fs from "fs";
import reload from "reload";
import webpack from "webpack";
import { Debounce } from "../common/async/Debounce";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { DevModule } from "../typestack/DevModule";
import { DevWatchdogModule } from "../typestack/DevWatchdogModule";
import { BrowserPlatformModule } from "./BrowserPlatformModule";
import { ExpressModule } from "./ExpressModule";

@Module()
export class BrowserDevModule {
  log = this.mDev.log.get("BROWSER");

  constructor(
    @Inject() protected mDev: DevModule,
    @Inject() mDevWatchdog: DevWatchdogModule,
    @Inject() mExpress: ExpressModule,
    @Inject() mBrowserPlatform: BrowserPlatformModule
  ) {
    mBrowserPlatform.scripts.push("/reload/reload.js");
    mDevWatchdog.exclude.push((path) => {
      return /([\\\/]|^)browser[\\\/$]/.test(path);
    });
    mDev.push({
      asParent: async () => {
        await mBrowserPlatform.init();
        webpack(mBrowserPlatform.webpackConfig).watch(
          {},
          mBrowserPlatform.webpackCallback
        );
      },
    });
    mExpress.push({
      build: (app) => {
        const debounce = Debounce(200);
        this.log.info("starting reload server...");
        reload(app).then((server) => {
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

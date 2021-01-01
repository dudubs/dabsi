import { Debounce } from "@dabsi/common/async/Debounce";
import watch from "@dabsi/filesystem/watch";
import watchReloadFile from "@dabsi/filesystem/watchReloadFile";
import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/express";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";
import reload from "reload";
//sxx

@Module()
export default class DevBrowserModule {
  log = this.devModule.log.get("BROWSER");

  constructor(
    @Inject() protected devModule: DevModule,
    @Inject() expressModule: ExpressModule,
    @Inject() browserModule: BrowserModule
  ) {
    browserModule.scripts.push("/reload/reload.js");

    devModule.onRunAsParent(async () => {
      await browserModule.init();

      browserModule.runWebpackCompiler();
      watchReloadFile("browser", () => {
        browserModule.runWebpackCompiler();
      });
      watchReloadFile("view", () => {
        browserModule.runWebpackCompiler();
      });
    });

    expressModule.onBuildRoutes(app => {
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
    });
  }
}

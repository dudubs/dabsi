import { NODE_MODULES_PATH } from "@dabsi/index";
import { Debounce } from "@dabsi/common/async/Debounce";
import watch from "@dabsi/filesystem/watch";
import watchReloadFile from "@dabsi/filesystem/watchReloadFile";
import BrowserModule from "@dabsi/modules/browser-platform";
import ExpressModule from "@dabsi/modules/express";
import { Inject, Module } from "@dabsi/typedi";
import { DevModule } from "@dabsi/typestack/DevModule";
import express from "express";
import reload from "reload";
import { makeHtml } from "@dabsi/common/makeHtml";
import path from "path";
//sxx

@Module()
export default class ExpressForBrowserAndDevModule {
  log = this.devModule.log.get("BROWSER");

  constructor(
    @Inject() protected devModule: DevModule,
    @Inject() expressModule: ExpressModule,
    @Inject() browserModule: BrowserModule
  ) {
    browserModule.scripts.push("/reload/reload.js");

    expressModule.beforeBuildRoutes(app => {
      app.use(
        "/tests/lib",
        express.static(
          path.join(NODE_MODULES_PATH, "jasmine-core/lib/jasmine-core")
        )
      );
      app.use("/tests", (req, res) => {
        res.header("Content-Type", "text/html").send(
          makeHtml({
            scripts: [
              "/reload/reload.js",
              "/tests/lib/jasmine.js",
              "/tests/lib/jasmine-html.js",
              "/tests/lib/boot.js",
              "/bundle/browser/vendor.js",
              "/bundle/browser/index.js",
              "/bundle/browser/tests.js",
              "/bundle/browser/runtime.js",
            ],
            head: `<link rel="stylesheet" href="/tests/lib/jasmine.css">`,
          })
        );
      });
    });

    devModule.onRunAsParent(async () => {
      await browserModule.init();

      browserModule.runWebpackCompiler();
      watchReloadFile("browser", () => {
        browserModule.runWebpackCompiler();
      });
      watchReloadFile("view", () => {
        browserModule.runWebpackCompiler();
      });
      watchReloadFile("common", () => {
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

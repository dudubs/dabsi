import { makeHtml } from "@dabsi/common/makeHtml";
import { ExpressModule2 } from "@dabsi/modules/ExpressModule2";
import { PlatformModule2 } from "@dabsi/modules/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules/ProjectModule2";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import path from "path";

@Module({
  cli: "browser",
})
export default class BrowserModule2 {
  readonly scripts: string[] = [];

  log = log.get("Browser");

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2
  ) {}

  installExpress(@Plugin() expressModule: ExpressModule2) {
    expressModule.postBuilders.push(app => {
      app.get("/*", (req, res) => {
        if (req.path.endsWith(".js")) {
          return res
            .contentType("text/javascript")
            .send(`console.error("File not found.")`);
        }

        res.contentType("text/html").send(
          makeHtml({
            head: `<meta charset="utf-8">`,
            scripts: [
              ...this.scripts,
              ...["vendor", "index", "runtime"].map(
                name => `/bundle/browser/${name}.js`
              ),
            ],
          })
        );
      });
    });
  }

  installProjectWithExpress(
    @Plugin() projectModule: ProjectModule2,
    @Plugin() expressModule: ExpressModule2
  ) {
    expressModule.builders.push(app => {
      app.use(
        "/bundle/browser",
        express.static(
          path.join(projectModule.settings.directory, "bundle/browser")
        )
      );
    });
  }
}

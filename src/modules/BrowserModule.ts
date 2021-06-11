import { makeHtml } from "@dabsi/common/makeHtml";
import ExpressModule from "@dabsi/modules/ExpressModule";
import PlatformModule from "@dabsi/modules/PlatformModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import path from "path";

@Module({
  cli: "browser",
})
export default class BrowserModule {
  readonly scripts: string[] = [];

  log = log.get("Browser");

  constructor(
    protected projectModule: ProjectModule,
    protected platformModule: PlatformModule
  ) {}

  installExpress(@Plugin() expressModule: ExpressModule) {
    expressModule.postBuilders.push(app => {
      app.get("/*", (req, res) => {
        if (req.path.endsWith(".js")) {
          return res
            .contentType("text/javascript")
            .send(`console.error("File not found.")`);
        }

        res.contentType("text/html").send(
          makeHtml({
            head: `<meta charset="utf-8">${
              res.messages.length
                ? `<script>window.GLOBAL_MESSAGES=${JSON.stringify(
                    res.messages
                  )}</script>`
                : ""
            }`,
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
    @Plugin() projectModule: ProjectModule,
    @Plugin() expressModule: ExpressModule
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

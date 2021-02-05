import fs from "fs";
import { makeHtml } from "@dabsi/common/makeHtml";
import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/express";
import { Inject, Module } from "@dabsi/typedi";
import express from "express";

@Module()
export default class ExpressForBorwserModule {
  constructor(expressModule: ExpressModule, browserModule: BrowserModule) {
    expressModule
      .afterBuildRoutes(app => {
        app.get("/*", (req, res) => {
          res.setHeader("Content-Type", "text/html");
          res.send(
            makeHtml({
              head: '<meta charset="utf-8" />',
              scripts: [
                ...browserModule.scripts,
                ...["vendor", "index", "runtime"].map(
                  name => `/bundle/browser/${name}.js`
                ),
              ],
            })
          );
        });
      })
      .onBuildRoutes(app => {
        const bundlePath = fs.realpathSync("./bundle/browser");
        const bundleStatic = express.static(bundlePath);
        app.use("/bundle/browser", (req, res, next) => {
          bundleStatic(req, res, () => {
            if (req.path.endsWith(".js")) {
              return res
                .contentType("text/javascript")
                .send(`console.error("No script like ${req.path}")`);
            }
            res.status(404).send(`file not found ${req.path}`);
          });
        });
        //
      });
  }
}

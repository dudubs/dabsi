import express from "express";
import * as fs from "fs";
import { realpathSync, watch, writeFileSync } from "fs";
import path, { dirname, relative, resolve } from "path";

import reload from "reload";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import webpack from "webpack";
import { makeHtml } from "../common/makeHtml";
import { Lazy } from "../common/patterns/lazy";
import { DABSI_SRC_PATH } from "../index";

import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
import { DevWatchdog } from "../typestack/DevWatchdog";
import { Cli } from "./Cli";
import { ExpressModule } from "./ExpressModule";
import { PlatformBuilder } from "./PlatformBuilder";

export const CURRENT_PATH = realpathSync(".");
export const GENERATED_PATH = path.resolve(CURRENT_PATH, "generated/browser");
export const BUNDLE_PATH = path.resolve(CURRENT_PATH, "bundle/browser");

@Module({
  dependencies: [DevModule, ExpressModule],
})
export class BrowserPlatform {
  packCli = new Cli().push({
    lastRun: () => this.pack(),
  });

  makeCli = new Cli().push({
    lastRun: () => this.make(),
  });

  cli = new Cli() //
    .connect("pack", this.packCli)
    .connect("make", this.makeCli);

  scripts: string[] = [];

  constructor(
    @Inject() cli: Cli, //
    @Inject() protected platformBuilder: PlatformBuilder,
    @Inject() protected watchdog: DevWatchdog,
    @Inject() expressModule: ExpressModule
  ) {
    cli.connect("browser", this.cli);

    watchdog.exclude.push(path => {
      return /([\\\/]|^)browser[\\\/$]/.test(path);
    });

    expressModule.push({
      build: app => {
        const bundlePath = realpathSync("./bundle/browser");
        app.use("/bundle/browser", express.static(bundlePath));
        app.get("/*", (req, res) => {
          res.setHeader("Content-Type", "text/html");
          res.send(
            makeHtml({
              scripts: [
                ...this.scripts,
                ...["vendor", "index", "runtime"].map(
                  name => `/bundle/browser/${name}.js`
                ),
              ],
            })
          );
        });
      },
    });
  }

  @Lazy() protected get platform() {
    return this.platformBuilder.create("browser");
  }

  protected async make() {
    await this.platform.makeIndexFile();

    const rootBrowserTsConfigPath = resolve(
      DABSI_SRC_PATH,
      "browser/tsconfig.json"
    );
    const thisBrowserTsConfigPath = resolve(
      CURRENT_PATH,
      "browser/tsconfig.json"
    );

    if (rootBrowserTsConfigPath !== thisBrowserTsConfigPath) {
      makeTsConfigFile(rootBrowserTsConfigPath, thisBrowserTsConfigPath, {
        // TODO: copy paths
      });
    }

    for (const path of this.platform.platformPaths) {
      if (path === thisBrowserTsConfigPath) continue;
      if (path == rootBrowserTsConfigPath) continue;

      const tsConfigPath = resolve(path, "tsconfig.json");
      // if (fileExistsSync(tsConfigPath)) continue;
      console.log(`make "${tsConfigPath}".`);
      makeTsConfigFile(thisBrowserTsConfigPath, tsConfigPath);
    }

    function makeTsConfigFile(baseTsConfigPath, tsConfigPath, config = {}) {
      console.log(tsConfigPath, {
        extends: relative(dirname(tsConfigPath), baseTsConfigPath).replace(
          /\\/g,
          "/"
        ),
        ...config,
      });
    }
    function writeJsonFile(path, data) {
      // if(fileExistsSync(path))return;
      console.log(`make "${path}".`);
      writeFileSync(path, JSON.stringify(data, null, 2));
    }
  }

  protected async pack() {
    webpack({
      mode: "development",
      devtool: "inline-source-map",
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          name: "vendor",
        },
      },
      output: {
        path: BUNDLE_PATH,
      },
      entry: {
        index: this.platform.generatedIndexPath,
      },
      stats: {
        warnings: false,
      },
      resolve: {
        symlinks: false,
        alias: {
          // TODO: @dabsi
        },
        extensions: [".ts", ".tsx", ".js"],
      },
    }).run((err, status) => {
      status && console.log(status.toString({ color: true }));
    });
  }
}

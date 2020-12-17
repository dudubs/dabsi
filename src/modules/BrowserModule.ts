import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import { makeHtml } from "@dabsi/common/makeHtml";
import { mapObject } from "@dabsi/common/object/mapObject";
import { pick } from "@dabsi/common/object/pick";
import { values } from "@dabsi/common/object/values";
import { Lazy } from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DABSI_PATH, DABSI_SRC_PATH } from "@dabsi/index";
import { Cli } from "@dabsi/modules/Cli";
import { ExpressModule } from "@dabsi/modules/ExpressModule";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { PlatformInfo } from "@dabsi/modules/PlatformInfo";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { DevModule } from "@dabsi/typestack/DevModule";
import { MakeModule } from "@dabsi/typestack/MakeModule";
import { ProjectModule } from "@dabsi/typestack/ProjectModule";
import colors from "colors/safe";
import express from "express";
import fs from "fs";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { DABSI_CURRENT_PATH } from "../index";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export default class BrowserModule {
  packCli = new Cli().install({
    run: {
      after: () => this.pack(),
    },
  });

  cli = new Cli() //
    .command("pack", this.packCli);

  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    @Inject() protected projectModule: ProjectModule,
    @Inject() protected makeModule: MakeModule,
    @Inject() expressModule: ExpressModule,
    @Inject() protected runner: ModuleRunner,
    @Inject() cli: Cli
  ) {
    cli.command("browser", this.cli);

    makeModule.cli.install({
      run: () => this.make(),
    });

    expressModule.install({
      postRoutes: app => {
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
      routes: app => {
        const bundlePath = fs.realpathSync("./bundle/browser");
        const bundleStatic = express.static(bundlePath);
        app.use("/bundle/browser", (req, res, next) => {
          bundleStatic(req, res, () => {
            if (req.path.endsWith(".js")) {
              return res
                .contentType("text/javascript")
                .send(`console.error("script not found ${req.path}")`);
            }
            res.status(404).send(`file not found ${req.path}`);
          });
        });
        //
      },
    });
  }

  platformInfoMap: Record<string, PlatformInfo>;

  mainPlatformInfo: PlatformInfo;

  @Once() async init() {
    await this.projectModule.init();
    this.platformInfoMap = mapObject(
      this.projectModule.projectInfoMap,
      p => new PlatformInfo(p, "browser")
    );
    this.mainPlatformInfo = this.platformInfoMap[
      this.projectModule.mainProjectInfo.dir
    ];
  }

  protected async _makeProjectTsConfig(platformInfo: PlatformInfo) {
    const skip = platformInfo.projectInfo.dir === DABSI_PATH;
    this.log.trace(
      () =>
        `Make project ts-config "${relativePathToCurrent(
          platformInfo.tsConfigFileName
        )}"${skip ? colors.yellow(` (skipped)`) : ""}.`
    );

    if (skip) return;
    await this.makeModule.makeJsonFile(platformInfo.tsConfigFileName, {
      extends: relativePosixPath(
        platformInfo.projectInfo.dir,
        path.join(DABSI_PATH, platformInfo.tsConfigBaseName)
      ),
      ...pick(platformInfo.projectInfo.tsConfigInfo.config, "compilerOptions"),
      include: [
        relativePosixPath(
          platformInfo.projectInfo.dir,
          platformInfo.generatedIndexFileName
        ),
      ],
    });
  }

  protected async _makeProjectModules(platformInfo: PlatformInfo) {
    for (const projectModuleInfo of values(
      platformInfo.projectInfo.moduleMapInfo
    )) {
      const platformModuleDir = path.join(
        projectModuleInfo.dir,
        platformInfo.name
      );
      const platformModuleIndexFileName = path.join(
        platformModuleDir,
        "index.ts"
      );
      if (!fs.existsSync(platformModuleIndexFileName)) continue;
      this._indexFileNames!.add(platformModuleIndexFileName);

      const platformModuleTsConfigFileName = path.join(
        platformModuleDir,
        "tsconfig.json"
      );
      this.log.trace(
        () =>
          `Make project module ts-config "${relativePathToCurrent(
            platformModuleTsConfigFileName
          )}".`
      );

      await this.makeModule.makeJsonFile(platformModuleTsConfigFileName, {
        extends: relativePosixPath(
          platformModuleDir,
          platformInfo.tsConfigFileName
        ),
      });
    }
  }

  protected async _makeConfigs() {
    for (const platformInfo of values(this.platformInfoMap)) {
      this.log.trace(
        () =>
          `Make platform ${relativePathToCurrent(platformInfo.projectInfo.dir)}`
      );

      await this._makeProjectTsConfig(platformInfo);
      await this._makeProjectModules(platformInfo);
    }
  }
  _indexFileNames: Set<string> | null = null;

  protected async _makeIndexFile() {
    let indexFileCode = ``;

    for (const indexFileName of this._indexFileNames!) {
      indexFileCode += `import "${this.projectModule.mainProjectInfo.tsConfigInfo.resolvePath(
        this.mainPlatformInfo.generatedDir,
        indexFileName
      )}";\n`;
    }
    await this.makeModule.makeFile(
      this.mainPlatformInfo.generatedIndexFileName,
      `import "${this.projectModule.mainProjectInfo.tsConfigInfo.resolvePath(
        this.mainPlatformInfo.generatedDir,
        path.join(DABSI_SRC_PATH, "common/register.ts")
      )}";\n${indexFileCode}`
    );
  }

  protected hooks = {
    make: HooksInstaller.empty as (_: {
      indexFileNames: Set<string>;
    }) => Awaitable,
  };

  install = HooksInstaller(this.hooks);

  async make() {
    await this.init();

    this._indexFileNames = new Set();
    // await this.hooks.make();
    await this._makeConfigs();
    await this.hooks.make({ indexFileNames: this._indexFileNames });
    await this._makeIndexFile();

    this._indexFileNames = null;
  }

  webpackCallback = (err, stats) => {
    if (stats) {
      this.log.info(stats.toString(this.webpackConfig.stats));
    }
  };

  @Lazy() get webpackConfig(): webpack.Configuration {
    return {
      mode: "development",
      devtool: "inline-source-map",
      node: {
        __filename: true,
        __dirname: true,
      },
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          name: "vendor",
        },
      },
      output: {
        path: this.mainPlatformInfo.bundleDir,
      },
      entry: {
        index: this.mainPlatformInfo.generatedIndexFileName,
      },
      stats: {
        warnings: false,
        colors: true,
      },
      resolve: {
        // symlinks: false,
        plugins: [new tsConfigPathsWebpackPlugin()],
        alias: {
          // TODO: @dabsi
        },
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
              configFile: this.mainPlatformInfo.tsConfigFileName,
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
    };
  }

  protected async pack() {
    await this.init();
    webpack(this.webpackConfig).run(this.webpackCallback);
  }
}

function relativePathToCurrent(path: string) {
  return relativePosixPath(DABSI_CURRENT_PATH, path);
}

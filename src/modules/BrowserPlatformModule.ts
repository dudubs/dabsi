import express from "express";
import { realpathSync } from "fs";
import * as path from "path";
import tsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { makeHtml } from "../common/makeHtml";
import { mapObject } from "../common/object/mapObject";
import { pick } from "../common/object/pick";
import { values } from "../common/object/values";
import { Lazy } from "../common/patterns/lazy";
import { existsDirSync } from "../filesystem/existsDirSync";
import { DABSI_PATH, DABSI_SRC_PATH } from "../index";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { DevModule } from "../typestack/DevModule";
import { MakeModule } from "../typestack/MakeModule";
import { ProjectModule } from "../typestack/ProjectModule";
import { Cli } from "./Cli";
import { ExpressModule } from "./ExpressModule";
import { relativePosixPath } from "./pathHelpers";
import { PlatformInfo } from "./PlatformInfo";

@Module({
  dependencies: [DevModule, ExpressModule],
})
export class BrowserPlatformModule {
  packCli = new Cli().push({
    lastRun: () => this.pack(),
  });

  cli = new Cli() //
    .connect("pack", this.packCli);

  scripts: string[] = [];

  log = log.get("BROWSER");

  constructor(
    @Inject() protected mProject: ProjectModule,
    @Inject() protected mMake: MakeModule,
    @Inject() mExpress: ExpressModule,
    @Inject() cli: Cli
  ) {
    cli.connect("browser", this.cli);

    mMake.cli.push({
      run: () => this.make(),
    });

    mExpress.push({
      postBuild: (app) => {
        app.get("/*", (req, res) => {
          res.setHeader("Content-Type", "text/html");
          res.send(
            makeHtml({
              scripts: [
                ...this.scripts,
                ...["vendor", "index", "runtime"].map(
                  (name) => `/bundle/browser/${name}.js`
                ),
              ],
            })
          );
        });
      },
      build: (app) => {
        const bundlePath = realpathSync("./bundle/browser");
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

  currentPlatformInfo: PlatformInfo;

  async init() {
    await this.mProject.init();
    this.platformInfoMap = mapObject(
      this.mProject.projectInfoMap,
      (p) => new PlatformInfo(p, "browser")
    );
    this.currentPlatformInfo = this.platformInfoMap[
      this.mProject.currentProjectInfo.rootDir
    ];
  }

  protected async makePlatformConfig(platformInfo: PlatformInfo) {
    await this.mMake.makeJsonFile(platformInfo.tsConfigFileName, {
      extends: relativePosixPath(
        platformInfo.projectInfo.rootDir,
        path.join(DABSI_PATH, platformInfo.tsConfigBaseName)
      ),
      ...pick(platformInfo.projectInfo.tsConfigInfo.config, "compilerOptions"),
      include: [
        relativePosixPath(
          platformInfo.projectInfo.rootDir,
          platformInfo.generatedIndexFileName
        ),
      ],
    });
  }

  protected async makePlatformModuleConfigs(platformInfo: PlatformInfo) {
    for (const dirName of platformInfo.projectInfo.dirNames) {
      const platformModuleDir = path.join(dirName, platformInfo.name);
      if (!existsDirSync(platformModuleDir)) continue;
      await this.mMake.makeJsonFile(
        path.join(platformModuleDir, "tsconfig.json"),
        {
          extends: relativePosixPath(
            platformModuleDir,
            platformInfo.tsConfigFileName
          ),
        }
      );
    }
  }

  protected async make() {
    await this.init();

    let indexFileCode = ``;
    for (const platformInfo of values(this.platformInfoMap)) {
      if (platformInfo.projectInfo.rootDir !== DABSI_PATH) {
        await this.makePlatformConfig(platformInfo);
      }
      await this.makePlatformModuleConfigs(platformInfo);
      for (let indexFileName of platformInfo.findIndexDirNames()) {
        indexFileCode = `import "${this.mProject.currentProjectInfo.tsConfigInfo.resolvePath(
          this.currentPlatformInfo.generatedDir,
          indexFileName
        )}";\n${indexFileCode}`;
      }
    }
    await this.mMake.makeFile(
      this.currentPlatformInfo.generatedIndexFileName,
      `import "${this.mProject.currentProjectInfo.tsConfigInfo.resolvePath(
        this.currentPlatformInfo.generatedDir,
        path.join(DABSI_SRC_PATH, "common/register.ts")
      )}";\n${indexFileCode}`
    );
  }

  webpackCallback = (err, stats) => {
    if (stats) {
      this.log.info(stats.toString({ colors: true }));
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
        path: this.currentPlatformInfo.bundleDir,
      },
      entry: {
        index: this.currentPlatformInfo.generatedIndexFileName,
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
              configFile: this.currentPlatformInfo.tsConfigFileName,
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

import { makeHtml } from "@dabsi/common/makeHtml";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_DIR, DABSI_NM_DIR, DABSI_WORKSPACE_DIR } from "@dabsi/env";
import { touchFile } from "@dabsi/filesystem/touchFile";
import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/ExpressModule";
import MakeModule from "@dabsi/modules/MakeModule";
import PlatformModule from "@dabsi/modules/PlatformModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import ServerDevModule from "@dabsi/modules/ServerModule.dev";
import watchOnPlatform from "@dabsi/modules/watchOnPlatform";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import { watch } from "fs";
import { values } from "lodash";
import path from "path";
import ReloadServer from "reload";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

const RELOAD_FILENAME = path.join(
  DABSI_WORKSPACE_DIR,
  `reload.packed-browser.lock`
);

@Module({
  cli: "browser",
})
export default class BrowserDevModule {
  readonly platform = this.platformModule.getPlatform("browser");

  readonly generatedDir = path.join(this.projectModule.generatedDir, "browser");

  readonly log = log.get("BROWSER.DEV");

  readonly platforms = [
    this.platformModule.getPlatform("common"),
    this.platformModule.getPlatform("view"),
    this.platform,
  ];

  constructor(
    protected projectModule: ProjectModule,
    protected platformModule: PlatformModule,
    protected makeModule: MakeModule,
    protected serverDevModule: ServerDevModule
  ) {
    this.platform.settings.isViewPlatform = true;
    this.platform.settings.includeInternalFiles = true;
  }

  @Once() async load() {
    await Promise.all(this.platforms.map(p => p.load()));
  }

  @CliCommand("make") async make() {
    await this.load();

    return this.platformModule.makeFiles(
      this.generatedDir,
      this.platforms,
      'import "@dabsi/browser/register";\n'
    );
  }

  @Once() async getWebpackCompiler() {
    const platformFiles = await this.make();

    const tsconfigPath = path.join(
      this.projectModule.configsDir,
      `tsconfig.browser.webpack.json`
    );

    await this.makeModule.makeTsconfigFile(tsconfigPath, {
      extends: path.join(DABSI_DIR, "configs/tsconfig.browser.base.json"),
      compilerOptions: {
        ...(await this.projectModule.getPaths()).createPathsWithBaseUrl(
          this.projectModule.configsDir
        ),
      },
      include: [...values(platformFiles)],
    });

    // Fixing bug: TsconfigPaths preffer TS_NODE_PORJECY instead configFile.
    delete process.env["TS_NODE_PROJECT"];

    return webpack({
      mode: "development",
      stats: { warnings: false },
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
      entry: {
        index: platformFiles.indexFileName,
        tests: platformFiles.testsFileName,
      },
      output: {
        path: path.resolve(
          this.projectModule.settings.directory,
          "bundle/browser"
        ),
      },
      resolve: {
        plugins: [
          new TsConfigPathsWebpackPlugin({
            configFile: path.resolve(
              this.projectModule.settings.directory,
              "tsconfig.json"
            ),
            logLevel: "WARN",
            silent: false,
            mainFields: ["browser", "main"],
            extensions: [".ts", ".tsx"],
          }),
        ],
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
              configFile: tsconfigPath,
              transpileOnly: true,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    });
  }

  protected _isPacking = false;
  protected _repack = false;
  protected async _pack() {
    if (this._isPacking) {
      this._repack = true;
      return;
    }
    this._isPacking = true;
    const compiler = await this.getWebpackCompiler();
    const stats = await new Promise<webpack.Stats>((resolve, reject) => {
      compiler.run((error, stats: webpack.Stats) => {
        if (error) return reject(error);
        resolve(stats);
      });
    });
    this._isPacking = false;
    console.log(stats.toString({ colors: true }));
    if (this._repack) {
      this._repack = false;
      await this._pack();
    }
  }

  @CliCommand("pack")
  async pack() {
    await this._pack();
  }

  installExpressForBrowser(
    @Plugin() sdm: ServerDevModule,
    @Plugin()
    expressModule: ExpressModule,
    @Plugin() browserModule: BrowserModule
  ) {
    if (!sdm.isDevChild) return;
    let reload: null | (() => void) = null;

    expressModule.preBuilders.push(app => {
      browserModule.scripts.push("/reload/reload.js");

      ReloadServer(app).then(server => {
        this.log.info(() => `reload server is ready.`);
        reload = () => {
          this.log.info(() => `reloading..`);
          server.reload();
        };
      });

      touchFile(RELOAD_FILENAME).then(() => {
        watch(RELOAD_FILENAME, () => {
          reload?.();
        });
      });

      // jasmine
      app.use(
        "/jasmine/lib",
        express.static(path.join(DABSI_NM_DIR, "jasmine-core/lib/jasmine-core"))
      );
      app.get("/jasmine", (req, res) => {
        res.contentType("text/html").send(
          makeHtml({
            scripts: [
              "/reload/reload.js",
              ...["jasmine", "jasmine-html", "boot"].map(
                name => `/jasmine/lib/${name}.js`
              ),
              ...["vendor", "index", "tests", "runtime"].map(
                name => `/bundle/browser/${name}.js`
              ),
            ],
            head: `<link rel="stylesheet" href="/jasmine/lib/jasmine.css">`,
          })
        );
      });
    });
  }

  packAndWatch() {
    this._pack();
    //
    watchOnPlatform(["common", "view", "browser", "server"], async () => {
      this.log("reloading");
      await this._pack();
      await touchFile(RELOAD_FILENAME);
    });
  }

  @CliCommand("start-dev")
  startDev() {
    return Promise.all([
      //
      this.serverDevModule.startDev(),
      //
      this.packAndWatch(),
    ]);
  }
}

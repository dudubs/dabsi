import { makeHtml } from "@dabsi/common/makeHtml";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_NM_DIR, DABSI_WORKSPACE_DIR } from "@dabsi/env";
import { touchFile } from "@dabsi/filesystem/touchFile";
import BrowserModule from "@dabsi/modules/BrowserModule";
import DevModule from "@dabsi/modules/DevModule";
import ExpressModule from "@dabsi/modules/ExpressModule";
import MakeModule from "@dabsi/modules/MakeModule";
import PlatformModule from "@dabsi/modules/PlatformModule";
import ProjectModule from "@dabsi/modules/ProjectModule";
import ServerDevModule from "@dabsi/modules/ServerModule.dev";
import watchOnPlatform from "@dabsi/modules/watchOnPlatform";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import { realpathSync, watch } from "fs";
import path from "path";
import ReloadServer from "reload";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

@Module({
  cli: "browser",
})
export default class BrowserDevModule {
  readonly platform = this.platformModule.getPlatform("browser");

  readonly generatedDir = path.join(this.projectModule.generatedDir, "browser");

  readonly platforms = [
    this.platformModule.commonPlatform,
    this.platformModule.viewPlatform,
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

  @CliCommand("make") async make() {
    await Promise.all(this.platforms.map(p => p.load()));

    return this.platformModule.makeFiles(
      this.generatedDir,
      this.platforms,
      'import "@dabsi/browser/register";\n'
    );
  }
  @Once() async getWebpackCompiler() {
    const platformFiles = await this.make();

    const tsConfigFile = realpathSync(
      path.resolve(
        this.projectModule.settings.directory,
        `configs/tsconfig.prod.browser.json`
      )
    );

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
              configFile: tsConfigFile,
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

  installDevWithExpress(
    @Plugin()
    expressModule: ExpressModule,
    @Plugin() browserModule: BrowserModule
  ) {
    let reload: null | (() => void) = null;
    browserModule.scripts.push("/reload/reload.js");

    expressModule.preBuilders.push(app => {
      ReloadServer(app).then(server => {
        expressModule.log.info(() => `reload server is ready.`);
        reload = () => {
          expressModule.log.info(() => `reloading..`);
          server.reload();
        };
      });

      touchFile(RELOAD_FILENAME).then(() => {
        watch(RELOAD_FILENAME, () => {
          reload?.();
        });
      });
    });

    expressModule.preBuilders.push(app => {
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
    watchOnPlatform(["common", "view", "browser", "server"], async () => {
      await this._pack();
      await touchFile(RELOAD_FILENAME);
      // reload?.();
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

const RELOAD_FILENAME = path.join(
  DABSI_WORKSPACE_DIR,
  `reload.packed-browser.lock`
);

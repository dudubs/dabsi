import { makeHtml } from "@dabsi/common/makeHtml";
import { Once } from "@dabsi/common/patterns/Once";
import { DABSI_NM_DIR, DABSI_WORKSPACE_DIR } from "@dabsi/env";
import { touchFile } from "@dabsi/filesystem/touchFile";
import { DevModule2 } from "@dabsi/modules2/DevModule2";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import { realpathSync, watch } from "fs";
import path from "path";
import ReloadServer from "reload";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import WebpackVirtualModulesPlugin from "webpack-virtual-modules";
@Module({
  cli: "browser",
})
export default class BrowserPlatformModule {
  readonly scripts: string[] = [];

  log = log.get("Browser");

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2
  ) {}

  installPlatform(@Plugin() platformModule: PlatformModule2) {
    platformModule.platformConfigMap.set("browser", { view: true });
  }

  @Once() async getWebpackCompiler() {
    const generatedOutDir = path.join(
      this.projectModule.settings.directory,
      "src/generated"
    );

    const generated = await this.platformModule.generateCode(
      generatedOutDir,
      "browser",
      'import "@dabsi/browser/register";'
    );

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
      plugins: [new WebpackVirtualModulesPlugin(generated.codeMap)],
      entry: {
        ...generated.entityMap,
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
    @Plugin() devModule: DevModule2,
    @Plugin()
    expressModule: ExpressModule2
  ) {
    let reload: null | (() => void) = null;
    this.scripts.push("/reload/reload.js");

    const reloadFile = path.join(
      DABSI_WORKSPACE_DIR,
      `reload.packed-browser.lock`
    );

    expressModule.preBuilders.push(app => {
      ReloadServer(app).then(server => {
        expressModule.log.info(() => `reload server is ready.`);
        reload = () => {
          expressModule.log.info(() => `reloading..`);
          server.reload();
        };
      });

      touchFile(reloadFile).then(() => {
        watch(reloadFile, () => {
          reload?.();
        });
      });
    });

    devModule.parentRunners.push(() => this._pack());

    for (const platform of ["common", "view", "browser", "server"]) {
      devModule.watch(platform, async () => {
        //

        console.log("pack and reload");
        await this._pack();
        await touchFile(reloadFile);
        // reload?.();
      });
    }

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
}

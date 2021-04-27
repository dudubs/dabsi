import { makeHtml } from "@dabsi/common/makeHtml";
import { NODE_MODULES_DIR } from "@dabsi/env";
import { DevModule2 } from "@dabsi/modules2/DevModule2";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import path from "path";
import ReloadServer from "reload";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import WebpackVirtualModulesPlugin from "webpack-virtual-modules";
@Module({
  cli: "browser",
})
export class BrowserModule2 {
  readonly scripts: string[] = [];

  log = log.get("Browser");

  constructor(
    protected projectModule: ProjectModule2,
    protected platformModule: PlatformModule2
  ) {}

  installPlatform(@Plugin() platformModule: PlatformModule2) {
    platformModule.platformConfigMap.set("browser", { view: true });
  }

  async createWebpackCompiler() {
    const generatedOutDir = path.join(
      this.projectModule.directory,
      "src/generated"
    );

    const {
      entityMap: generatedEntityMap,
      codeMap: generatedCodeMap,
    } = await this.platformModule
      .generateCode(generatedOutDir, "browser")
      .catch(error => {
        console.log({ error });
        throw error;
      });

    return webpack({
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
      plugins: [new WebpackVirtualModulesPlugin(generatedCodeMap)],
      entry: {
        ...generatedEntityMap,
      },
      output: {
        path: path.resolve(this.projectModule.directory, "bundle/browser"),
      },
      resolve: {
        plugins: [<any>new TsConfigPathsWebpackPlugin()],
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: {
              configFile: path.resolve(
                this.projectModule.directory,
                `configs/tsconfig.browser.json`
              ),
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

  @CliCommand("pack", y =>
    y.option("watch", { type: "boolean", alias: "w", default: false })
  )
  async pack({ watch }) {
    // console.log(await this.createWebpackCompiler2());
    // return;
    const compiler = await this.createWebpackCompiler();

    if (watch) {
      throw new Error("no support yet.");
    }

    const stats = await new Promise<webpack.Stats>((resolve, reject) => {
      compiler.run((error, stats: webpack.Stats) => {
        console.log({ error });

        if (error) return reject(error);
        resolve(stats);
      });
    });

    console.log(stats.toString(true));
  }

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
        express.static(path.join(projectModule.directory, "bundle/browser"))
      );
    });
  }

  installDevWithExpress(
    @Plugin() devModule: DevModule2,
    @Plugin()
    expressModule: ExpressModule2
  ) {
    let reload: null | (() => void) = null;
    this.scripts.push("/reload/reload.js");
    expressModule.preBuilders.push(app => {
      ReloadServer(app).then(server => {
        expressModule.log.info(() => `reload server is ready.`);
        reload = () => {
          expressModule.log.info(() => `reloading..`);
          server.reload();
        };
      });
    });

    for (const platform of ["common", "view", "browser"]) {
      devModule.watch(platform, () => {
        reload?.();
      });
    }

    expressModule.preBuilders.push(app => {
      app.use(
        "/jasmine/lib",
        express.static(
          path.join(NODE_MODULES_DIR, "jasmine-core/lib/jasmine-core")
        )
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

import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { makeHtml } from "@dabsi/common/makeHtml";
import { DevModule2 } from "@dabsi/modules2/DevModule";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { ProjectModule2 } from "@dabsi/modules2/ProjectModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";
import { realpathSync } from "fs";
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

  installPlatform(@Plugin() platformModule: PlatformModule2) {
    platformModule.platformConfigMap.set("browser", { view: true });
  }

  @CliCommand("pack") async pack(
    { w, watch = w || false }: { w?: boolean; watch?: boolean } = {},
    platformModule: PlatformModule2,
    projectModule: ProjectModule2,
    process: AsyncProcess
  ) {
    await process.wait();

    const generatedOutDir = path.join(projectModule.directory, "src/generated");
    const {
      entityMap: generatedEntityMap,
      codeMap: generatedCodeMap,
    } = await platformModule.generateCode(generatedOutDir, "browser");

    const compiler = webpack({
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
        path: path.resolve(projectModule.directory, "bundle/browser"),
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
                projectModule.directory,
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

    const compileCallback = (error, stats) => {
      if (stats) {
        this.log.info(stats.toString({ colors: true, warnings: false }));
      } else if (error) {
        throw error;
      }
    };

    if (watch) {
      compiler.watch({}, compileCallback);
    } else {
      compiler.run(compileCallback);
    }
  }

  installExress(@Plugin() expressModule: ExpressModule2) {
    expressModule.builders.push(app => {
      //
      const bundlePath = realpathSync("bundle/browser");
      const bundleStatic = express.static(bundlePath);
      app.use("/bundle/browser", (req, res, next) => {
        bundleStatic(req, res, () => {
          if (req.path.endsWith(".js")) {
            return res
              .contentType("text/javascript")
              .send(`console.error("File not found");`);
          }
          res.status(404).send(`File not found`);
        });
      });
    });
    expressModule.postbuilders.push(app => {
      app.get("/*", (req, res) => {
        res.contentType("text/html").send(
          makeHtml({
            head: `<meta charset="utf-8">`,
            scripts: [
              ...this.scripts,
              ...[].map(name => `/bundle/browser/${name}.js`),
            ],
          })
        );
      });
    });
  }

  installDevWithExpress(
    @Plugin() devModule: DevModule2,
    @Plugin()
    expressModule: ExpressModule2
  ) {
    let reload: null | (() => void) = null;
    this.scripts.push("/reload/reload.js");
    expressModule.prebuilders.push(app => {
      ReloadServer(app).then(server => {
        expressModule.log.info(() => `reload server is ready.`);
        reload = () => {
          expressModule.log.info(() => `reloading..`);
          server.reload();
        };
      });
    });
    devModule.watch("view", () => {
      reload?.();
    });

    devModule.watch("browser", () => {
      reload?.();
    });
  }
}

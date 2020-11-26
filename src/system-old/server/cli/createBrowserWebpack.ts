import { realpathSync } from "fs";
import { join, resolve } from "path";
import Webpack from "webpack";

export const CURRENT_PATH = realpathSync(".");
export const BROWSER_PATH = realpathSync(
  resolve(CURRENT_PATH, "src/system-old/browser")
);

export const NODE_MODULES_PATH = resolve(CURRENT_PATH, "node_modules");
export const SYSTEM_BROWSER_BUNDLE = "./bundle/system-browser";

export function createBrowserWebpack() {
  return Webpack({
    mode: "development",
    devtool: "inline-source-map",
    output: {
      path: resolve(CURRENT_PATH, SYSTEM_BROWSER_BUNDLE),
    },
    entry: {
      index: join(BROWSER_PATH, "index.ts"),
      register: join(BROWSER_PATH, "register.ts"),
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        name: "vendor",
      },
    },
    stats: {
      warnings: false,
    },
    resolve: {
      // symlinks: false,
      alias: {
        // ...getAliases(),
        // dabsi: resolve(__dirname, "..", "dabsi-src"),
      },
      modules: [NODE_MODULES_PATH],
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            configFile: resolve(BROWSER_PATH, "tsconfig.json"),
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      ],
    },
  });
}

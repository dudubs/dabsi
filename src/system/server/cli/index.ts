import { watch } from "fs";
import reload from "reload";
import yargs from "yargs";
import { SystemDatabaseConnection } from "../systemDatabaseConnection";
import { SystemExpressApp } from "../systemExpressApp";
import {
  createBrowserWebpack,
  SYSTEM_BROWSER_BUNDLE,
} from "./createBrowserWebpack";

yargs
  .scriptName("dabsi system")
  .command(
    "browser",
    "",
    y => y.boolean(["prod", "p"]),
    ({ w, watch = w }) => {
      if (watch) {
        createBrowserWebpack().watch({}, webpackCallback);
      } else {
        createBrowserWebpack().run(webpackCallback);
      }

      function webpackCallback(err, result) {
        console.log(result?.toString({ colors: true }));
      }
    }
  )
  .command(
    "start",
    "",
    y => y.boolean("prod").number("port").string("host"),
    async ({ prod, port = 7070, host = "0.0.0.0" }) => {
      const isDev = !prod;
      await SystemDatabaseConnection();

      const app = SystemExpressApp(
        {
          scripts: isDev ? `<script src="/reload/reload.js"></script>` : "",
        },
        app => {
          if (isDev) {
            reload(app).then(r => {
              console.log(`watching ${SYSTEM_BROWSER_BUNDLE}`);
              watch(SYSTEM_BROWSER_BUNDLE, () => {
                r.reload();
              });
            });
          }
        }
      );

      const server = app.listen(port, host, () => {
        console.log(`server is running ${host}:${port}`);
      });

      process.on("SIGINT", () => {
        server.close();
        process.exit();
      });
    }
  )
  .help().argv;

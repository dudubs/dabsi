import * as fs from "fs";
import reload from "reload";
import yargs from "yargs";
import { DataResolvers } from "../../../typedata/DataResolvers";
import { PermissionManager } from "../acl/PermissionManager";
import { User } from "../acl/User";
import { createSystemExpress } from "../createSystemExpress";
import { SystemBootstrap } from "../SystemBootstrap";
import {
  createBrowserWebpack,
  SYSTEM_BROWSER_BUNDLE,
} from "./createBrowserWebpack";
import { SystemCommand } from "./SystemCommand";

(async () => {
  await SystemBootstrap();
  yargs
    .scriptName("dabsi system")
    .command(
      "init",
      "",
      (y) => y,
      () =>
        SystemCommand(
          {
            ...DataResolvers({ users: User }),
            pm: PermissionManager,
          },
          async (c) => {
            const root = await c.users.of("loginName", "root").pick([]).touch({
              firstName: "root",
              lastName: "root",
            });
            await c.pm.addToken("user", root.$key, "ROOT");
          }
        )
    )
    .command(
      "browser",
      "",
      (y) => y.boolean(["prod", "p"]),
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
      (y) => y.boolean("prod").number("port").string("host"),
      async ({ prod, port = 7070, host = "0.0.0.0" }) => {
        const isDev = !prod;

        const app = createSystemExpress(
          {
            scripts: isDev ? `<script src="/reload/reload.js"></script>` : "",
          },
          (app) => {
            if (isDev) {
              reload(app).then((r) => {
                console.log(`watching ${SYSTEM_BROWSER_BUNDLE}`);
                fs.watch(SYSTEM_BROWSER_BUNDLE, () => {
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
})();

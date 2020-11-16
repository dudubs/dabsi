import { watch } from "fs";
import reload from "reload";
import yargs from "yargs";
import { Timeout } from "../../../common/async/Timeout";
import { DataResolvers } from "../../../typedata/DataResolvers";
import { Resolver } from "../../../typedi";
import { ConsumeDeps, ConsumeFactory } from "../../../typedi/internal/_consume";
import { getPasswordHash } from "../acl/getPasswordHash";
import { PermissionManager } from "../acl/PermissionManager";
import { User } from "../acl/User";
import { createSystemDatabaseConnection } from "../createSystemDatabaseConnection";
import { SystemBootstrap } from "../SystemBootstrap";
import { createSystemExpress } from "../SystemExpress";
import { SystemResolvers } from "../SystemResolvers";
import {
  createBrowserWebpack,
  SYSTEM_BROWSER_BUNDLE,
} from "./createBrowserWebpack";

function SystemCommand<U extends ConsumeDeps>(
  deps: U,
  callback: ConsumeFactory<any, U>
) {
  return Resolver.checkAndResolve(
    Resolver.consume(deps, callback),
    SystemResolvers
  );
}

(async () => {
  await SystemBootstrap();
  yargs
    .scriptName("dabsi system")
    .command(
      "init",
      "",
      y => y,
      () =>
        SystemCommand(
          {
            ...DataResolvers({ users: User }),
            pm: PermissionManager,
          },
          async c => {
            const root = await c.users.of("loginName", "root").pick([]).touch();
            await c.pm.addToken("user", root.$key, "ROOT");
          }
        )
    )
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
        await createSystemDatabaseConnection();

        const app = createSystemExpress(
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
})();

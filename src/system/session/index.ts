import { getSession } from "@dabsi/system-old/server/acl/getSession";
import { SystemModule } from "@dabsi/system/core";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import CookieParser from "cookie-parser";
import { DataRow } from "@dabsi/typedata/DataRow";

import { SystemSession } from "@dabsi/system/session/SystemSession";

@Module()
export default class SystemSessionModule {
  constructor(@Inject() protected systemModule: SystemModule) {
    systemModule.use(
      ["cookie-parser", () => CookieParser()],

      [
        "load session",
        Resolver.toCheck(
          Resolver.consume({ getDataSource: DataSourceResolver }, c => {
            return async (req, res, next) => {
              const sessions = c.getDataSource(SystemSession);
              const session = await getSession({
                source: sessions,
                cookie: req.cookies["system"],
                setCookie(value: string) {
                  res.cookie("system", value);
                },
              });

              Resolver.provide(
                req.systemContext,
                DataRow(SystemSession).provide(() => session)
              );
              next();
            };
          }),
          context => {
            Resolver.provide(context, SystemSession.provide());
          }
        ),
      ]
    );
  }
}

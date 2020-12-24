import { getSession } from "@dabsi/system-old/server/acl/getSession";
import { SystemModule } from "@dabsi/system/core/SystemModule";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import CookieParser from "cookie-parser";
import { DataRow } from "./../../typedata/DataRow";
import { Consumer } from "./../../typedi/Consumer";
import { SystemSession } from "./SystemSession";

const r = Resolver();

@Module()
export default class SystemSessionModule {
  constructor(@Inject() protected systemModule: SystemModule) {
    systemModule.use(
      ["cookie-parser", () => CookieParser()],

      [
        "load session",
        Resolver.toCheck(
          Consumer({ getDataSource: DataSourceResolver }, c => {
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

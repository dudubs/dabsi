import ExpressModule, { ExpressResolver } from "@dabsi/modules/express";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import CookieParser from "cookie-parser";
import { getSession } from "../../../system-old/server/acl/getSession";
import { DataRow } from "../../../typedata/row";
import DataSourceResolver from "../../data/DataSourceResolver";
import SessionModule from "../../session";
import RequestSession from "../../session/RequestSession";

const cookieParser = CookieParser();

@Module({
  dependencies: [SessionModule],
})
export default class SessionForExpressModule {
  constructor(@Inject() expressModule: ExpressModule) {
    Resolver.provide(expressModule.context, RequestSession.provide());

    expressModule.contextResolvers.push(
      Resolver.consume(
        [DataSourceResolver(RequestSession), ExpressResolver],
        async (sessions, [req, res]) => {
          await new Promise(next => cookieParser(req, res, next));
          const session = await getSession({
            source: sessions,
            cookie: req.cookies["session"],
            setCookie(value) {
              res.cookie("session", value);
            },
          });
          return DataRow(RequestSession).provide(() => session);
        }
      )
    );
  }
}

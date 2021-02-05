import { DataContext } from "@dabsi/modules/data/context";
import ExpressModule, { ExpressResolver } from "@dabsi/modules/express";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import CookieParser from "cookie-parser";
import { getSession } from "../../../system-old/server/acl/getSession";
import { DataRow } from "../../../typedata/row";
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
        [DataContext, ExpressResolver],
        async (conn, [req, res]) => {
          await new Promise(next => cookieParser(req, res, next));
          const session = await getSession({
            source: conn.getSource(RequestSession),
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

import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DataTicker } from "@dabsi/modules/data/ticker";
import ExpressModule, { ExpressResolver } from "@dabsi/modules/express";
import { Request } from "@dabsi/modules/RequestModule";
import { Session } from "@dabsi/modules/session/entities/Session";
import { User } from "@dabsi/system/acl/entities/User";
import { Module, Resolver } from "@dabsi/typedi";
import { RpcError } from "@dabsi/typerpc/RpcError";
import CookieParser from "cookie-parser";
import { getSessionKey } from "../../../system-old/server/acl/getSession";
import SessionModule, { RequestSession, RequestUser } from "../../session";

const cookieParser = CookieParser();

@Module({
  dependencies: [SessionModule],
})
export default class SessionForExpressModule {
  constructor(expressModule: ExpressModule, dataModule: DataModule) {
    Resolver.provide(
      expressModule.context,
      RequestSession.provide(),
      RequestUser.provide()
    );

    expressModule.requestContextResolvers.push(
      Resolver.consume(
        [DataContext, ExpressResolver, Request, DataTicker],
        async (data, [expReq, expRes], req, ticker) => {
          await new Promise(next => cookieParser(expReq, expRes, next));
          const sessions = data.getSource(Session);
          const [sessionKey, userKey] = await getSessionKey({
            source: data.getSource(Session),
            cookie: expReq.cookies["session"],
            setCookie(value) {
              expRes.cookie("session", value);
            },
          });

          req.cleanups.push(() =>
            sessions.update({
              timeout: new Date().getTime(),
            })
          );

          return {
            ...RequestSession.provide(() =>
              ticker.getRowTicker(Session, sessionKey)
            ),
            ...RequestUser.provide(() => {
              if (!userKey) {
                throw new RpcError("No loging user");
              }
              return ticker.getRowTicker(User, userKey);
            }),
          };
        }
      )
    );
  }
}

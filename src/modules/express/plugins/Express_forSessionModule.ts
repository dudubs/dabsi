import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DataTicker } from "@dabsi/modules/data/ticker";
import ExpressModule, { ExpressResolver } from "@dabsi/modules/express";
import { Request } from "@dabsi/modules/Request";
import { Session } from "@dabsi/modules/session/entities/Session";
import { User } from "@dabsi/system/acl/entities/User";
import { Module, Resolver } from "@dabsi/typedi";
import { RpcError } from "@dabsi/typerpc/RpcError";
import CookieParser from "cookie-parser";
import { getSessionKey } from "../../../system-old/server/acl/getSession";
import SessionModule, {
  RequestSession,
  RequestUser,
} from "../../session/module";

const cookieParser = CookieParser();

@Module({
  dependencies: [SessionModule],
})
export default class SessionForExpressModule {
  constructor(expressModule: ExpressModule, dataModule: DataModule) {
    Resolver.Context.assign(expressModule.context, [
      RequestSession,
      RequestUser,
    ]);

    expressModule.requestBuilders.push(
      Resolver(
        [c => c, DataContext, ExpressResolver, Request, DataTicker],
        async (context, data, [expReq, expRes], req, ticker) => {
          await new Promise(next => cookieParser(expReq, expRes, next));
          const sessions = data.getSource(Session);
          const [sessionKey, userKey] = await getSessionKey({
            source: data.getSource(Session),
            cookie: expReq.cookies["session"],
            setCookie(value) {
              expRes.cookie("session", value);
            },
          });

          req.cleaners.push(() =>
            sessions.update({
              timeout: new Date().getTime(),
            })
          );

          Resolver.Context.assign(
            context,
            Resolver(RequestSession, () =>
              ticker.getRowTicker(Session, sessionKey)
            ),
            Resolver(RequestUser, () => {
              if (!userKey) {
                throw new RpcError("No loging user");
              }
              return ticker.getRowTicker(User, userKey);
            })
          );
        }
      )
    );
  }
}

import ExpressModule from "@dabsi/modules/express";
import RequestModule from "@dabsi/modules/RequestModule";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import CookieParser from "cookie-parser";
import SessionModule, { SessionCookieResolver } from "../../session";

@Module({
  dependencies: [SessionModule],
})
export default class SessionForExpressModule {
  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() requestModule: RequestModule
  ) {
    Resolver.provide(requestModule.context, RequestSession.provide());

    expressModule.onBuildRoutes(app => {
      app.use(CookieParser(), (req, res) => {
        Resolver.provide(
          req.requestContext,
          SessionCookieResolver.provide(() => ({
            get: () => req.cookies["session"],
            set: value => {
              res.cookie("session", value);
            },
          }))
        );
      });
    });
  }
}

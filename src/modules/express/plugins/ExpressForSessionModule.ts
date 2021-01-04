import ExpressModule from "@dabsi/modules/express";
import RequestModule from "@dabsi/modules/RequestModule";
import { getSession } from "@dabsi/system-old/server/acl/getSession";
import { SystemRpcPath } from "@dabsi/system/common/SystemRpc";
import RequestSession from "@dabsi/modules/session/RequestSession";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Inject, Module, Resolver } from "@dabsi/typedi";

@Module()
export default class SessionForExpressModule {
  constructor(
    @Inject() expressModule: ExpressModule,
    @Inject() requestModule: RequestModule
  ) {
    Resolver.provide(requestModule.context, RequestSession.provide());

    requestModule.require(DataSourceFactoryResolver);

    expressModule.onBuildRoutes(app => {
      app.post(SystemRpcPath, async (req, res, next) => {
        Resolver.provide(
          req.requestContext,
          DataRow(RequestSession).provide(() => session)
        );

        const getDataSource = Resolver.resolve(
          DataSourceFactoryResolver,
          req.requestContext
        );

        const session = await getSession({
          source: getDataSource(RequestSession),
          cookie: req.cookies["system"],
          setCookie(value: string) {
            res.cookie("system", value);
          },
        });

        next();
      });
    });
  }
}

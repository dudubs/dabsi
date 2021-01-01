import ExpressModule from "@dabsi/modules/express";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export class ExpressLoggerModule {
  constructor(@Inject() expressModule: ExpressModule) {
    expressModule.beforeBuildRoutes(app => {
      app.use((req, res, next) => {
        expressModule.log.info(
          `${req.method} ${req.path} HTTP/${req.httpVersion}`
        );
        next();
      });
    });
  }
}

import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import RequestModule from "@dabsi/modules/RequestModule";
import { ServerModule } from "@dabsi/modules/ServerModule";
import { AnyResolverMap, Inject, Module } from "@dabsi/typedi";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      requestContext: AnyResolverMap;
    }
  }
}

export const requestContextSymbol = Symbol("requestContext");

@Module()
export default class ExpressModule {
  log = this.serverModule.log.get("EXPRESS");

  constructor(
    @Inject() protected serverModule: ServerModule,
    @Inject() protected requestModule: RequestModule
  ) {
    serverModule.onStart(async args => {
      this.log.info("starting ...");
      const app = express();

      app.use((req, res, next) => {
        req.requestContext = Object.create(requestModule.context);
        next();
      });

      await this.beforeBuildRoutes.invoke(app);

      await this.onBuildRoutes.invoke(app);

      await this.afterBuildRoutes.invoke(app);

      await this.onRun.invoke(app);
    });
  }

  beforeBuildRoutes = Hookable<(app: express.Application) => Awaitable>();
  onBuildRoutes = Hookable<(app: express.Application) => Awaitable>();
  afterBuildRoutes = Hookable<(app: express.Application) => Awaitable>();
  onRun = Hookable<(app: express.Application) => Awaitable>();

  listen(port: number, addr = "0.0.0.0") {
    this.onRun(app => {
      this.log.info(`listening: ${addr}:${port}`);
      const server = app.listen(port, addr);
      process.on("SIGINT", () => {
        server.close();
      });
    });
  }
}

import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import RequestModule from "@dabsi/modules/RequestModule";
import ServerModule from "@dabsi/modules/server";
import { Module, Resolver, ResolverMap } from "@dabsi/typedi";
import express from "express";

export const ExpressResolver = Resolver.token<
  [express.Request, express.Response]
>();

@Module()
export default class ExpressModule {
  log = this.serverModule.log.get("EXPRESS");

  constructor(
    protected serverModule: ServerModule,
    protected requestModule: RequestModule
  ) {
    serverModule.onStart(async args => {
      this.log.info("starting ...");
      const app = express();

      app.use((req, res, next) => {
        this.log.info(
          () => `${req.method} ${req.path} HTTP/${req.httpVersion}`
        );
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

  context: ResolverMap = Object.setPrototypeOf(
    {
      ...ExpressResolver.provide(),
    },
    this.requestModule.context
  );

  requestContextResolvers: Resolver<Awaitable<ResolverMap>>[] = [];

  // onRequest: () => () => void;

  listen(port: number, addr = "0.0.0.0") {
    this.onRun(app => {
      this.log.info(`listening: ${addr}:${port}`);
      const server = app.listen(port, addr);
      process.on("SIGINT", () => {
        server.close();
      });
    });
  }

  processRequest(
    callback: (
      req: express.Request,
      res: express.Response,
      context: ResolverMap
    ) => Awaitable
  ): express.Handler {
    return (req, res) => {
      return this.requestModule.processRequest(async context => {
        Resolver.provide(
          context,
          ExpressResolver.provide(() => [req, res])
        );
        for (const resolver of this.requestContextResolvers) {
          Resolver.provide(context, await Resolver.resolve(resolver, context));
        }
        await callback(req, res, context);

        // cleanup
      });
    };
  }

  processMultipleRequests(
    requests: { path: any[]; payload: any }[],
    body: any
  ) {}
}

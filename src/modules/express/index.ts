import { Awaitable } from "@dabsi/common/typings2/Async";
import { Hookable } from "@dabsi/modules/Hookable";
import RequestModule from "@dabsi/modules/RequestModule";
import { ServerModule } from "@dabsi/modules/ServerModule";
import { ResolverContext, Inject, Module, Resolver } from "@dabsi/typedi";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      requestContext: ResolverContext;
    }
  }
}

export const ExpressResolver = Resolver.token<
  [express.Request, express.Response]
>();

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

  context: ResolverContext = Object.setPrototypeOf(
    {
      ...ExpressResolver.provide(),
    },
    this.requestModule.context
  );

  contextResolvers: Resolver<Awaitable<ResolverContext>>[] = [];

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
      context: ResolverContext
    ) => Awaitable
  ): express.Handler {
    return (req, res) =>
      this.requestModule.processRequest(async context => {
        Resolver.provide(
          context,
          ExpressResolver.provide(() => [req, res])
        );
        for (const resolver of this.contextResolvers) {
          Resolver.provide(context, await Resolver.resolve(resolver, context));
        }
        return callback(req, res, context);
      });
  }
}

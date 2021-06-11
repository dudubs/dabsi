//
import { GlobalMessage } from "@dabsi/common/globalMessages";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import ServerModule from "@dabsi/modules/ServerModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ConsumeArgs, ResolverDeps } from "@dabsi/typedi/consume";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";
import express from "express";

export type ExpressBuilderFn = (app: express.Application) => void;

export class ExpressRequest extends Resolver<express.Request>() {}

export class ExpressResponse extends Resolver<express.Response>() {}

declare global {
  namespace Express {
    interface Response {
      messages: GlobalMessage[];
    }
  }
}

@Module({})
export default class ExpressModule {
  readonly preBuilders: ExpressBuilderFn[] = [];

  readonly builders: ExpressBuilderFn[] = [];

  readonly postBuilders: ExpressBuilderFn[] = [];

  readonly log = log.get("EXPRESS");

  readonly request = new RequestBuilder();

  constructor(
    protected serverModule: ServerModule,
    protected moduleRunner: ModuleRunner
  ) {}

  createApplication(): express.Application {
    const app = express();
    app.use((req, res, next) => {
      res.messages = [];
      next();
    });
    for (const builders of [
      this.preBuilders,
      this.builders,
      this.postBuilders,
    ]) {
      for (const builder of builders) {
        builder(app);
      }
    }
    return app;
  }

  installServer(@Plugin() serverModule: ServerModule) {
    serverModule.starters.push(async ({ port }: { port: number }) => {
      //
      const app = this.createApplication();
      this.log.info(() => `listening at port ${port}.`);
      app.listen(port, "0.0.0.0");
    });
  }

  useRequest(handlerResolver: Resolver<express.Handler>) {
    this.request.initializers.push(
      Resolver(
        [ExpressRequest, ExpressResponse, handlerResolver],
        (req, res, handler) => () =>
          new Promise<void>(next => {
            handler(req, res, () => next());
          })
      )
    );
  }

  async processRequest(
    context: ResolverMap,
    req: express.Request,
    res: express.Response,
    callback: (context: ResolverMap) => Promise<void>
  ): Promise<void> {
    context = Resolver.Context.create(
      context,
      Resolver(ExpressRequest, () => req),
      Resolver(ExpressResponse, () => res)
    );
    await this.request.process(context, context =>
      this.serverModule.processRequest(context, callback)
    );
  }

  resolveHandler<U extends ResolverDeps>(
    ...args: ConsumeArgs<express.Handler, U>
  ): express.Handler {
    const resolver = ConsumeArgs(args)!;
    return (req, res, next) => {
      this.processRequest(
        Resolver.Context.create(this.moduleRunner.context),
        req,
        res,
        async context => {
          const handler = Resolver.resolve(resolver, context);
          handler(req, res, next);
        }
      );
    };
  }
}

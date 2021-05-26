//
import CookieParser from "cookie-parser";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import ServerModule from "@dabsi/modules/ServerModule";
import { Injectable, Resolver, ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";

export type ExpressBuilderFn = (app: express.Application) => void;

export class ExpressRequest extends Resolver<express.Request>() {}

export class ExpressResponse extends Resolver<express.Response>() {}

@Module({})
export default class ExpressModule {
  readonly preBuilders: ExpressBuilderFn[] = [];

  readonly builders: ExpressBuilderFn[] = [];

  readonly postBuilders: ExpressBuilderFn[] = [];

  readonly log = log.get("Express");

  readonly request = new RequestBuilder();

  constructor(protected serverModule: ServerModule) {}

  createApplication(): express.Application {
    const app = express();
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

  processRequest(
    context: ResolverMap,
    callback: (
      req: express.Request,
      res: express.Response,
      context: ResolverMap
    ) => Promise<void>
  ): express.Handler {
    return async (req, res) => {
      context = Resolver.Context.create(
        context,
        Resolver(ExpressRequest, () => req),
        Resolver(ExpressResponse, () => res)
      );
      await this.request.process(context, context =>
        this.serverModule.processRequest(context, context => {
          return callback(req, res, context);
        })
      );
    };
  }
}

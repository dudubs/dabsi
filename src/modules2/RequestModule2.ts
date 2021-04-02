import { reversed } from "@dabsi/common/array/reversed";
import { Ticker } from "@dabsi/common/async/Ticker";
import { Request } from "@dabsi/modules/RequestModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";

@Module()
export class RequestModule2 {
  readonly requestContext = Resolver.Context.create(this.moduleRunner.context, [
    Ticker,
    Request,
  ]);

  readonly requestInitalizers: Resolver<Promise<void>>[] = [];

  readonly requestFinaliziers: Resolver<Promise<void>>[] = [];

  readonly requestCatchers: Resolver<(error: any) => Promise<void>>[] = [];

  constructor(protected moduleRunner: ModuleRunner) {}

  async processRequest<T>(
    callback: (context: ResolverMap) => Promise<T>
  ): Promise<T> {
    //
    const request = new Request();
    const ticker = new Ticker();
    const context = Resolver.Context.create(this.requestContext, [
      request,
      ticker,
    ]);

    for (const resolver of this.requestInitalizers) {
      await Resolver.resolve(resolver, context);
    }

    try {
      return callback(context);
    } catch (error) {
      await Promise.all(
        this.requestCatchers.map(resolver =>
          Resolver.resolve(resolver, context)(error)
        )
      );
      throw error;
    } finally {
      await Promise.all(request.cleaners.map(cleaner => cleaner()));
      for (const resolver of reversed(this.requestFinaliziers)) {
        await Resolver.resolve(resolver, context);
      }
    }
  }
}

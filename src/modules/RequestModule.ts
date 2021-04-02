import { Ticker } from "@dabsi/common/async/Ticker";
import { Inject, Module, Resolver, ResolverMap } from "@dabsi/typedi";

import { Awaitable } from "../common/typings2/Async";
import { Cli } from "./Cli";
import { Hookable } from "./Hookable";

export class Request {
  readonly cleaners: (() => Awaitable)[] = [];
}

function emitAllAsync<T extends (...args: any[]) => any>(
  callbacks: T[],
  ...args: Parameters<T>
) {
  return Promise.all(callbacks.map(async callback => callback(...args)));
}

@Module()
export default class RequestModule {
  log = log.get("REQUEST");

  context: ResolverMap = Resolver.Context.create(this.runnerContext, {
    ...Resolver(Ticker),
    ...Resolver(Request),
  });

  requestCleanups: ((context: ResolverMap) => Awaitable)[] = [];

  requestErrorHandlers: ((
    context: ResolverMap,
    error: any
  ) => Awaitable)[] = [];

  requestBuilders: Resolver<Awaitable<void>>[] = [];

  async processRequest<T>(
    callback: (context: ResolverMap) => Awaitable<T>
  ): Promise<T> {
    // TODO: flat
    const context = Object.create(this.context);
    const ticker = new Ticker();

    const req = new Request();

    Resolver.Context.assign(context, [req, ticker]);

    for (const resolver of this.requestBuilders) {
      await Resolver.resolve(resolver, context);
    }

    try {
      return ticker.wait((async () => callback(context))());
    } catch (error) {
      await emitAllAsync(this.requestErrorHandlers, context, error);
      throw error;
    } finally {
      await emitAllAsync(req.cleaners.reverse());
      await emitAllAsync(this.requestCleanups.reverse(), context);
    }
  }

  constructor(cli: Cli, @Inject(c => c) protected runnerContext: ResolverMap) {
    cli.command("check", cli =>
      cli.onRun(() => {
        Resolver.checkObject(this.context, this.context);
      })
    );
  }
}

import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { Inject, Module, Resolver, ResolverMap } from "@dabsi/typedi";

import { Awaitable } from "../common/typings2/Async";
import { Cli } from "./Cli";
import { Hookable } from "./Hookable";
import { Request } from "./Request";

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
    ...Resolver(AsyncProcess2),
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
    const process = new AsyncProcess2();

    const req = new Request();

    Resolver.Context.assign(context, [req, process]);

    for (const resolver of this.requestBuilders) {
      await Resolver.resolve(resolver, context);
    }

    try {
      return process.waitFor(async () => callback(context));
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

export class RequestContext extends Resolver([RequestModule], x => x.context) {}

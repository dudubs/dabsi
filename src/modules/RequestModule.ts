import { ResolverContext, Inject, Module, Resolver } from "@dabsi/typedi";
import { flatObject } from "../common/object/flatObject";
import Lazy from "../common/patterns/lazy";
import { Awaitable } from "../common/typings2/Async";
import { Cli } from "./Cli";
import { Hookable } from "./Hookable";

export class Request {
  onEnd = Hookable<() => Awaitable>();
  onStart = Hookable<() => Awaitable>();
  onError = Hookable<(error: any) => Awaitable>();
}

@Module()
export default class RequestModule {
  log = log.get("REQUEST");

  context: ResolverContext = Object.setPrototypeOf(
    {
      ...Request.provide(),
    },
    this.runnerContext
  );

  contextResolvers: Resolver<Awaitable<ResolverContext>>[] = [];

  async processRequest<T>(
    callback: (context: ResolverContext) => Awaitable<T>
  ): Promise<T> {
    // TODO: flat
    const context = Object.create(this.context);

    const req = new Request();
    Resolver.provide(
      context,
      Request.provide(() => req)
    );
    for (const resolver of this.contextResolvers) {
      Resolver.provide(context, await Resolver.resolve(resolver, context));
    }
    await req.onStart.invoke();
    try {
      return await callback(context);
    } catch (error) {
      await req.onError.invoke(error);
      throw error;
    } finally {
      await req.onEnd.invoke();
    }
  }

  constructor(
    cli: Cli,
    @Inject(c => c) protected runnerContext: ResolverContext
  ) {
    cli.command("check", cli =>
      cli.onRun(() => {
        Resolver.checkObject(this.context, this.context);
      })
    );
  }
}

import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import catchError from "../common/async/catchError";
import { Awaitable } from "../common/typings2/Async";
import { ResolveError } from "../typedi/ResolveError";
import { Cli, CliError } from "./Cli";
import { Hookable } from "./Hookable";

@Module()
export default class RequestModule {
  log = log.get("REQUEST");

  readonly context: AnyResolverMap = Object.setPrototypeOf(
    {},
    this.runnerContext
  );

  protected requiredResolvers: Resolver[] = [];

  beforeRequest = Hookable<(context: AnyResolverMap) => Awaitable>();

  afterRequest = Hookable<(context: AnyResolverMap) => Awaitable>();

  async processRequest<T>(
    callback: (context: AnyResolverMap) => Awaitable<T>
  ): Promise<T> {
    // TODO: flat
    const context = Object.create(this.context);

    await this.beforeRequest.invoke(context);
    try {
      return await callback(context);
    } finally {
      await this.afterRequest.invoke(context);
    }
  }

  require(...resolvers: Resolver[]): this {
    this.requiredResolvers.push(...resolvers);
    return this;
  }

  constructor(
    @Inject() cli: Cli,
    @Inject(c => c) protected runnerContext: AnyResolverMap
  ) {
    cli.command("check", cli =>
      cli.onRun(() => {
        Resolver.checkObject(this.context, this.context);
      })
    );
  }
}

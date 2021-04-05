import { RequestModule2 } from "@dabsi/modules2/RequestModule2";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import express from "express";

export type ExpressBuilderFn = (app: express.Application) => void;

declare module "@dabsi/modules2/ServerModule2" {
  interface StartArgs {
    port?: number;
    p?: number;
  }
}

export class ExpressContext {
  constructor(
    public readonly request: express.Request,
    public readonly response: express.Response
  ) {}
}

@Module({
  dependencies: [ServerModule2],
})
export class ExpressModule2 {
  readonly prebuilders: ExpressBuilderFn[] = [];
  readonly builders: ExpressBuilderFn[] = [];

  readonly postbuilders: ExpressBuilderFn[] = [];

  readonly log = log.get("Express");

  readonly requestContext = Resolver.Context.create(
    this.requestModule.requestContext,
    [ExpressContext]
  );

  constructor(protected requestModule: RequestModule2) {}

  installCli(@Plugin() cliModule: CliModule2) {
    cliModule.extend({
      path: "start",
      extender: y => y.number(["port", "p"]),
    });
  }

  installServer(@Plugin() serverModule: ServerModule2) {
    serverModule.starters.push(async ({ p, port = p || 7777 }) => {
      //
      const app = express();
      for (const builders of [
        this.prebuilders,
        this.builders,
        // execute postbuilder in reverse.
        this.postbuilders.reverse(),
      ]) {
        for (const builder of builders) {
          builder(app);
        }
      }

      this.log.info(() => `listening at port ${port}.`);
      app.listen(port, "0.0.0.0");
    });
  }

  processRequest(
    callback: (context: ResolverMap) => Promise<void>
  ): express.Handler {
    return (req, res) => {
      this.requestModule.processRequest(async context => {
        Resolver.Context.assign(context, [
          //
          new ExpressContext(req, res),
        ]);
        await callback(context);
      });
    };
  }
}

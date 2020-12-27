import { Awaitable } from "@dabsi/common/typings2/Async";
import { HooksInstaller } from "@dabsi/modules/HooksInstaller";
import { ServerModule } from "@dabsi/modules/ServerModule";
import { Inject, Module } from "@dabsi/typedi";
import express from "express";

@Module()
export default class ExpressModule {
  log = this.server.log.get("EXPRESS");

  constructor(@Inject() protected server: ServerModule) {
    server.cli.install({
      run: async args => {
        this.log.info("starting ...");
        const app = express();
        await this.hooks.preRoutes(app);
        await this.hooks.routes(app);
        await this.hooks.postRoutes(app);
        await this.hooks.run(app);
      },
    });
  }

  protected hooks = {
    preRoutes: (app: express.Application): Awaitable => {},
    routes: (app: express.Application): Awaitable => {},
    postRoutes: (app: express.Application): Awaitable => {},
    run: (app: express.Application): Awaitable => {},
  };

  install = HooksInstaller(this.hooks, this);

  listen(port: number, addr = "0.0.0.0") {
    this.install({
      run: app => {
        this.log.info(`listening: ${addr}:${port}`);
        const server = app.listen(port, addr);
        process.on("SIGINT", () => {
          server.close();
        });
      },
    });
  }
}

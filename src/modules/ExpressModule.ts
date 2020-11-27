import express from "express";
import { pushHook } from "../common/async/pushHook";
import { Awaitable } from "../common/typings2/Async";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { ServerModule } from "./ServerModule";

@Module()
export class ExpressModule {
  log = this.server.log.get("EXPRESS");

  constructor(@Inject() protected server: ServerModule) {
    server.cli.push({
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
    routes: (app: express.Application): Awaitable => {},
    preRoutes: (app: express.Application): Awaitable => {},
    postRoutes: (app: express.Application): Awaitable => {},
    run: (app: express.Application): Awaitable => {},
  };

  push({
    preRoutes = undefined as undefined | ((app: express.Application) => void),
    routes = undefined as undefined | ((app: express.Application) => void),
    postRoutes = undefined as undefined | ((app: express.Application) => void),
    run = undefined as undefined | ((app: express.Application) => void),
  }) {
    pushHook(this.hooks, "preRoutes", preRoutes);
    pushHook(this.hooks, "routes", routes);
    pushHook(this.hooks, "postRoutes", postRoutes);
    pushHook(this.hooks, "run", run);
  }

  listen(port: number, addr = "0.0.0.0") {
    this.push({
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

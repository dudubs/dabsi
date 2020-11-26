import express from "express";
import { pushAsyncHook } from "../common/async/pushAsyncHook";
import { Awaitable } from "../common/typings2/Async";
import { Inject } from "../typedi";
import { Module } from "../typedi";
import { ServerModule } from "./ServerModule";

@Module()
export class ExpressModule {
  log = this.server.log.get("EXPRESS");

  constructor(@Inject() protected server: ServerModule) {
    server.cli.push({
      run: async (args) => {
        this.log.info("starting ...");
        const app = express();
        await this.hooks.preBuild(app);
        await this.hooks.build(app);
        await this.hooks.postBuild(app);
        await this.hooks.run(app);
      },
    });
  }

  protected hooks = {
    preBuild: (app: express.Application): Awaitable => {},
    build: (app: express.Application): Awaitable => {},
    postBuild: (app: express.Application): Awaitable => {},
    run: (app: express.Application): Awaitable => {},
  };

  push({
    postBuild = undefined as undefined | ((app: express.Application) => void),
    preBuild = undefined as undefined | ((app: express.Application) => void),
    build = undefined as undefined | ((app: express.Application) => void),
    run = undefined as undefined | ((app: express.Application) => void),
  }) {
    pushAsyncHook(this.hooks, "preBuild", preBuild);
    pushAsyncHook(this.hooks, "build", build);
    pushAsyncHook(this.hooks, "postBuild", postBuild);
    pushAsyncHook(this.hooks, "run", run);
  }

  listen(port: number, addr = "0.0.0.0") {
    this.push({
      run: (app) => {
        this.log.info(`listening: ${addr}:${port}`);
        const server = app.listen(port, addr);
        process.on("SIGINT", () => {
          server.close();
        });
      },
    });
  }
}

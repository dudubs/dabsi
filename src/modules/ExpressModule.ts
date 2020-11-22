import express from "express";
import { pushAsyncHook } from "../common/async/pushAsyncHook";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { ServerModule } from "./ServerModule";

@Module()
export class ExpressModule {
  constructor(@Inject() server: ServerModule) {
    server.cli.push({
      run: args => {
        console.log("starting express...");
        const app = express();
        this.hooks.build(app);
        this.hooks.run(app);
      },
    });
  }

  protected hooks = {
    build: (app: express.Application) => {},
    run: (app: express.Application) => {},
  };

  push({
    build = undefined as undefined | ((app: express.Application) => void),
    run = undefined as undefined | ((app: express.Application) => void),
  }) {
    pushAsyncHook(this.hooks, "build", build);
    pushAsyncHook(this.hooks, "run", run);
  }
}

// @SystemModule({ entities, provider})

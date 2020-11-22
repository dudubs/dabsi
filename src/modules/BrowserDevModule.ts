import { watch } from "fs";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";
import { DevModule } from "../typestack/DevModule";
import { ExpressModule } from "./ExpressModule";
import reload from "reload";

@Module()
export class BrowserDevModule {
  constructor(
    @Inject() devModule: DevModule,
    @Inject() expressModule: ExpressModule
  ) {
    devModule.push({
      asChild: () => {
        expressModule.push({
          build: app => {
            reload(app).then(server => {
              watch("./bundle/browser", () => {
                // TODO: debounce
                console.log("reloading browser...");
                server.reload();
              });
            });
          },
        });
      },
    });
  }
}

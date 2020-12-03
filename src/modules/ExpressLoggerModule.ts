import { Consumer } from "../typedi/Consumer";
import { Inject } from "../typedi";
import { Module, ModuleProvider } from "../typedi";
import { ExpressModule } from "./ExpressModule";

@Module()
export class ExpressLoggerModule {
  constructor(@Inject() expressModule: ExpressModule) {
    expressModule.install({
      preRoutes: app => {
        app.use((req, res, next) => {
          expressModule.log.info(
            `${req.httpVersion} ${req.method} ${req.path}`
          );
          next();
        });
      },
    });
  }
}

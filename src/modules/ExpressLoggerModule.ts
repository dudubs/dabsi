import { Consumer } from "../typedi/Consumer";
import { Inject } from "../typedi";
import { Module, ModuleProvider } from "../typedi";
import { ExpressModule } from "./ExpressModule";

@Module()
export class ExpressLoggerModule {
  constructor(@Inject() mExpress: ExpressModule) {
    mExpress.push({
      build: (app) => {
        app.use((req, res, next) => {
          mExpress.log.info(`${req.method} ${req.path}`);
          next();
        });
      },
    });
  }
}

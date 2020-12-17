import { Consumer } from "@dabsi/typedi/Consumer";
import { Inject } from "@dabsi/typedi";
import { Module, ModuleProvider } from "@dabsi/typedi";
import { ExpressModule } from "@dabsi/modules/ExpressModule";

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

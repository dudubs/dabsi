import { Consumer } from "../typedi/Consumer";
import { ModuleProvider } from "../typedi/Module";
import { ExpressModule } from "./ExpressModule";

export const ExpressLogger = (): ModuleProvider =>
  Consumer([ExpressModule], expressModule => {
    expressModule.push({
      build: app => {
        app.use((req, res, next) => {
          console.log(`${req.method} ${req.path}`);
          next();
        });
      },
    });
    return {};
  });

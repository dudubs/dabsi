import DataModuleSource from "@dabsi/modules/data/DataModuleSource";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import ExpressModule from "../../express";

@Module()
export default class DataForExpressModule {
  constructor(
    @Inject() dataModule: DataModule,
    @Inject() expressModule: ExpressModule
  ) {
    expressModule.onBuildRoutes(app => {
      app.use(async (req, res, next) => {
        await dataModule.withQueryRunner(async queryRunner => {
          Resolver.provide(
            req.systemContext,
            DataSourceFactoryResolver.provide(() => entityType =>
              new DataModuleSource(
                dataModule,
                () => queryRunner,
                entityType,
                EmptyDataCursor
              )
            )
          );
          next();
        });
      });
    });
  }
}

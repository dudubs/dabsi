import DataModuleSource from "@dabsi/modules/data/DataModuleSource";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import ExpressModule from "../../express";
import RequestModule from "../../RequestModule";

@Module()
export default class DataForRequestModule {
  constructor(
    @Inject() dataModule: DataModule,
    @Inject() requestModule: RequestModule
  ) {
    requestModule.beforeRequest(async context => {
      await dataModule.withQueryRunner(async queryRunner => {
        Resolver.provide(
          context,
          DataSourceFactoryResolver.provide(() => entityType =>
            new DataModuleSource(
              dataModule,
              () => queryRunner,
              entityType,
              EmptyDataCursor
            )
          )
        );
      });
    });
  }
}

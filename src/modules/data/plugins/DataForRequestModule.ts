import DataModuleSource from "@dabsi/modules/data/DataModuleSource";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import RequestModule, { Request } from "../../RequestModule";

@Module()
export default class DataForRequestModule {
  constructor(
    @Inject() dataModule: DataModule,
    @Inject() requestModule: RequestModule
  ) {
    Resolver.provide(
      requestModule.context,
      DataSourceFactoryResolver.provide()
    );
    requestModule.contextResolvers.push(
      Resolver.consume([Request], async req => {
        const [queryRunner, release] = await dataModule.withQueryRunner();

        req.onEnd(() => release());

        return DataSourceFactoryResolver.provide(() => entityType =>
          new DataModuleSource(
            dataModule,
            () => queryRunner,
            entityType,
            EmptyDataCursor
          )
        );
      })
    );
  }
}

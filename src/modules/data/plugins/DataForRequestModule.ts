import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { EmptyDataCursor } from "@dabsi/typedata/cursor";
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
        const [queryRunner, release] = await dataModule.createQueryRunner();
        req.onEnd(() => release());
        return DataSourceFactoryResolver.provide(() => entityType =>
          new DataEntitySource(entityType, () => queryRunner, EmptyDataCursor)
        );
      })
    );
  }
}

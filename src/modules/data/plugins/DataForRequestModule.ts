import { DataContext } from "@dabsi/modules/data/context";
import { EmptyDataCursor } from "@dabsi/typedata/cursor";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import RequestModule, { Request } from "../../RequestModule";

@Module()
export default class DataForRequestModule {
  constructor(
    @Inject() dataModule: DataModule,
    @Inject() requestModule: RequestModule
  ) {
    Resolver.provide(requestModule.context);
    requestModule.contextResolvers.push(
      Resolver.consume([Request], async req => {
        const [queryRunner, release] = await dataModule.createQueryRunner();
        req.onEnd(() => release());
        return DataContext.provide(
          () =>
            new DataContext(
              entityType =>
                new DataEntitySource(
                  entityType,
                  () => queryRunner,
                  EmptyDataCursor
                )
            )
        );
      })
    );
  }
}

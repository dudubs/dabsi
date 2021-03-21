import { DataContext } from "@dabsi/modules/data/context";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import RequestModule from "../../RequestModule";

const releaseResolver = Resolver.token<() => void>();

@Module()
export default class DataRequestModule {
  constructor(dataModule: DataModule, requestModule: RequestModule) {
    requestModule.requestContextResolvers.push(async context => {
      const [queryRunner, release] = await dataModule.createQueryRunner();

      return {
        ...DataContext.provide(
          () =>
            new DataContext(entityType =>
              DataEntitySource.fromQueryRunner(entityType, queryRunner)
            )
        ),
        ...releaseResolver.provide(() => release),
      };
    });

    requestModule.requestCleanups.push(context => {
      Resolver.resolve(releaseResolver, context)();
    });
  }
}

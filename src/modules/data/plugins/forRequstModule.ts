import { DataContext } from "@dabsi/modules/data/context";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Module, Resolver } from "@dabsi/typedi";
import DataModule from "..";
import RequestModule from "../../RequestModule";

const releaseResolver = Resolver.token<() => void>();

class DataQueryRunnerLock {
  constructor(public release: () => void) {}
}

@Module()
export default class DataRequestModule {
  constructor(dataModule: DataModule, requestModule: RequestModule) {
    requestModule.requestBuilders.push(async context => {
      const [queryRunner, release] = await dataModule.createQueryRunner();

      Resolver.Context.provide(context, [
        new DataContext(entityType =>
          DataEntitySource.fromQueryRunner(entityType, queryRunner)
        ),
        new DataQueryRunnerLock(release),
      ]);
    });

    requestModule.requestCleanups.push(context => {
      Resolver.resolve(DataQueryRunnerLock, context).release();
    });
  }
}

import { Once } from "@dabsi/common/patterns/Once";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { Inject, Module, Resolver, ResolverMap } from "@dabsi/typedi";
import { QueryRunner } from "typeorm";

@Module()
export default class DataModule {
  constructor(
    protected dbModule: DbModule,
    @Inject(c => c) protected context: ResolverMap
  ) {
    Resolver.Context.assign(
      context,
      DataContext.assign(
        () =>
          new DataContext(entityType =>
            DataEntitySource.fromQueryRunner(entityType, dbModule.queryRunner!)
          )
      )
    );
  }

  @Once() async init() {
    await this.dbModule.init();
  }

  protected get connection() {
    return this.dbModule.getConnection();
  }

  async createQueryRunner(): Promise<
    [qr: QueryRunner, release: () => Promise<void>]
  > {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    return [queryRunner, () => queryRunner.release()];
  }
}

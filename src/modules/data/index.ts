import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import DataSourceFactroyResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DbModule } from "@dabsi/modules/DbModule";
import { EmptyDataCursor } from "@dabsi/typedata/cursor";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { AnyResolverMap, Inject, Module, Resolver } from "@dabsi/typedi";
import SqlliteQueryRunnerPool from "@dabsi/typeorm/SqlliteQueryRunnerPool";
import { QueryRunner } from "typeorm";

@Module()
export default class DataModule {
  constructor(
    @Inject() protected dbModule: DbModule,
    @Inject(c => c) protected context: AnyResolverMap
  ) {
    Resolver.provide(
      context,
      DataSourceFactroyResolver.provide(() => entityType =>
        new DataEntitySource(
          entityType,
          () => this.mainQueryRunner,
          EmptyDataCursor
        )
      )
    );
  }

  @Once() async init() {
    await this.dbModule.init();
  }
  @Lazy() protected get mainQueryRunner(): QueryRunner {
    return this.connection.createQueryRunner();
  }

  protected get connection() {
    return this.dbModule.getConnection();
  }

  @Lazy() get queryRunnerPool() {
    if (this.connection.options.type === "sqlite") {
      if (this.connection.options.database === ":memory:") return;
      return new SqlliteQueryRunnerPool(this.connection);
    }
  }

  async createQueryRunner(): Promise<
    [qr: QueryRunner, release: () => Promise<void>]
  > {
    if (this.queryRunnerPool) {
      const queryRunner = await this.queryRunnerPool.acquire();
      return [
        queryRunner,
        () => {
          return this.queryRunnerPool!.release(queryRunner);
        },
      ];
    } else {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      return [queryRunner, () => queryRunner.release()];
    }
  }
}

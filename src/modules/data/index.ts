import Lazy from "@dabsi/common/patterns/lazy";
import { Once } from "@dabsi/common/patterns/Once";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { EmptyDataCursor } from "@dabsi/typedata/cursor";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { ResolverContext, Inject, Module, Resolver } from "@dabsi/typedi";
import SqlliteQueryRunnerPool from "@dabsi/typeorm/SqlliteQueryRunnerPool";
import { QueryRunner } from "typeorm";

@Module()
export default class DataModule {
  constructor(
    @Inject() protected dbModule: DbModule,
    @Inject(c => c) protected context: ResolverContext
  ) {
    Resolver.provide(
      context,
      DataContext.provide(
        () =>
          new DataContext(
            entityType =>
              new DataEntitySource(
                entityType,
                () => dbModule.queryRunner!,
                EmptyDataCursor
              )
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

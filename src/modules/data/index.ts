import Lazy from "@dabsi/common/patterns/lazy";
import { DbModule } from "@dabsi/modules/DbModule";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import SqlliteQueryRunnerPool from "@dabsi/typeorm/SqlliteQueryRunnerPool";
import { Connection, QueryRunner } from "typeorm";

@Module()
export default class DataModule {
  constructor(
    @Inject() protected dbModule: DbModule,
    @Inject() protected runner: ModuleRunner
  ) {
    // SystemRequest.start();
  }

  getConnection(): Connection {
    return this.dbModule.getConnection();
  }

  protected get connection() {
    return this.getConnection();
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

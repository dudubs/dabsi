import AbstractObjectPool from "@dabsi/common/patterns/object-pool/AbstractObjectPool";
import { ObjectPoolOptions } from "@dabsi/common/patterns/object-pool/ObjectPool";
import { WeakId } from "@dabsi/common/WeakId";
import { Connection, QueryRunner } from "typeorm";
import { SqliteDriver } from "typeorm/driver/sqlite/SqliteDriver";
import { SqliteQueryRunner } from "typeorm/driver/sqlite/SqliteQueryRunner";

export default class SqlliteQueryRunnerPool extends AbstractObjectPool<QueryRunner> {
  protected async createInstance(): Promise<QueryRunner> {
    const driver = new SqliteDriver(this.connection);
    await driver.connect();
    return driver.createQueryRunner("master");
  }
  protected async deleteInstance(queryRunner: QueryRunner) {
    console.log("delete qr", WeakId(queryRunner));

    await (queryRunner as SqliteQueryRunner).driver.disconnect();
  }

  constructor(
    protected connection: Connection,
    options: ObjectPoolOptions = {}
  ) {
    super(options);
  }
}

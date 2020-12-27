import TestEntities from "@dabsi/typeorm/relations/tests/TestEntities";
import { createConnection } from "typeorm";
import { SqliteDriver } from "typeorm/driver/sqlite/SqliteDriver";
import { SqliteQueryRunner } from "typeorm/driver/sqlite/SqliteQueryRunner";
export type Timeout = ReturnType<typeof setTimeout>;

fit("", async () => {
  const conn = await createConnection({
    type: "sqlite",
    database: "test.sqlite",

    // type: "mysql",
    // username: "dudubs",
    // database: "dev",

    entities: TestEntities,
    // synchronize: true,
    logging: true,
    extra: {
      connectionLimit: 2,
    },
  });

  const dr = new SqliteDriver(conn);
  await dr.connect();

  const qr1 = dr.createQueryRunner("master");

  const qr2 = dr.createQueryRunner("master");

  await qr1.startTransaction();
  console.log(qr1.isTransactionActive);
  await qr1.release();
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

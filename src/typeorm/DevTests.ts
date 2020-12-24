import { Timeout } from "@dabsi/common/async/Timeout";
import TestEntities, {
  AEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { Connection, createConnection, EntityManager } from "typeorm";

let conn: Connection;

beforeAll(async () => {
  conn = await createConnection({
    type: "mysql",
    database: "test",
    username: "dudubs",
    // synchronize: true,
    entities: TestEntities,
    logging: true,
  });
});

fit("", async () => {
  //   conn.entityManager;

  expect(conn.createEntityManager()).toEqual(conn.createEntityManager());
  //   const ar1 = conn.createQueryRunner();
  //   const ar2 = conn.createQueryRunner();
  //   await ar1.connect();
  //   await ar2.connect();
  //   await ar1.startTransaction();
  //   await ar2.startTransaction();
  //   await ar1.commitTransaction();
  //   await ar2.commitTransaction();

  const x = [await conn.createQueryRunner().connect()];

  const qr1 = conn.createQueryRunner();
  await qr1.connect();

  const qr2 = conn.createQueryRunner();
  //   await qr2.connect();
  await qr1.startTransaction();
  await qr1.query("START TRANSACTION");
  await qr2.startTransaction();

  await qr1.release();

  await conn.createQueryRunner().connect();
  await qr2.release();

  await Timeout(10000);
  //   await conn.transaction(async () => {
  //     await conn.transaction(async (x: EntityManager) => {
  //       x.q;
  //     });
  //   });
});

afterAll(() => {
  return conn.close();
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

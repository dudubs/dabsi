import TestEntities, {
  AEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { Connection, createConnection } from "typeorm";

let conn: Connection;

beforeAll(async () => {
  conn = await createConnection({
    type: "better-sqlite3",
    database: "test.sqlite3",
    // username: "dudubs",
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
  //   await conn.transaction(async () => {
  //     await conn.transaction(async x => {});
  //   });
});

afterAll(() => {
  return conn.close();
});

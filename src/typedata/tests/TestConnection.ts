import defined from "@dabsi/common/object/defined";
import { findEntities } from "@dabsi/typeorm/findEntities";
import { Connection, createConnection, ObjectType } from "typeorm";

let counter = 0;

export function createTestConnection(
  entities: ObjectType<any>[],
  options?
): Promise<Connection> {
  return createConnection({
    name: "testConnection" + ++counter,
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    // logging: "all",
    ...options,
    entities: findEntities(entities),
  });
}

export function TestConnection(entities, options?): () => Connection {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createTestConnection(entities, options);
  });

  afterAll(async () => {
    await connection.close();
  });

  return () => {
    return defined(connection, "No test connection");
  };
}

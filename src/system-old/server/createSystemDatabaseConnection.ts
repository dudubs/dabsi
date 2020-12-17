import { createConnection } from "typeorm";
import { findEntities } from "@dabsi/typeorm/findEntities";
import { SystemEntities } from "@dabsi/system-old/server/SystemEntities";

export function createSystemDatabaseConnection() {
  return createConnection({
    type: "sqlite",
    database: "bundle/system.sqlite3",
    name: "system",
    entities: findEntities(SystemEntities),
    synchronize: true,
  });
}

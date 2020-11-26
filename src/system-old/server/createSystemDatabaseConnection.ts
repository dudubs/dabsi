import { createConnection } from "typeorm";
import { findEntities } from "../../typeorm/findEntities";
import { SystemEntities } from "./SystemEntities";

export function createSystemDatabaseConnection() {
  return createConnection({
    type: "sqlite",
    database: "bundle/system.sqlite3",
    name: "system",
    entities: findEntities(SystemEntities),
    synchronize: true,
  });
}

import { createConnection } from "typeorm";
import { findEntities } from "../../typeorm/findEntities";
import { SystemEntities } from "./SystemEntities";

export function SystemDatabaseConnection() {
  return createConnection({
    type: "sqlite",
    database: "bundle/system.sqlite3",
    entities: findEntities(SystemEntities),
    synchronize: true,
  });
}

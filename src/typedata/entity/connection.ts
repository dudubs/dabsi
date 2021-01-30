import { Connection, getConnection } from "typeorm";

export default function getDataContext(): Connection {
  return getDataContext.connection || getConnection();
}

getDataContext.connection = null as null | Connection;

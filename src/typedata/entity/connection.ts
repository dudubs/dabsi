import { Connection, getConnection } from "typeorm";

export default function getDataConnection(): Connection {
  return getDataConnection.connection || getConnection();
}

getDataConnection.connection = null as null | Connection;

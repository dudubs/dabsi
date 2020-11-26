import { Connection } from "typeorm";
import { createSystemDatabaseConnection } from "./createSystemDatabaseConnection";
import { SystemBootstrap } from "./SystemBootstrap";

let connection: Connection;

SystemBootstrap(
  createSystemDatabaseConnection().then(result => {
    connection = result;
  })
).catch(error => {
  console.error(error);
});

export const getSystemDatabaseConnection = (): Connection => {
  if (!connection) {
    throw new Error("No connection");
  }
  return connection;
};

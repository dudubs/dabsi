import defined from "@dabsi/common/object/defined";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";

import { DEntity, EEntity } from "@dabsi/typedata/tests/BaseEntities";
import { createTestConnection } from "@dabsi/typedata/tests/TestConnection";
import formatSql from "@dabsi/typeorm/formatSql";
import { AEntity, CEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import {
  BeforeUpdate,
  Column,
  Connection,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class XEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "myText" })
  text!: string;

  @BeforeUpdate()
  foo() {
    console.log("xx");
  }
}
export const getTestConnection = () =>
  defined(connection, `No data test connection`);

export const getTestQueryRunner = SingleCall(() =>
  getTestConnection().createQueryRunner()
);

let connection: Connection;

let testQueries: { sql: string; params: any[] }[] | null = null;

afterEach(() => {
  testQueries = null;
});

let logTestSqlQueriesEnabled = false;

afterEach(() => {
  logTestSqlQueriesEnabled = false;
});

export const logTestSqlQueries = () => {
  logTestSqlQueriesEnabled = true;
};
export const collectTestSqlQueries = (): { sql: string; params: any[] }[] => {
  return (testQueries = []);
};

beforeEach(() => {});
beforeAll(async () => {
  connection = await createTestConnection([
    AEntity,
    AEntity,
    CEntity,
    DEntity,
    EEntity,
    XEntity,
  ]);

  connection.logger.logQuery = (sql, params = []) => {
    if (logTestSqlQueriesEnabled) {
      console.log(formatSql(sql), params);
    }
    testQueries?.push({ sql, params });
  };
});

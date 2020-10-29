import { Column, Entity, PrimaryColumn } from "typeorm";
import { EntityDataSource } from "../../../typedata/eds/EntityDataSource";
import { TestConnection } from "../../../typedata/tests/TestConnection";

export namespace DataInputTester {
  @Entity()
  export class A {
    @PrimaryColumn()
    id: string;

    @Column()
    text: string;
  }

  const getConnection = TestConnection([A]);

  export const source = EntityDataSource.create(A, getConnection);

  export const rows = [
    { id: "1", text: "hello" },
    { id: "2", text: "world" },
    { id: "3", text: "foo" },
    { id: "4", text: "bar" },
  ] as const;

  beforeAll(async () => {
    for (const row of rows) {
      await source.insert(row);
    }
  });
}

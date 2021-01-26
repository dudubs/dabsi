import { Tester } from "@dabsi/jasmine/Tester";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { createTestConnection } from "@dabsi/typedata/tests/TestConnection";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class TestA {
  @PrimaryColumn()
  id!: string;

  @Column()
  text!: string;
}

export const DataInputTester = Tester.beforeAll({
  connection: () => createTestConnection([TestA]),
})
  .beforeAll({
    source: t =>
      DataEntitySource.createFromConnection(TestA, () => t.connection),
  })
  .beforeAll({
    rows: t =>
      t.source.insert([
        { id: "1", text: "hello" },
        { id: "2", text: "world" },
        { id: "3", text: "foo" },
        { id: "4", text: "bar" },
      ]),
  });

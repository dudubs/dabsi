import { Column, Entity, PrimaryColumn } from "typeorm";
import { logBeforeEach } from "../../../jasmine/logBeforeEach";
import { Tester } from "../../../jasmine/Tester";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { createTestConnection } from "../../../typedata/tests/TestConnection";

@Entity()
class TestA {
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;
}

export const DataInputTester = Tester.beforeAll({
  connection: () => createTestConnection([TestA]),
})
  .beforeAll({
    source: t => EntityDataSource.create(TestA, t.connection),
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

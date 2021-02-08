import { defined } from "@dabsi/common/object/defined";
import { logBeforeEach } from "@dabsi/jasmine/logBeforeEach";
import { DEntity, EEntity } from "@dabsi/typedata/tests/BaseEntities";
import { createTestConnection } from "@dabsi/typedata/tests/TestConnection";
import { findEntities } from "@dabsi/typeorm/findEntities";
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
export const getConnection = () =>
  defined(connection, `No data test connection`);

let connection: Connection;

beforeAll(async () => {
  connection = await createTestConnection([
    AEntity,
    AEntity,
    CEntity,
    DEntity,
    EEntity,
    XEntity,
  ]);
});

export default getConnection;

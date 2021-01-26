import { defined } from "@dabsi/common/object/defined";
import globalTester from "@dabsi/jasmine/globalTester";
import { DEntity, EEntity } from "@dabsi/typedata/tests/BaseEntities";
import { createTestConnection } from "@dabsi/typedata/tests/TestConnection";
import { AEntity, CEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import { Connection } from "typeorm";

export const getConnection = () =>
  defined(connection, `No data test connection`);

let connection: Connection;

globalTester(() => {
  beforeAll(async () => {
    connection = await createTestConnection([
      AEntity,
      AEntity,
      CEntity,
      DEntity,
      EEntity,
    ]);
  });
});
export default getConnection;

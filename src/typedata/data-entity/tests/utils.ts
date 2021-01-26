import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import getTestDataConnection from "@dabsi/typedata/data-entity/tests/getTestDataConnection";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";

export const ASource = DataEntitySource.createFromConnection(
  AEntity,
  getTestDataConnection
);

export const BSource = DataEntitySource.createFromConnection(
  BEntity,
  getTestDataConnection
);
export const CSource = DataEntitySource.createFromConnection(
  CEntity,
  getTestDataConnection
);

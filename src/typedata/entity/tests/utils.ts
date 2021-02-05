import { Type } from "@dabsi/common/typings2/Type";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import getTestConnection from "@dabsi/typedata/entity/tests/getTestConnection";
import { DataSource } from "@dabsi/typedata/source";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";

export const ASource = DataEntitySource.createFromConnection(
  AEntity,
  getTestConnection
);

export const BSource = DataEntitySource.createFromConnection(
  BEntity,
  getTestConnection
);
export const CSource = DataEntitySource.createFromConnection(
  CEntity,
  getTestConnection
);

export const getTestSource = <T>(entityType: Type<T>): DataSource<T> =>
  DataEntitySource.createFromConnection(entityType, getTestConnection);

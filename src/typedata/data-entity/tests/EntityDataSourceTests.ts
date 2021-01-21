import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { DataSelector } from "@dabsi/typedata/DataSelector";
import {
  DUnion,

  EUnion
} from "@dabsi/typedata/tests/BaseEntities";
import { DataSourceTests } from "@dabsi/typedata/tests/DataSourceTests";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import {
  AEntity,
  BEntity,
  CEntity
} from "@dabsi/typeorm/relations/tests/TestEntities";

const getConnection = TestConnection([AEntity, BEntity, CEntity]);

export const EDSTesters = {
  A: DataEntitySource.createFromConnection(AEntity, getConnection),
  B: DataEntitySource.createFromConnection(BEntity, getConnection),
  C: DataEntitySource.createFromConnection(CEntity, getConnection),
  D: DataEntitySource.createFromConnection(DUnion, getConnection),
  E: DataEntitySource.createFromConnection(EUnion, getConnection),
};


DataSourceTests(
  EDSTesters.A,
  EDSTesters.B,
  EDSTesters.C,
  EDSTesters.D,
  EDSTesters.E
);

const { B: BDS, A: ADS } = EDSTesters;

describe("DataEntitySelector", () => {
  let key: string;
  class A extends DataSelector(AEntity, {
    relations: { oneAToOneB: true },
  } as const) {}

  beforeAll(async () => {
    key = await ADS.insertKey({
      oneAToOneB: await BDS.insertKey({}),
    });
  });

  it("expect to not load relation.", async () => {
    expect((await ADS.get(key))?.oneAToOneB).toBeFalsy();
  });

  it("expect to load relation because source selection.", async () => {
    expect(
      (await ADS.select({ relations: { oneAToOneB: true } }).get(key))
        ?.oneAToOneB
    ).toBeTruthy();
  });

  it("expect to load relation because type selection.", async () => {
    expect(
      (await DataEntitySource.createFromConnection(A, getConnection).get(key))
        ?.oneAToOneB
    ).toBeTruthy();
  });
});

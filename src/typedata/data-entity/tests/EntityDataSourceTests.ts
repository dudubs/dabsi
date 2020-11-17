import {
  AEntity,
  BEntity,
  CEntity,
} from "../../../typeorm/relations/tests/Entities";
import { DataSelector } from "../../DataSelector";
import { DBase, DUnion, EBase, EUnion } from "../../tests/BaseEntities";
import { DataSourceTests } from "../../tests/DataSourceTests";
import { TestConnection } from "../../tests/TestConnection";
import { DataEntitySource } from "../DataEntitySource";

const getConnection = TestConnection([AEntity, BEntity, CEntity]);
export const EDSTesters = {
  A: DataEntitySource.create(AEntity, getConnection),
  B: DataEntitySource.create(BEntity, getConnection),
  C: DataEntitySource.create(CEntity, getConnection),
  D: DataEntitySource.create(DUnion, getConnection),
  E: DataEntitySource.create(EUnion, getConnection),
};

testm(__filename, () => {
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
        (await DataEntitySource.create(A, getConnection).get(key))?.oneAToOneB
      ).toBeTruthy();
    });
  });
});

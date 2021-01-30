import { DataEntitySource } from "@dabsi/typedata/entity/source";
import getTestConnection from "@dabsi/typedata/entity/tests/getTestConnection";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { DataSelector } from "@dabsi/typedata/selector";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";

describe("DataSelector", () => {
  let key: string;
  class ASelector extends DataSelector(AEntity, {
    relations: { oneAToOneB: true },
  } as const) {}

  const ASelectorSource = DataEntitySource.createFromConnection(
    ASelector,
    getTestConnection
  );

  beforeAll(async () => {
    key = await ASource.insertKey({
      oneAToOneB: await BSource.insertKey({}),
    });
  });

  it("expect to not load relation.", async () => {
    expect((await ASource.get(key))?.oneAToOneB).toBeFalsy();
  });

  it("expect to load relation because source selection.", async () => {
    expect(
      (await ASource.select({ relations: { oneAToOneB: true } }).get(key))
        ?.oneAToOneB
    ).toBeTruthy();
  });

  it("expect to load relation", async () => {
    expect((await ASelectorSource.get(key))?.oneAToOneB).toBeTruthy();
  });
});

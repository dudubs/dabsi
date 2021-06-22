import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import { DataTicker } from "@dabsi/modules/data/DataTicker";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { getTestConnection } from "@dabsi/typedata/entity/tests/tester";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";

const t = Tester.beforeAll(async () => {
  // @ts-ignore
  const a1 = await ASource.insert({
    aText: "a-text",
    oneAToOneB: await BSource.insertKey({
      bText: "b-text",
    }),
  });
  return {
    a1,
  };
}).beforeEach(t => {
  const process = new AsyncProcess();
  const loader = new DataTicker(process, entityType =>
    DataEntitySource.createFromConnection(entityType, getTestConnection)
  );

  return {
    process,
    loader,
    a1Fetcher: loader.getRowTicker(AEntity, t.a1.$key),
    axFetcher: loader.getRowTicker(AEntity, "invalid-key-x"),
  };
});

it("expect to fetch relation fields to one", async () => {
  // resolveAsyncObject

  const test = (side: string) =>
    t.a1Fetcher.select({
      relations: {
        oneAToOneB: {
          pick: ["bId"],
          fields: {
            common: "bText",
            side: [side],
          },
        },
      },
    });
  const [left, right] = await Promise.all([test("left"), test("right")]);

  expect([left, right]).not.toEqual(
    jasmine.arrayContaining([
      jasmine.objectContaining({
        oneAToOneB: jasmine.objectContaining({
          bText: jasmine.anything(),
        }),
      }),
    ])
  );

  expect(left!.oneAToOneB).toEqual(
    jasmine.objectContaining({
      bId: jasmine.any(String),
      side: "left",
      common: "b-text",
    })
  );
  expect(right!.oneAToOneB).toEqual(
    jasmine.objectContaining({
      bId: jasmine.any(String),
      side: "right",
      common: "b-text",
    })
  );
});

it("expect to fetch fields", async () => {
  const test = side =>
    t.a1Fetcher.pick(["aId"], {
      common: "aText",
      side: [side],
    });
  const [left, right] = await Promise.all([
    //
    test("left"),
    test("right"),
  ]);

  expect([left, right]).not.toEqual(
    jasmine.arrayContaining([
      jasmine.objectContaining({
        aText: jasmine.anything(),
      }),
    ])
  );

  expect(left).toEqual(
    jasmine.objectContaining({
      aId: jasmine.any(String),
      common: "a-text",
      side: "left",
    })
  );
  expect(right).toEqual(
    jasmine.objectContaining({
      aId: jasmine.any(String),
      common: "a-text",
      side: "right",
    })
  );
});

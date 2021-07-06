import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import { Tester } from "@dabsi/jasmine/Tester";

import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { getTestConnection } from "@dabsi/typedata/entity/tests/tester";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import DataContext from "@dabsi/modules/data/DataContext";

const t = Tester.beforeAll(async () => {
  const a1 = await ASource.insertAndFetch({
    aText: "a-text",
    oneAToOneB: await BSource.insert({
      bText: "b-text",
    }),
  });
  return {
    a1,
  };
}).beforeEach(t => {
  const process = new AsyncProcess();

  // new DataContext();

  const data = new DataContext(
    entityType =>
      DataEntitySource.createFromConnection(entityType, getTestConnection),
    process,
    {}
  );

  return {
    process,
    data,
    a1Fetcher: data.getRow(AEntity, t.a1.$key),
    axFetcher: data.getRow(AEntity, "invalid-key-x"),
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

import { Ticker } from "@dabsi/common/async/Ticker";
import { Tester } from "@dabsi/jasmine/Tester";
import { DataContext } from "@dabsi/modules/data/context";
import { DataTicker } from "@dabsi/modules/data/ticker";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { getTestQueryRunner } from "@dabsi/typedata/entity/tests/tester";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";

export const testDataContext = new DataContext(entityType =>
  DataEntitySource.fromQueryRunner(entityType, getTestQueryRunner())
);

const t = Tester.beforeAll(async () => {
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
  const ticker = new Ticker();
  const loader = new DataTicker(ticker, testDataContext);

  return {
    ticker,
    loader,
    a1Fetcher: loader.getRowTicker(AEntity, t.a1.$key),
    axFetcher: loader.getRowTicker(AEntity, "invalid-key-x"),
  };
});

it("expect to fetch relation fields to one", async () => {
  // resolveAsyncObject

  const test = (side: string) =>
    t.a1Fetcher.fetch({
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
    t.a1Fetcher.fetch(["aId"], {
      fields: {
        common: "aText",
        side: [side],
      },
    });
  const [left, right] = await Promise.all([test("left"), test("right")]);
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

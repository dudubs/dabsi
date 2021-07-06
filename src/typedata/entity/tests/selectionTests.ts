import { ASource, BSource, CSource } from "@dabsi/typedata/entity/tests/utils";
import { DataRow } from "@dabsi/typedata/row";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import { forEachTestRelation } from "@dabsi/typeorm/relations/tests/TestRelation";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe("Selection", () => {
  let key: string;

  const selectionSource = ASource.select({
    fields: {
      aText: ["selectionText"],
    },
  }).select({ fields: { aBaseText: { $base: "aText" } } });

  beforeAll(async () => {
    key = await ASource.insert({ aText: "sourceText" });
  });

  it("expect aText will be sourceText", async () => {
    expect(await ASource.filter({ $is: key }).fetchOrFail(key)).toEqual(
      objectContaining({
        aText: "sourceText",
      })
    );
  });

  it("expect a text will be selectionText", async () => {
    expect(await selectionSource.fetchOrFail(key)).toEqual(
      objectContaining({ aText: "selectionText" })
    );
  });

  it("expect to select fields by base", async () => {
    expect(
      await selectionSource
        .addFields({
          aTextLength: { $length: "aText" },
          aBaseTextLength: { $length: "aBaseText" },
        })
        .fetch(key)
    ).toEqual(
      objectContaining({
        aTextLength: "selectionText".length,
        aBaseTextLength: "sourceText".length,
      })
    );
  });

  it("expect aBaseText will be sourceText", async () => {
    expect(await selectionSource.fetch(key)).toEqual(
      objectContaining({
        aText: "selectionText",
        aBaseText: "sourceText",
      })
    );
  });

  it("expect selectionSource will filter by selectionText", async () => {
    expect(
      await selectionSource.filter({ aText: "selectionText" }).fetch(key)
    ).toBeTruthy();
    expect(
      await selectionSource.filter({ aText: "sourceText" }).fetch(key)
    ).toBeFalsy();
  });

  it("expect source base will filter by sourceText", async () => {
    expect(
      await selectionSource
        .filter({ $base: { aText: "sourceText" } })
        .fetch(key)
    ).toBeDefined();
  });
});

it("expect to invalid insert", async () => {
  await expectAsync(
    ASource.insertAndFetch(<any>{ badField: 1 })
  ).toBeRejected();
});

it("insert text", async () => {
  expect(await ASource.insertAndFetch({ aText: "hello" })).toEqual(
    objectContaining({ aText: "hello" })
  );
});

describe("insert  ", () => {
  test("oneAToManyB");
  test("oneAToManyBOwner");

  function test(relationKey) {
    describe(relationKey, () => {
      it("expect to not insert", async () => {
        await expectAsync(
          ASource.of(<any>relationKey, await BSource.insert({})).insertAndFetch(
            <any>{
              [relationKey]: await BSource.insert({}),
            }
          )
        ).toBeRejected();
      });

      it("expect to insert", () => {});
    });
  }
});

it("insert relation of", async () => {
  const aKey = await ASource.insert({});
  const cKey = await CSource.insert({});
  const cKey2 = await CSource.insert({});

  const bOfAOwnerOfCOwner = BSource.of("oneBToOneAOwner", aKey).of(
    "oneBToOneCOwner",
    cKey
  );

  expect(await bOfAOwnerOfCOwner.fetch()).toBeFalsy();
  await bOfAOwnerOfCOwner.insert({});
  expect(await bOfAOwnerOfCOwner.fetch()).toBeTruthy();

  expect(await BSource.of("oneBToOneAOwner", aKey).fetch()).toBeTruthy();

  expect(
    await BSource.of("oneBToOneAOwner", aKey)
      .of("oneBToOneCOwner", cKey2)
      .fetch()
  ).toBeFalsy();

  const bKey = await BSource.insert({});

  const bAtAOwnerOfCOwner = BSource.at("oneBToOneAOwner", bKey).of(
    "oneAToOneCOwner",
    cKey
  );

  ///
  expect(await bAtAOwnerOfCOwner.fetch()).toBeFalsy();

  await bAtAOwnerOfCOwner.insert({});
  expect(await bAtAOwnerOfCOwner.fetch()).toBeTruthy();
  expect(
    await BSource.at("oneBToOneAOwner", bKey)
      .of("oneAToOneCOwner", cKey2)
      .fetch()
  ).toBeFalsy();
});

it("deep relation sanity", async () => {
  await ASource.at("oneAToOneBOwner", "aid1")
    .at("oneBToOneCOwner", "bid2")
    .at("oneCToOneB", "cid3")
    .at("oneBToOneA", "bid4")
    .of("oneAToOneB", "bid5")
    .of("oneAToOneCOwner", "cid6")
    .at("oneAToOneBOwner", "aid7")
    .at("oneBToOneCOwner", "bid8")
    .fetch();
});

it("of relation key", async () => {
  const aKey = await ASource.insert({});
  const bOfA = BSource.of("oneBToOneA", aKey);
  expect(await bOfA.has()).toBeFalsy();
  await bOfA.insert({});
  expect(await bOfA.has()).toBeTruthy();
});

it("of data key", async () => {
  const aKey = await ASource.insert({});

  const bOfA = BSource.of("oneBToOneA", aKey);

  const bOfAOfHello = bOfA.of("bText", "bHello");
  expect(await bOfAOfHello.has()).toBeFalsy();

  const bOfAOfHelloKey = await bOfAOfHello.insert({});
  expect(await bOfAOfHello.has()).toBeTruthy();

  const bOfAOfWorld = bOfA.of("bText", "bWorld");
  expect(await bOfAOfWorld.has()).toBeFalsy();

  const cOfbOfA = CSource.of("oneCToOneB", bOfAOfHelloKey);

  const cOfbOfAOfHello = cOfbOfA.of("cText", "cHello");
  expect(await cOfbOfAOfHello.has()).toBeFalsy();

  const cOfbOfAOfHelloKey = await cOfbOfAOfHello.insert({});

  expect(await cOfbOfAOfHello.has()).toBeTruthy();

  expect(
    await BSource.of("bText", "bHello")
      .at("oneBToOneCOwner", bOfAOfHelloKey)
      .has()
  ).toBeTruthy();

  expect(
    await BSource.of("bText", "bWorld")
      .at("oneBToOneCOwner", bOfAOfHelloKey)
      .has()
  ).toBeFalsy();
});

it("children", async () => {
  const rootKey = await ASource.insert({});
  const aChildAtA = ASource.at("manyAToManyA", rootKey);
  expect(await aChildAtA.count()).toEqual(0);

  const childKeys = [await ASource.insert({}), await ASource.insert({})];
  await aChildAtA.add(childKeys);

  expect(await aChildAtA.count()).toEqual(2);
  expect((await aChildAtA.fetchAll()).map(child => child.$key)).toEqual(
    arrayContaining(childKeys)
  );
});

it("DataRow", async () => {
  const a = await ASource.insertAndFetch({});
  const b = await BSource.insertAndFetch({});

  expect(await a.at("oneAToOneBOwner").count()).toEqual(0);
  await a.at("oneAToOneBOwner").add(b);
  expect(await a.at("oneAToOneBOwner").count()).toEqual(1);
});

describe("expect to get row after insert", () => {
  let a: DataRow<AEntity>;
  beforeAll(async () => {
    a = await ASource.insertAndFetch({});
  });

  forEachTestRelation(
    [
      ["A", "B"],
      ["A", "A"],
    ],
    relationName => {
      it(`relation:` + relationName, () =>
        a.at(relationName as any).insertAndFetch({})
      );
    }
  );
});
it("expect to select field in relation", async () => {
  const aKey = await ASource.insert({
    oneAToOneB: await BSource.insert({
      bText: "hello",
    }),
  });

  expect(
    await ASource.filter({ $is: aKey })
      .select({
        pick: [],
        relations: {
          oneAToOneB: {
            pick: [],
            fields: {
              bX: "bText",
            },
          },
        },
      })
      .fetchOrFail()
  ).toEqual(
    objectContaining({ oneAToOneB: objectContaining({ bX: "hello" }) })
  );
});

it("selected relation sanity", async () => {
  const a = await ASource.select({
    relations: { oneAToOneB: true },
  }).insertAndFetch({
    oneAToOneB: await BSource.insert({ bText: "b" }),
  });
  expect(await a.oneAToOneB!.reload()).toEqual(
    objectContaining({ bText: "b" })
  );
});

describe("insert relation", () => {
  it("relation by { $key }", async () => {
    const aKey = await ASource.insert({});
    const bKey = await BSource.select({
      relations: { oneBToOneA: true },
    }).insertAndFetch({
      oneBToOneA: { $key: aKey },
    });
    expect(bKey.oneBToOneA!.$key).toEqual(aKey);
  });
});

describe("rootAt", () => {
  it("to one b", async () => {
    const bKey = await ASource.rootAt("oneAToOneB").insert({
      bText: "hello",
    });
    expect(await BSource.filter({ $is: bKey }).has()).toBeTrue();
  });
  it("to many b", async () => {
    const bKey = await ASource.rootAt("oneAToManyB").insert({
      bText: "hello",
    });
    expect(await BSource.filter({ $is: bKey }).has()).toBeTrue();
  });
  it("to one b to one c", async () => {
    const cKey = await ASource.rootAt("oneAToOneB")
      .rootAt("oneBToOneC")
      .insert({});
    expect(await CSource.filter({ $is: cKey }).has()).toBeTrue();
  });
});

describe("$find sanity", () => {
  it("", async () => {
    const a = await ASource.insertAndFetch({});
    const [b1, b2] = [
      await BSource.insertAndFetch({ bText: "hello" }),
      await BSource.insertAndFetch({ bText: "world" }),
    ];
    await a.at("oneAToManyB").add([b1.$key, b2.$key]);

    expect(await get(b1.bText)).toEqual(b1.$key);
    expect(await get(b2.bText)).toEqual(b2.$key);

    function get(bText) {
      return ASource.pick([], {
        bKey: {
          $find: { oneAToManyB: { bText } },
        },
      })
        .fetchOrFail(a.$key)
        .then(x => x.bKey);
    }
  });
});

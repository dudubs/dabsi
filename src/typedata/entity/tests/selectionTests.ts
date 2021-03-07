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
    key = await ASource.insertKey({ aText: "sourceText" });
  });

  it("expect aText will be sourceText", async () => {
    expect(await ASource.filter({ $is: key }).getOrFail(key)).toEqual(
      objectContaining({
        aText: "sourceText",
      })
    );
  });

  it("expect a text will be selectionText", async () => {
    expect(await selectionSource.getOrFail(key)).toEqual(
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
        .get(key)
    ).toEqual(
      objectContaining({
        aTextLength: "selectionText".length,
        aBaseTextLength: "sourceText".length,
      })
    );
  });

  it("expect aBaseText will be sourceText", async () => {
    expect(await selectionSource.get(key)).toEqual(
      objectContaining({
        aText: "selectionText",
        aBaseText: "sourceText",
      })
    );
  });

  it("expect selectionSource will filter by selectionText", async () => {
    expect(
      await selectionSource.filter({ aText: "selectionText" }).get(key)
    ).toBeDefined();
    expect(
      await selectionSource.filter({ aText: "sourceText" }).get(key)
    ).toBeUndefined();
  });

  it("expect source base will filter by sourceText", async () => {
    expect(
      await selectionSource.filter({ $base: { aText: "sourceText" } }).get(key)
    ).toBeDefined();
  });
});

it("expect to invalid insert", async () => {
  await expectAsync(ASource.insert(<any>{ badField: 1 })).toBeRejected();
});

it("insert text", async () => {
  expect(await ASource.insert({ aText: "hello" })).toEqual(
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
          ASource.of(<any>relationKey, await BSource.insertKey({})).insert(<
            any
          >{
            [relationKey]: await BSource.insertKey({}),
          })
        ).toBeRejected();
      });

      it("expect to insert", () => {});
    });
  }
});

it("insert relation of", async () => {
  const aKey = await ASource.insertKey({});
  const cKey = await CSource.insertKey({});
  const cKey2 = await CSource.insertKey({});

  const bOfAOwnerOfCOwner = BSource.of("oneBToOneAOwner", aKey).of(
    "oneBToOneCOwner",
    cKey
  );

  expect(await bOfAOwnerOfCOwner.get()).toBeFalsy();
  await bOfAOwnerOfCOwner.insertKey({});
  expect(await bOfAOwnerOfCOwner.get()).toBeTruthy();

  expect(await BSource.of("oneBToOneAOwner", aKey).get()).toBeTruthy();

  expect(
    await BSource.of("oneBToOneAOwner", aKey).of("oneBToOneCOwner", cKey2).get()
  ).toBeFalsy();

  const bKey = await BSource.insertKey({});

  const bAtAOwnerOfCOwner = BSource.at("oneBToOneAOwner", bKey).of(
    "oneAToOneCOwner",
    cKey
  );

  ///
  expect(await bAtAOwnerOfCOwner.get()).toBeFalsy();

  await bAtAOwnerOfCOwner.insertKey({});
  expect(await bAtAOwnerOfCOwner.get()).toBeTruthy();
  expect(
    await BSource.at("oneBToOneAOwner", bKey).of("oneAToOneCOwner", cKey2).get()
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
    .get();
});

it("of relation key", async () => {
  const aKey = await ASource.insertKey({});
  const bOfA = BSource.of("oneBToOneA", aKey);
  expect(await bOfA.hasRows()).toBeFalsy();
  await bOfA.insertKey({});
  expect(await bOfA.hasRows()).toBeTruthy();
});

it("of data key", async () => {
  const aKey = await ASource.insertKey({});

  const bOfA = BSource.of("oneBToOneA", aKey);

  const bOfAOfHello = bOfA.of("bText", "bHello");
  expect(await bOfAOfHello.hasRows()).toBeFalsy();

  const bOfAOfHelloKey = await bOfAOfHello.insertKey({});
  expect(await bOfAOfHello.hasRows()).toBeTruthy();

  const bOfAOfWorld = bOfA.of("bText", "bWorld");
  expect(await bOfAOfWorld.hasRows()).toBeFalsy();

  const cOfbOfA = CSource.of("oneCToOneB", bOfAOfHelloKey);

  const cOfbOfAOfHello = cOfbOfA.of("cText", "cHello");
  expect(await cOfbOfAOfHello.hasRows()).toBeFalsy();

  const cOfbOfAOfHelloKey = await cOfbOfAOfHello.insertKey({});

  expect(await cOfbOfAOfHello.hasRows()).toBeTruthy();

  expect(
    await BSource.of("bText", "bHello")
      .at("oneBToOneCOwner", bOfAOfHelloKey)
      .hasRows()
  ).toBeTruthy();

  expect(
    await BSource.of("bText", "bWorld")
      .at("oneBToOneCOwner", bOfAOfHelloKey)
      .hasRows()
  ).toBeFalsy();
});

it("children", async () => {
  const rootKey = await ASource.insertKey({});
  const aChildAtA = ASource.at("manyAToManyA", rootKey);
  expect(await aChildAtA.getCountRows()).toEqual(0);

  const childKeys = [await ASource.insertKey({}), await ASource.insertKey({})];
  await aChildAtA.add(childKeys);

  expect(await aChildAtA.getCountRows()).toEqual(2);
  expect((await aChildAtA.getRows()).map(child => child.$key)).toEqual(
    arrayContaining(childKeys)
  );
});

it("DataRow", async () => {
  const a = await ASource.insert({});
  const b = await BSource.insert({});

  expect(await a.at("oneAToOneBOwner").getCountRows()).toEqual(0);
  await a.at("oneAToOneBOwner").add(b);
  expect(await a.at("oneAToOneBOwner").getCountRows()).toEqual(1);
});

describe("expect to get row after insert", () => {
  let a: DataRow<AEntity>;
  beforeAll(async () => {
    a = await ASource.insert({});
  });

  forEachTestRelation(
    [
      ["A", "B"],
      ["A", "A"],
    ],
    relationName => {
      it(`relation:` + relationName, () =>
        a.at(relationName as any).insert({})
      );
    }
  );
});
it("expect to select field in relation", async () => {
  const aKey = await ASource.insertKey({
    oneAToOneB: await BSource.insertKey({
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
      .getOrFail()
  ).toEqual(
    objectContaining({ oneAToOneB: objectContaining({ bX: "hello" }) })
  );
});

it("selected relation sanity", async () => {
  const a = await ASource.select({ relations: { oneAToOneB: true } }).insert({
    oneAToOneB: await BSource.insertKey({ bText: "b" }),
  });
  expect(await a.oneAToOneB!.reload()).toEqual(
    objectContaining({ bText: "b" })
  );
});

describe("insert relation", () => {
  it("relation by { $key }", async () => {
    const aKey = await ASource.insertKey({});
    const bKey = await BSource.select({
      relations: { oneBToOneA: true },
    }).insert({
      oneBToOneA: { $key: aKey },
    });
    expect(bKey.oneBToOneA!.$key).toEqual(aKey);
  });
});

describe("rootAt", () => {
  it("to one b", async () => {
    const bKey = await ASource.rootAt("oneAToOneB").insertKey({
      bText: "hello",
    });
    expect(await BSource.filter({ $is: bKey }).hasRows()).toBeTrue();
  });
  it("to many b", async () => {
    const bKey = await ASource.rootAt("oneAToManyB").insertKey({
      bText: "hello",
    });
    expect(await BSource.filter({ $is: bKey }).hasRows()).toBeTrue();
  });
  it("to one b to one c", async () => {
    const cKey = await ASource.rootAt("oneAToOneB")
      .rootAt("oneBToOneC")
      .insertKey({});
    expect(await CSource.filter({ $is: cKey }).hasRows()).toBeTrue();
  });
});

describe("$find sanity", () => {
  it("", async () => {
    const a = await ASource.insert({});
    const [b1, b2] = [
      await BSource.insert({ bText: "hello" }),
      await BSource.insert({ bText: "world" }),
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
        .getOrFail(a.$key)
        .then(x => x.bKey);
    }
  });
});

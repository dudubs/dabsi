import { subTest } from "../../jasmine/subTest";
import { inspect } from "../../logging";
import {
  AEntity,
  BEntity,
  CEntity,
} from "../../typeorm/relations/tests/Entities";
import { DataSource } from "../DataSource";
import { RelationKeys } from "../Relation";
import { DUnion, EUnion } from "./BaseEntities";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

export function DataSourceTests(
  ADS: DataSource<AEntity>,
  BDS: DataSource<BEntity>,
  CDS: DataSource<CEntity>,
  DDS: DataSource<DUnion>,
  EDS: DataSource<EUnion>
) {
  describe("Selection", () => {
    let key: string;

    const selectionSource = ADS.select({
      fields: {
        aText: ["selectionText"],
      },
    }).select({ fields: { aBaseText: { $base: "aText" } } });

    beforeAll(async () => {
      key = await ADS.insertKey({ aText: "sourceText" });
    });

    it("expect aText will be sourceText", async () => {
      expect(await ADS.filter({ $is: key }).getOrFail(key)).toEqual(
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
        await selectionSource
          .filter({ $base: { aText: "sourceText" } })
          .get(key)
      ).toBeDefined();
    });
  });

  it("relations sanity", async () => {
    const debug = false;

    const aKey = await ADS.insertKey({});
    const bKey = await BDS.insertKey({});

    expect(await ADS.get(aKey)).toBeTruthy();
    expect(await ADS.get(bKey)).toBeFalsy();
    expect(await BDS.get(bKey)).toBeTruthy();
    await assert("oneAToOneB");
    await assert("oneAToOneBOwner");

    await assert("manyAToManyB");
    await assert("manyAToManyBOwner");

    await assert("oneAToManyB");
    await assert("manyAToOneB");

    function assert(p: RelationKeys<AEntity>) {
      return subTest(`(${p})`, async () => {
        debug && console.log({ p, aKey, bKey });
        const aOfBOwner = ADS.of(p, bKey);
        const bOwnerAtA = ADS.at(p, aKey);

        await assert(aOfBOwner, aKey, bOwnerAtA);
        await assert(bOwnerAtA, bKey, aOfBOwner);

        async function assert<T, U>(
          ds: DataSource<T>,
          key: string,
          inverseDs: DataSource<U>
        ) {
          expect(await ds.get()).toBeFalsy();
          expect(await inverseDs.get()).toBeFalsy();

          await ds.addKey(key);
          expect(await ds.get()).toBeTruthy();
          expect(await inverseDs.get()).toBeTruthy();

          await ds.removeKey(key);
          expect(await ds.get()).toBeFalsy();
          expect(await inverseDs.get()).toBeFalsy();
        }
      });
    }
  });

  it("expect to invalid insert", async () => {
    await expectAsync(ADS.insert(<any>{ badField: 1 })).toBeRejected();
  });

  it("insert text", async () => {
    expect(await ADS.insert({ aText: "hello" })).toEqual(
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
            ADS.of(<any>relationKey, await BDS.insertKey({})).insert(<any>{
              [relationKey]: await BDS.insertKey({}),
            })
          ).toBeRejected();
        });

        it("expect to insert", () => {});
      });
    }
  });

  it("insert relation of", async () => {
    const aKey = await ADS.insertKey({});
    const cKey = await CDS.insertKey({});
    const cKey2 = await CDS.insertKey({});

    const bOfAOwnerOfCOwner = BDS.of("oneBToOneAOwner", aKey).of(
      "oneBToOneCOwner",
      cKey
    );

    expect(await bOfAOwnerOfCOwner.get()).toBeFalsy();
    await bOfAOwnerOfCOwner.insertKey({});
    expect(await bOfAOwnerOfCOwner.get()).toBeTruthy();

    expect(await BDS.of("oneBToOneAOwner", aKey).get()).toBeTruthy();

    expect(
      await BDS.of("oneBToOneAOwner", aKey).of("oneBToOneCOwner", cKey2).get()
    ).toBeFalsy();

    const bKey = await BDS.insertKey({});

    const bAtAOwnerOfCOwner = BDS.at("oneBToOneAOwner", bKey).of(
      "oneAToOneCOwner",
      cKey
    );

    ///
    expect(await bAtAOwnerOfCOwner.get()).toBeFalsy();

    await bAtAOwnerOfCOwner.insertKey({});
    expect(await bAtAOwnerOfCOwner.get()).toBeTruthy();
    expect(
      await BDS.at("oneBToOneAOwner", bKey).of("oneAToOneCOwner", cKey2).get()
    ).toBeFalsy();
  });

  it("deep relation sanity", async () => {
    await ADS.at("oneAToOneBOwner", "aid1")
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
    const aKey = await ADS.insertKey({});
    const bOfA = BDS.of("oneBToOneA", aKey);
    expect(await bOfA.has()).toBeFalsy();
    await bOfA.insertKey({});
    expect(await bOfA.has()).toBeTruthy();
  });

  it("of data key", async () => {
    const aKey = await ADS.insertKey({});

    const bOfA = BDS.of("oneBToOneA", aKey);

    const bOfAOfHello = bOfA.of("bText", "bHello");
    expect(await bOfAOfHello.has()).toBeFalsy();

    const bOfAOfHelloKey = await bOfAOfHello.insertKey({});
    expect(await bOfAOfHello.has()).toBeTruthy();

    const bOfAOfWorld = bOfA.of("bText", "bWorld");
    expect(await bOfAOfWorld.has()).toBeFalsy();

    const cOfbOfA = CDS.of("oneCToOneB", bOfAOfHelloKey);

    const cOfbOfAOfHello = cOfbOfA.of("cText", "cHello");
    expect(await cOfbOfAOfHello.has()).toBeFalsy();

    const cOfbOfAOfHelloKey = await cOfbOfAOfHello.insertKey({});

    expect(await cOfbOfAOfHello.has()).toBeTruthy();

    expect(
      await BDS.of("bText", "bHello")
        .at("oneBToOneCOwner", bOfAOfHelloKey)
        .has()
    ).toBeTruthy();

    expect(
      await BDS.of("bText", "bWorld")
        .at("oneBToOneCOwner", bOfAOfHelloKey)
        .has()
    ).toBeFalsy();
  });

  it("children", async () => {
    const rootKey = await ADS.insertKey({});
    const aChildAtA = ADS.at("manyAToManyA", rootKey);
    expect(await aChildAtA.count()).toEqual(0);

    const childKeys = [await ADS.insertKey({}), await ADS.insertKey({})];
    await aChildAtA.add(childKeys);

    expect(await aChildAtA.count()).toEqual(2);
    expect((await aChildAtA.items()).map((child) => child.$key)).toEqual(
      arrayContaining(childKeys)
    );
  });

  it("DataRow", async () => {
    const a = await ADS.insert({});
    const b = await BDS.insert({});

    expect(await a.at("oneAToOneBOwner").count()).toEqual(0);
    await a.at("oneAToOneBOwner").add(b);
    expect(await a.at("oneAToOneBOwner").count()).toEqual(1);
  });
}

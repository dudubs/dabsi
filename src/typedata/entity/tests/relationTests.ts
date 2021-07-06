import { collectTestSqlQueries } from "@dabsi/typedata/entity/tests/tester";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { DataRelationKeys } from "@dabsi/typedata/relation";
import { DataSource } from "@dabsi/typedata/source";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";

describe("add/remove", () => {
  let aKey, bKey;

  beforeAll(async () => {
    aKey = await ASource.insert({});
    bKey = await BSource.insert({});

    expect(await ASource.fetch(aKey)).toBeTruthy();
    expect(await ASource.fetch(bKey)).toBeFalsy();
    expect(await BSource.fetch(bKey)).toBeTruthy();
  });
  const debug = false;

  test("oneAToOneB");
  test("oneAToOneBOwner");

  test("manyAToManyB");
  test("manyAToManyBOwner");

  test("oneAToManyB");
  test("manyAToOneB");

  function test(p: DataRelationKeys<AEntity>) {
    return it(`(${p})`, async () => {
      debug && console.log({ p, aKey, bKey });
      const aOfBOwner = ASource.of(p, bKey);
      const bOwnerAtA = ASource.at(p, aKey);

      await assert(aOfBOwner, aKey, bOwnerAtA);
      await assert(bOwnerAtA, bKey, aOfBOwner);

      async function assert<T, U>(
        ds: DataSource<T>,
        key: string,
        inverseDs: DataSource<U>
      ) {
        expect(await ds.fetch()).toBeFalsy();
        expect(await inverseDs.fetch()).toBeFalsy();

        await ds.add(key);
        expect(await ds.fetch()).toBeTruthy();
        expect(await inverseDs.fetch()).toBeTruthy();

        await ds.remove(key);
        expect(await ds.fetch()).toBeFalsy();
        expect(await inverseDs.fetch()).toBeFalsy();
      }
    });
  }
});
it("expect to insert relation without update", async () => {
  const queries = collectTestSqlQueries();
  const bKey = await BSource.insert({});
  await ASource.insertAndFetch({
    manyAToOneB: bKey,
    oneAToOneBOwner: bKey,
  });
  expect(queries).not.toEqual(
    jasmine.arrayContaining([
      jasmine.objectContaining({
        sql: jasmine.stringMatching(/UPDATE /i),
      }),
    ])
  );
});
describe("expect to", () => {
  describe("add", () => {
    describe("one-at-one", () => {
      it("owner", async () => {
        const a = await ASource.insertAndFetch({});
        await a.at("oneAToOneBOwner").add(await BSource.insert({}));
        expect(await a.at("oneAToOneBOwner").fetch()).toBeTruthy();
      });
      it("not-owner", async () => {
        const a = await ASource.insertAndFetch({});
        await a.at("oneAToOneB").add(await BSource.insert({}));
        expect(await a.at("oneAToOneB").fetch()).toBeTruthy();
      });
    });
  });
  describe("insert", () => {
    // todo one-to-one

    describe("one-to-one", () => {
      it("owner", async () => {
        const bKey = await BSource.insert({});
        const a = await ASource.insertAndFetch({
          oneAToOneBOwner: bKey,
        });
        expect((await a.at("oneAToOneBOwner").fetch())?.$key).toEqual(bKey);
      });

      it("not-owner", async () => {
        const bKey = await BSource.insert({});
        const a = await ASource.insertAndFetch({
          oneAToOneB: bKey,
        });
        expect((await a.at("oneAToOneB").fetch())?.$key).toEqual(bKey);
      });
    });
    describe("one-at-one", () => {
      it("owner", async () => {
        const a = await ASource.insertAndFetch({});
        const bKey = await a.at("oneAToOneBOwner").insert({});
        expect((await a.at("oneAToOneBOwner").fetch())?.$key).toEqual(bKey);
      });

      it("not-owner", async () => {
        const a = await ASource.insertAndFetch({});
        const bKey = await a.at("oneAToOneB").insert({});
        expect((await a.at("oneAToOneB").fetch())?.$key).toEqual(bKey);
      });
    });
  });
  describe("update", () => {
    describe("one-to-one", () => {
      it("owner", async () => {
        const bKey = await BSource.insert({});
        const a = await ASource.insertAndFetch({});
        await a.update({ oneAToOneBOwner: bKey });
        expect((await a.at("oneAToOneBOwner").fetch())!.$key).toEqual(bKey);
      });
      it("not-owner", async () => {
        const bKey = await BSource.insert({});
        const a = await ASource.insertAndFetch({});
        await a.update({ oneAToOneB: bKey });
        expect((await a.at("oneAToOneB").fetch())!.$key).toEqual(bKey);
      });
    });
  });
});

import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { DataRelationKeys } from "@dabsi/typedata/relation";
import { DataSource } from "@dabsi/typedata/source";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
describe("add/remove", () => {
  let aKey, bKey;

  beforeAll(async () => {
    aKey = await ASource.insertKey({});
    bKey = await BSource.insertKey({});

    expect(await ASource.get(aKey)).toBeTruthy();
    expect(await ASource.get(bKey)).toBeFalsy();
    expect(await BSource.get(bKey)).toBeTruthy();
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
        expect(await ds.get()).toBeFalsy();
        expect(await inverseDs.get()).toBeFalsy();

        await ds.add(key);
        expect(await ds.get()).toBeTruthy();
        expect(await inverseDs.get()).toBeTruthy();

        await ds.remove(key);
        expect(await ds.get()).toBeFalsy();
        expect(await inverseDs.get()).toBeFalsy();
      }
    });
  }
});

describe("expect to", () => {
  describe("add", () => {
    describe("one-at-one", () => {
      it("owner", async () => {
        const a = await ASource.insert({});
        await a.at("oneAToOneBOwner").add(await BSource.insertKey({}));
        expect(await a.at("oneAToOneBOwner").get()).toBeTruthy();
      });
      it("not-owner", async () => {
        const a = await ASource.insert({});
        await a.at("oneAToOneB").add(await BSource.insertKey({}));
        expect(await a.at("oneAToOneB").get()).toBeTruthy();
      });
    });
  });
  describe("insert", () => {
    describe("one-to-one", () => {
      it("owner", async () => {
        const bKey = await BSource.insertKey({});
        const a = await ASource.insert({
          oneAToOneBOwner: bKey,
        });
        expect((await a.at("oneAToOneBOwner").get())?.$key).toEqual(bKey);
      });

      it("not-owner", async () => {
        const bKey = await BSource.insertKey({});
        const a = await ASource.insert({
          oneAToOneB: bKey,
        });
        expect((await a.at("oneAToOneB").get())?.$key).toEqual(bKey);
      });
    });
    describe("one-at-one", () => {
      it("owner", async () => {
        const a = await ASource.insert({});
        const bKey = await a.at("oneAToOneBOwner").insertKey({});
        expect((await a.at("oneAToOneBOwner").get())?.$key).toEqual(bKey);
      });

      it("not-owner", async () => {
        const a = await ASource.insert({});
        const bKey = await a.at("oneAToOneB").insertKey({});
        expect((await a.at("oneAToOneB").get())?.$key).toEqual(bKey);
      });
    });
  });
  describe("update", () => {
    describe("one-to-one", () => {
      it("owner", async () => {
        const bKey = await BSource.insertKey({});
        const a = await ASource.insert({});
        await a.update({ oneAToOneBOwner: bKey });
        expect((await a.at("oneAToOneBOwner").get())!.$key).toEqual(bKey);
      });
      it("not-owner", async () => {
        const bKey = await BSource.insertKey({});
        const a = await ASource.insert({});
        await a.update({ oneAToOneB: bKey });
        expect((await a.at("oneAToOneB").get())!.$key).toEqual(bKey);
      });
    });
  });
});

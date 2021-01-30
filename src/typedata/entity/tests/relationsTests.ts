import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";

describe("expect to", () => {
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

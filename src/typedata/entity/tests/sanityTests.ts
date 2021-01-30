import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";

it("$has/$notHas to-one", async () => {
  const keys = await ASource.insertKey([
    {
      oneAToOneBOwner: await BSource.insertKey({}),
    },
    {},
  ]);

  expect(
    await ASource.filter({
      $and: [{ $is: keys }, { $has: "oneAToOneBOwner" }],
    }).getCountRows()
  ).toEqual(1);

  expect(
    await ASource.filter({
      $and: [{ $is: keys }, { $notHas: "oneAToOneBOwner" }],
    }).getCountRows()
  ).toEqual(1);
});

it("$countRefs", async () => {
  const a1 = await ASource.insert({
    oneAToOneB: await BSource.insertKey({}),
  });

  await a1.at("oneAToManyB").insert({});
  await a1.at("oneAToManyB").insert({});

  expect(
    await ASource.pick({ countRefs: { $countRefs: "any" } })
      .filter({ $is: a1.$key })
      .getOrFail()
      .then(row => row.countRefs)
  ).toEqual(1);

  expect(
    await ASource.pick({ countRefs: { $countRefs: "all" } })
      .filter({ $is: a1.$key })
      .getOrFail()
      .then(row => row.countRefs)
  ).toEqual(3);

  expect(
    await ASource.pick({ countRefs: { $countRefs: "all" } })
      .filter({ $is: await ASource.insertKey({}) })
      .getOrFail()
      .then(row => row.countRefs)
  ).toEqual(0);
});

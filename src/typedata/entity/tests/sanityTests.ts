import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";

it("$has/$notHas to-one", async () => {
  const keys = await ASource.insert([
    {
      oneAToOneBOwner: await BSource.insert({}),
    },
    {},
  ]);

  expect(
    await ASource.filter({
      $and: [{ $is: keys }, { $has: "oneAToOneBOwner" }],
    }).count()
  ).toEqual(1);

  expect(
    await ASource.filter({
      $and: [{ $is: keys }, { $notHas: "oneAToOneBOwner" }],
    }).count()
  ).toEqual(1);
});

it("$countRefs", async () => {
  const a1 = await ASource.insertAndFetch({
    oneAToOneB: await BSource.insert({}),
  });

  await a1.at("oneAToManyB").insertAndFetch({});
  await a1.at("oneAToManyB").insertAndFetch({});

  expect(
    await ASource.pick({ countRefs: { $countRefs: "any" } })
      .filter({ $is: a1.$key })
      .fetchOrFail()
      .then(row => row.countRefs)
  ).toEqual(1);

  expect(
    await ASource.pick({ countRefs: { $countRefs: "all" } })
      .filter({ $is: a1.$key })
      .fetchOrFail()
      .then(row => row.countRefs)
  ).toEqual(3);

  expect(
    await ASource.pick({ countRefs: { $countRefs: "all" } })
      .filter({ $is: await ASource.insert({}) })
      .fetchOrFail()
      .then(row => row.countRefs)
  ).toEqual(0);
});

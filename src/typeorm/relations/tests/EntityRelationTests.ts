// TODO: rename to DataEntityRelationTests.
import { Connection, Repository } from "typeorm";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import {
  DEntity,
  DChild1,
  DChild1Child1,
  DChild2,
  EEntity,
  EChild1,
  EChild1Child1,
  EChild2,
} from "@dabsi/typedata/tests/BaseEntities";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import { DataEntityRelation } from "@dabsi/typeorm/relations/DataEntityRelation";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";

const getConnection = TestConnection([
  AEntity,
  BEntity,
  CEntity,
  DEntity,
  DChild1,
  DChild2,
  DChild1Child1,
  EEntity,
  EChild1,
  EChild2,
  EChild1Child1,
]);

let connection: Connection;
let ARepo: Repository<AEntity>;
let BRepo: Repository<BEntity>;

beforeAll(() => {
  connection = getConnection();
  ARepo = connection.getRepository(AEntity);
  BRepo = connection.getRepository(BEntity);
});

describe("sanity", () => {
  // To AEntity

  // test3("manyAToManyA");
  // test2({ ownerProperty: "manyAToOneA", notOwnerProperty: "oneAToManyA" });

  test4("A");

  test4("B");

  function test4(target: "A" | "B") {
    describe(`to:${target}`, () => {
      test3("oneAToOne" + target);
      test3("manyAToMany" + target);
      test2({
        ownerProperty: "manyAToOne" + target,
        notOwnerProperty: "oneAToMany" + target,
      });
    });
  }

  // beforeEach(() => {
  //   console.log(`--- ${getJasmineSpecReporterResult().fullName}`);
  // });

  function test3(propertyName) {
    test2({
      ownerProperty: propertyName + "Owner",
      notOwnerProperty: propertyName,
    });
  }

  function test2({ ownerProperty, notOwnerProperty }) {
    test({ ownerSide: "left", propertyName: ownerProperty });
    test({ ownerSide: "right", propertyName: notOwnerProperty });
  }

  function test({
    ownerSide,
    propertyName,
  }: {
    ownerSide: "left" | "right";
    propertyName;
  }) {
    describe(`property:${propertyName}`, () => {
      const notOwnerSide = ownerSide === "left" ? "right" : "left";

      test("of");
      test("at");

      function test(relationType: "of" | "at") {
        const inverse = relationType === "at";
        const rOwnerSide = inverse ? notOwnerSide : ownerSide;
        const rNotOwnerSide = inverse ? ownerSide : notOwnerSide;

        describe("relation:" + relationType, () => {
          it(`expect ${ownerSide} is owning`, () => {
            const r = new DataEntityRelation(
              connection,
              AEntity,
              propertyName,
              inverse
            );
            expect(r[rOwnerSide].isOwning).toBeTrue();
            expect(r[rNotOwnerSide].isOwning).toBeFalse();
          });
        });
      }
    });
  }
});
it("sanity", async () => {
  await test(
    DataEntityRelation.of(connection, AEntity, "oneAToOneBOwner"),
    DataEntityRelation.of(connection, AEntity, "oneAToOneB"),
    DataEntityRelation.at(connection, AEntity, "oneAToOneBOwner"),
    DataEntityRelation.at(connection, AEntity, "oneAToOneB")
  );

  await test(
    DataEntityRelation.of(connection, AEntity, "manyAToManyBOwner"),
    DataEntityRelation.of(connection, AEntity, "manyAToManyB"),
    DataEntityRelation.at(connection, AEntity, "manyAToManyBOwner"),
    DataEntityRelation.at(connection, AEntity, "manyAToManyB")
  );

  await test(
    DataEntityRelation.of(connection, AEntity, "manyAToOneB"),
    DataEntityRelation.of(connection, AEntity, "oneAToManyB"),
    DataEntityRelation.at(connection, AEntity, "manyAToOneB"),
    DataEntityRelation.at(connection, AEntity, "oneAToManyB")
  );

  async function test(aOfBOwner, aOfB, bOwnerAtA, bAtA) {
    expect(aOfBOwner).toEqual(
      jasmine.objectContaining({
        left: jasmine.objectContaining({
          entityType: AEntity,
          isOwning: true,
        }),
        right: jasmine.objectContaining({
          entityType: BEntity,
          isOwning: false,
        }),
      })
    );

    expect(aOfB).toEqual(
      jasmine.objectContaining({
        left: jasmine.objectContaining({
          entityType: AEntity,
          isOwning: false,
        }),
        right: jasmine.objectContaining({
          entityType: BEntity,
          isOwning: true,
        }),
      })
    );

    expect(bOwnerAtA).toEqual(
      jasmine.objectContaining({
        left: jasmine.objectContaining({
          entityType: BEntity,
          isOwning: false,
        }),
        right: jasmine.objectContaining({
          entityType: AEntity,
          isOwning: true,
        }),
      })
    );

    expect(bAtA).toEqual(
      jasmine.objectContaining({
        left: jasmine.objectContaining({
          entityType: BEntity,
          isOwning: true,
        }),
        right: jasmine.objectContaining({
          entityType: AEntity,
          isOwning: false,
        }),
      })
    );

    await assertRelation(aOfBOwner);
    await assertRelation(aOfB);
    await assertRelation(bAtA);
    await assertRelation(bOwnerAtA);
  }

  async function assertRelation(relation: DataEntityRelation) {
    let [left] = await relation.left.repository.save([
      relation.left.repository.create(),
    ]);
    let [right] = await relation.right.repository.save([
      relation.right.repository.create(),
    ]);

    const rightKey = DataEntityKey.pick(relation.right.entityMetadata, right);
    const qb = relation.left.repository.createQueryBuilder();
    relation.joinSqb(
      "INNER",
      qb,
      qb.alias,
      DataEntityKey.pick(relation.right.entityMetadata, right)
    );

    expect(await qb.getRawOne()).toBeFalsy();
    await relation.update("addOrSet", left, rightKey);
    expect(await qb.getRawOne()).toBeTruthy();
    await relation.update("removeOrUnset", left, rightKey);
    expect(await qb.getRawOne()).toBeFalsy();
    await relation.update("addOrSet", left, rightKey);
    expect(await qb.getRawOne()).toBeTruthy();
  }
});

it("tree", () => {
  const aOfA = DataEntityRelation.of(connection, AEntity, "manyAToManyA");
  const aAtA = DataEntityRelation.at(connection, AEntity, "manyAToManyA");
  const aOfAOwner = DataEntityRelation.of(
    connection,
    AEntity,
    "manyAToManyAOwner"
  );
  const aAtAOwner = DataEntityRelation.at(
    connection,
    AEntity,
    "manyAToManyAOwner"
  );

  expect(aOfA.left.isOwning).toBeFalsy();
  expect(aOfA.right.isOwning).toBeTruthy();
  expect(aOfAOwner.left.isOwning).toBeTruthy();
  expect(aOfAOwner.right.isOwning).toBeFalsy();

  expect(aAtA.left.isOwning).toBeTruthy();
  expect(aAtA.right.isOwning).toBeFalsy();
  expect(aAtAOwner.left.isOwning).toBeFalsy();
  expect(aAtAOwner.right.isOwning).toBeTruthy();

  expect(aOfA.left.getJoinConditionSqlByTable("lx", "jx")).not.toEqual(
    aOfAOwner.left.getJoinConditionSqlByTable("lx", "jx")
  );
});

it("union", () => {
  const eOfD = DataEntityRelation.of(connection, DEntity, "oneDToOneE");
  const eOfDChild1 = DataEntityRelation.of(connection, DChild1, "oneDToOneE");
  const eOwnerOfD = DataEntityRelation.of(
    connection,
    DEntity,
    "oneDToOneEOwner"
  );
  const eOwnerOfDChild1 = DataEntityRelation.of(
    connection,
    DChild1,
    "oneDToOneEOwner"
  );

  expect(eOwnerOfD.left.isOwning).toEqual(eOwnerOfDChild1.left.isOwning);
});

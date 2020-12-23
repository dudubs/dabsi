// TODO: rename to EntityRelationTests.
import { Connection, Repository } from "typeorm";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import {
  DBase,
  DChild1,
  DChild1Child1,
  DChild2,
  EBase,
  EChild1,
  EChild1Child1,
  EChild2,
} from "@dabsi/typedata/tests/BaseEntities";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import { EntityRelation } from "@dabsi/typeorm/relations/EntityRelation";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/Entities";

const getConnection = TestConnection([
  AEntity,
  BEntity,
  CEntity,
  DBase,
  DChild1,
  DChild2,
  DChild1Child1,
  EBase,
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
            const r = new EntityRelation(
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
    EntityRelation.of(connection, AEntity, "oneAToOneBOwner"),
    EntityRelation.of(connection, AEntity, "oneAToOneB"),
    EntityRelation.at(connection, AEntity, "oneAToOneBOwner"),
    EntityRelation.at(connection, AEntity, "oneAToOneB")
  );

  await test(
    EntityRelation.of(connection, AEntity, "manyAToManyBOwner"),
    EntityRelation.of(connection, AEntity, "manyAToManyB"),
    EntityRelation.at(connection, AEntity, "manyAToManyBOwner"),
    EntityRelation.at(connection, AEntity, "manyAToManyB")
  );

  await test(
    EntityRelation.of(connection, AEntity, "manyAToOneB"),
    EntityRelation.of(connection, AEntity, "oneAToManyB"),
    EntityRelation.at(connection, AEntity, "manyAToOneB"),
    EntityRelation.at(connection, AEntity, "oneAToManyB")
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

  async function assertRelation(relation: EntityRelation) {
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
  const aOfA = EntityRelation.of(connection, AEntity, "manyAToManyA");
  const aAtA = EntityRelation.at(connection, AEntity, "manyAToManyA");
  const aOfAOwner = EntityRelation.of(connection, AEntity, "manyAToManyAOwner");
  const aAtAOwner = EntityRelation.at(connection, AEntity, "manyAToManyAOwner");

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
  const eOfD = EntityRelation.of(connection, DBase, "oneDToOneE");
  const eOfDChild1 = EntityRelation.of(connection, DChild1, "oneDToOneE");
  const eOwnerOfD = EntityRelation.of(connection, DBase, "oneDToOneEOwner");
  const eOwnerOfDChild1 = EntityRelation.of(
    connection,
    DChild1,
    "oneDToOneEOwner"
  );

  expect(eOwnerOfD.left.isOwning).toEqual(eOwnerOfDChild1.left.isOwning);
});

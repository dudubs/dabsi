import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Union } from "@dabsi/common/typings2/Union";
import { WeakId } from "@dabsi/common/WeakId";
import {
  DataChangeReason,
  DataRelationChange,
} from "@dabsi/typedata/data-entity/DataEntityListener";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import getTestDataConnection from "@dabsi/typedata/data-entity/tests/getTestDataConnection";
import { DataCursor, EmptyDataCursor } from "@dabsi/typedata/DataCursor";
import { DataRelationKeys } from "@dabsi/typedata/DataRelation";
import { DataSource } from "@dabsi/typedata/DataSource";
import {
  DChild1,
  DChild1Child1,
  DChild1Child2,
  DChild2,
  DEntity,
  EEntity,
} from "@dabsi/typedata/tests/BaseEntities";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

const assertIsEntityKey = (entityType, entityKey) => {
  if (entityKey) {
    if (entityKey.charAt(0).toUpperCase() !== entityType.name.charAt(0)) {
      fail(`${entityKey} is not key of ${entityType.name}`);
    }
  }
};
class TestDataSource<T> extends DataEntitySource<T> {
  hasRelationListener() {
    return true;
  }

  async emitRelationChange(change: DataRelationChange) {
    assertIsEntityKey(change.relationMetadata.type, change.newRelationKey);
    assertIsEntityKey(change.relationMetadata.type, change.oldRelationKey);
    assertIsEntityKey(change.relationMetadata.target, change.entityKey);

    changes.push({
      ...change,
      hasNewKey: !!change.newRelationKey,
      hasOldKey: !!change.oldRelationKey,
      reasonKey: DataChangeReason[change.reason],
      relationPath: `${(change.relationMetadata.target as Function).name}.${
        change.relationMetadata.propertyName
      }`,
    });
  }

  withCursor<U = T>(cursor: DataCursor): TestDataSource<U> {
    return new TestDataSource<U>(this.entityType, this.getQueryRunner, cursor);
  }
}

const createTestSource = <T>(entityType: Constructor<T>): DataSource<T> =>
  <any>(
    new TestDataSource(
      entityType,
      () => getTestDataConnection().createQueryRunner(),
      EmptyDataCursor
    )
  );

const ASource = createTestSource(AEntity);
const BSource = createTestSource(BEntity);
const CSource = createTestSource(CEntity);
const DSource = createTestSource(DEntity);
const DC1Source = createTestSource(DChild1);
const DC1C1Source = createTestSource(DChild1Child1);
const DC1C2Source = createTestSource(DChild1Child2);
const DC2Source = createTestSource(DChild2);
const ESource = createTestSource(EEntity);

let changes: any[] = [];

const EntityTypeMap = { AEntity, BEntity, CEntity };
type RelationExpector = Union<
  {
    [K in keyof typeof EntityTypeMap]: Union<
      {
        [P in DataRelationKeys<
          InstanceType<typeof EntityTypeMap[K]>
        >]: `${K}.${P}`;
      }
    >;
  }
>;
function expectToRelationChange2<T>(e: {
  relation: RelationExpector;
  reason: keyof typeof DataChangeReason;
  newRelationKey: string | null;
  oldRelationKey: string | null;
  entityKey: string;
}) {
  const changesLength = changes.length;
  changes = changes.filter(change => {
    return !(
      change.entityKey === e.entityKey &&
      change.reasonKey === e.reason &&
      change.newRelationKey == e.newRelationKey &&
      change.oldRelationKey == e.oldRelationKey &&
      change.relationPath == e.relation
    );
  });
  if (changes.length === changesLength) {
    fail(`No have matched changes`);
  }
}

function expectToInsertRelationChange(
  relation: RelationExpector,
  entityKey: string,
  newRelationKey: string
) {
  expectToRelationChange2({
    relation,
    reason: "INSERT",
    oldRelationKey: null,
    newRelationKey,
    entityKey,
  });
}

xdescribe("expect events on", () => {
  beforeAll(async () => {
    await getTestDataConnection().query(`PRAGMA foreign_keys = OFF;`);
  });
  let bKey1: string;
  let bKey2: string;
  beforeEach(async () => {
    [bKey1, bKey2] = [
      await BSource.insertKey({}), //
      await BSource.insertKey({}),
    ];
  });
  describe("insert", () => {
    it("one-to-one", async () => {
      const a = await ASource.insert({
        oneAToOneB: bKey1,
      });
      expectToInsertRelationChange("AEntity.oneAToOneB", a.$key, bKey1);
      expectToInsertRelationChange("BEntity.oneBToOneAOwner", bKey1, a.$key);
    });
    it("many-to-one", async () => {
      const a = await ASource.insert({
        manyAToOneB: bKey1,
      });
      expectToInsertRelationChange("AEntity.manyAToOneB", a.$key, bKey1);
      expectToInsertRelationChange("BEntity.oneBToManyA", bKey1, a.$key);
    });

    it("one-at-many", async () => {
      const a = await ASource.insert({});
      changes = [];
      const bKey = await a.at("oneAToManyB").insertKey({});
      expectToInsertRelationChange("AEntity.oneAToManyB", a.$key, bKey);
      expectToInsertRelationChange("BEntity.manyBToOneA", bKey, a.$key);
    });

    it("one-at-one", async () => {
      const a = await ASource.insert({});
      changes = [];
      const bKey = await a.at("oneAToOneB").insertKey({});
      expectToInsertRelationChange("AEntity.oneAToOneB", a.$key, bKey);
      expectToInsertRelationChange("BEntity.oneBToOneAOwner", bKey, a.$key);
    });
  });
  describe("add", () => {
    it("many-to-many", async () => {
      const a = await ASource.insert({});
      changes = [];
      await a.at("manyAToManyB").add(bKey1);
      expectToRelationChange2({
        relation: "AEntity.manyAToManyB",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: bKey1,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.manyBToManyAOwner",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: a.$key,
        entityKey: bKey1,
      });
    });
    it("one-at-many", async () => {
      const a = await ASource.insert({});
      changes = [];
      await a.at("oneAToManyB").add(bKey1);
      expectToRelationChange2({
        relation: "AEntity.oneAToManyB",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: bKey1,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.manyBToOneA",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: a.$key,
        entityKey: bKey1,
      });
    });
    it("one-at-one", async () => {
      const a = await ASource.insert({});
      changes = [];
      await a.at("oneAToOneB").add(bKey1);
      expectToRelationChange2({
        relation: "AEntity.oneAToOneB",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: bKey1,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.oneBToOneAOwner",
        reason: "UPDATE",
        oldRelationKey: null,
        newRelationKey: a.$key,
        entityKey: bKey1,
      });
    });
  });
  describe("remove", () => {
    it("many-to-many", async () => {
      const a = await ASource.insert({});
      await a.at("manyAToManyB").add(bKey1);
      changes = [];
      await a.at("manyAToManyB").remove(bKey1);
      expectToRelationChange2({
        relation: "AEntity.manyAToManyB",
        reason: "UPDATE",
        oldRelationKey: bKey1,
        newRelationKey: null,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.manyBToManyAOwner",
        reason: "UPDATE",
        oldRelationKey: a.$key,
        newRelationKey: null,
        entityKey: bKey1,
      });
    });
    it("one-at-one", async () => {
      const a = await ASource.insert({
        oneAToOneBOwner: bKey1,
      });
      changes = [];
      await a.at("oneAToOneBOwner").remove();
      expectToRelationChange2({
        relation: "AEntity.oneAToOneBOwner",
        reason: "UPDATE",
        oldRelationKey: bKey1,
        newRelationKey: null,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.oneBToOneA",
        reason: "UPDATE",
        oldRelationKey: a.$key,
        newRelationKey: null,
        entityKey: bKey1,
      });
    });
    it("many-at-one", async () => {
      const a = await ASource.insert({
        manyAToOneB: bKey1,
      });
      changes = [];
      await a.at("manyAToOneB").remove();
      expectToRelationChange2({
        relation: "AEntity.manyAToOneB",
        reason: "UPDATE",
        oldRelationKey: bKey1,
        newRelationKey: null,
        entityKey: a.$key,
      });
      expectToRelationChange2({
        relation: "BEntity.oneBToManyA",
        reason: "UPDATE",
        oldRelationKey: a.$key,
        newRelationKey: null,
        entityKey: bKey1,
      });
    });
  });
  describe("update", () => {
    it("one-to-one", async () => {
      const a = await ASource.insert({
        oneAToOneBOwner: bKey1,
      });
      changes = [];
      await a.update({
        oneAToOneBOwner: bKey2,
      });
      expectToRelationChange2({
        relation: "AEntity.oneAToOneBOwner",
        reason: "UPDATE",
        entityKey: a.$key,
        oldRelationKey: bKey1,
        newRelationKey: bKey2,
      });
      expectToRelationChange2({
        relation: "BEntity.oneBToOneA",
        reason: "UPDATE",
        entityKey: bKey1,
        oldRelationKey: a.$key,
        newRelationKey: null,
      });
    });

    it("many-to-one", async () => {
      const a = await ASource.insert({
        manyAToOneB: bKey1,
      });
      changes = [];
      await a.update({
        manyAToOneB: bKey2,
      });
      expectToRelationChange2({
        relation: "AEntity.manyAToOneB",
        reason: "UPDATE",
        entityKey: a.$key,
        oldRelationKey: bKey1,
        newRelationKey: bKey2,
      });
      expectToRelationChange2({
        relation: "BEntity.oneBToManyA",
        reason: "UPDATE",
        entityKey: bKey1,
        oldRelationKey: a.$key,
        newRelationKey: null,
      });
    });
  });

  fdescribe("delete", () => {
    describe("one-to-one", () => {
      it("owner", async () => {
        const a = await ASource.insert({ oneAToOneBOwner: bKey1 });
        changes = [];
        await a.delete();
        expectToRelationChange2({
          relation: "AEntity.oneAToOneBOwner",
          reason: "DELETE",
          entityKey: a.$key,
          oldRelationKey: bKey1,
          newRelationKey: null,
        });
        expectToRelationChange2({
          relation: "BEntity.oneBToOneA",
          reason: "DELETE",
          entityKey: bKey1,
          oldRelationKey: a.$key,
          newRelationKey: null,
        });
      });
      it("not-owner", async () => {
        const a = await ASource.insert({ oneAToOneB: bKey1 });
        changes = [];
        await a.delete();
        expectToRelationChange2({
          relation: "AEntity.oneAToOneB",
          reason: "DELETE",
          entityKey: a.$key,
          oldRelationKey: bKey1,
          newRelationKey: null,
        });
        expectToRelationChange2({
          relation: "BEntity.oneBToOneAOwner",
          reason: "DELETE",
          entityKey: bKey1,
          oldRelationKey: a.$key,
          newRelationKey: null,
        });
      });
    });
  });
  beforeEach(() => {
    changes = [];
  });
  afterEach(() => {
    if (changes.length) {
      console.log({ changes });
      fail("have unexpected changes.");
    }
    changes = [];
  });
});

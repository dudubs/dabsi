import addAll from "@dabsi/common/map/addAll";
import DataModule from "@dabsi/modules/data";
import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import DataSourceResolver from "@dabsi/modules/data/DataSourceResolver";
import { TestEntity } from "@dabsi/modules/data/tests/TestEntity";
import { DbModule } from "@dabsi/modules/DbModule";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataUnion } from "@dabsi/typedata/DataUnion";
import { Resolver, ResolverType } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import {
  ChildEntity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  TableInheritance,
} from "typeorm";

@TestEntity()
class TestResource {
  @PrimaryColumn()
  id!: string;

  @Column({ default: 0 })
  countRefs!: number;
}

@TestEntity()
class TestFolder {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => TestDoc)
  docs!: DataRelation<TestDoc>;
}

@TestEntity()
@TableInheritance({ column: "type" })
class TestDoc {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => TestResource)
  res!: DataRelation<TestResource>;

  @JoinTable()
  @ManyToMany(() => TestResource)
  manyRes!: DataRelation<TestResource>[];

  @Column()
  type!: string;
}

@ChildEntity("child1")
class TestDocChild1 extends TestDoc {
  @ManyToOne(() => TestResource)
  child1Res!: DataRelation<TestResource>;
}

@ChildEntity("child1Child1")
class TestDocChild1Child1 extends TestDocChild1 {
  @ManyToOne(() => TestResource)
  child1Child1Res!: DataRelation<TestResource>;
}

@ChildEntity("child2")
class TestDocChild2 extends TestDoc {
  @ManyToOne(() => TestResource)
  child2Res!: DataRelation<TestResource>;
}

class TestDocUnion extends DataUnion(TestDoc, {
  children: {
    child1: TestDocChild1,
    child2: TestDocChild2,
  },
}) {}

const tResolver = Resolver.object({
  docs: DataSourceResolver(TestDoc),
  folders: DataSourceResolver(TestFolder),
  unionDocs: DataSourceResolver(TestDocUnion),
  child1Docs: DataSourceResolver(TestDocChild1),
  child2Docs: DataSourceResolver(TestDocChild2),
  resources: DataSourceResolver(TestResource),
});

let t: ResolverType<typeof tResolver>;

let dbModule: DbModule;
beforeAll(async () => {
  const runner = new ModuleRunner();
  const dataModule = runner.getInstance(DataModule);
  dbModule = runner.getInstance(DbModule);
  runner.getInstance(TestDbModule);
  buildCountRefs(dataModule, TestResource, "countRefs");

  addAll(dbModule.entityTypes, [
    TestDoc,
    TestDocChild1,
    TestDocChild2,
    TestDocChild1Child1,
    TestResource,
    TestFolder,
  ]);
  await dbModule.init();
  t = Resolver.checkAndResolve(tResolver, runner.context);
});

let res1: DataRow<TestResource>;
let res2: DataRow<TestResource>;

beforeEach(async () => {
  res1 = await t.resources.insert({});
  res2 = await t.resources.insert({});
});

let docs: DataSource<TestDoc>;

const test = () => {
  xit("*-to-many", async () => {
    const doc = await docs.insert({});
    await doc.at("manyRes").add([res1, res2]);
    await (await docs.insert({})).at("manyRes").add(res2);

    expect((await res1.reload()).countRefs).toEqual(1);
    expect((await res2.reload()).countRefs).toEqual(2);

    await doc.delete();
    expect((await res1.reload()).countRefs).toEqual(0);
    expect((await res2.reload()).countRefs).toEqual(1);
  });

  fdescribe("*-to-one relation", () => {
    const test = async ({ insertRes, insertCount, updateRes, updateCount }) => {
      const doc = await docs.insert({ res: insertRes });
      expect((await res1.reload()).countRefs).toEqual(insertCount);
      await doc.update({ res: updateRes });
      expect((await res1.reload()).countRefs).toEqual(updateCount);
      await doc.delete();
      expect((await res1.reload()).countRefs).toEqual(0);
    };

    // TODO: test insert at/of *relation* one/many
    it("from null to res1", () =>
      test({
        insertRes: null,
        insertCount: 0,
        updateRes: res1,
        updateCount: 1,
      }));

    it("from res1 to res2", () =>
      test({
        insertRes: res1,
        insertCount: 1,
        updateRes: res2,
        updateCount: 0,
      }));

    it("from res1 to null", () =>
      test({
        insertRes: res1,
        insertCount: 1,
        updateRes: null,
        updateCount: 0,
      }));
  });
};

xdescribe("from root", () => {
  beforeAll(() => {
    docs = t.docs;
  });
  test();
});

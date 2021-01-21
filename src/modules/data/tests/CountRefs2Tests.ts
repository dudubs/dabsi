import { touchMap } from "@dabsi/common/map/touchMap";
import { touchSet } from "@dabsi/common/map/touchSet";
import { WeakId } from "@dabsi/common/WeakId";
import DataModule from "@dabsi/modules/data";
import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import DataSourceResolver from "@dabsi/modules/data/DataSourceResolver";
import { TestEntity } from "@dabsi/modules/data/tests/TestEntity";
import { DbModule } from "@dabsi/modules/DbModule";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { DataUnion } from "@dabsi/typedata/DataUnion";
import { Resolver, ResolverType } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { EntityRelation } from "@dabsi/typeorm/relations";
import {
  ChildEntity,
  Column,
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
@TableInheritance({ column: "type" })
class TestDoc {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => TestResource)
  res!: DataRelation<TestResource>;

  @Column()
  type!: string;
}

@ChildEntity("child1")
class TestDocChild1 extends TestDoc {
  @ManyToOne(() => TestResource)
  child1Res!: DataRelation<TestResource>;
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
  dbModule.entityTypes.add(TestDoc);
  dbModule.entityTypes.add(TestDocChild1);
  dbModule.entityTypes.add(TestDocChild2);
  dbModule.entityTypes.add(TestResource);
  await dbModule.init();
  t = Resolver.checkAndResolve(tResolver, runner.context);
});

xit("", async () => {
  const cache = new Set();

  for (const entityMetadata of dbModule.getConnection().entityMetadatas) {
    if (typeof entityMetadata.target !== "function") continue;
    for (const relationMetadata of entityMetadata.relations) {
      if (typeof relationMetadata.target !== "function") continue;

      // if (!touchSet(cache, relationMetadata)) continue;

      console.log({
        entityTargetName: entityMetadata.target.name,
        relationTargetName: relationMetadata.target.name,
        relationPropertyName: relationMetadata.propertyName,
        x: WeakId(relationMetadata),
        // x: relationMetadata,
      });
    }
  }
});

fit("", async () => {
  const res = await t.resources.insert({});
  const child1ResKey = await t.child1Docs.insertKey({
    res: res,
    child1Res: res,
  });
  expect((await res.reload()).countRefs).toEqual(2);

  // await t.child2Docs.insertKey({
  //   res: res,
  //   child2Res: res,
  // });
  // expect((await res.reload()).countRefs).toEqual(4);

  // await t.unionDocs.filter({ $is: "x" }).delete();
  // expect((await res.reload()).countRefs).toEqual(2);
});

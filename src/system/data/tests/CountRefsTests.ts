import { Awaitable } from "@dabsi/common/typings2/Async";
import { DbModule } from "@dabsi/modules/DbModule";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import DataSystemModule from "@dabsi/system/data";
import buildCountRefs from "@dabsi/system/data/buildCountRefs";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import DataSources from "@dabsi/typedata/DataSources";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { Resolver, ResolverType } from "@dabsi/typedi/Resolver";
import { ObjectResolver } from "@dabsi/typedi/resolvers/ObjectResolver";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

function TestEntity() {
  let count = 0;
  return (target: Function & { prototype: { id: string } }) => {
    const desc: PropertyDescriptor = {
      value(this: any) {
        this.id = `${this.constructor.name}-${++count}`;
      },
    };
    BeforeInsert()(target.prototype, "setTestEntityId");
    Object.defineProperty(target.prototype, "setTestEntityId", desc);
    Entity()(target);
  };
}

@TestEntity()
class TestResource {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  countRefs: number;
}

@TestEntity()
class TestDoc {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => TestResource)
  oneResource: DataRelation<TestResource>;

  @JoinTable()
  @ManyToMany(() => TestResource)
  manyResources: DataRelation<TestResource>[];
}

const testResolver = ObjectResolver({
  sources: DataSources({
    docs: TestDoc,
    resources: TestResource,
  }),
});

let t: ResolverType<typeof testResolver>;

beforeAll(async () => {
  const runner = new ModuleRunner();
  const sdm = runner.getModuleInstance(DataSystemModule);
  const dbm = runner.getModuleInstance(DbModule);
  runner.getModuleInstance(TestDbModule);
  buildCountRefs(sdm, TestResource, "countRefs");

  dbm.entityTypes.add(TestDoc);
  dbm.entityTypes.add(TestResource);

  await dbm.init();
  t = Resolver.checkAndResolve(testResolver, runner.context);
});

let resourceKey: string;

function getCountRefs() {
  return t.sources.resources.getOrFail(resourceKey).then(x => x.countRefs);
}

beforeEach(async () => {
  resourceKey = await t.sources.resources.insertKey({});
});

afterEach(async () => {
  await t.sources.docs.delete();
  await t.sources.resources.delete();
});

let lastCount;
async function countRefs() {
  let count = 0;
  for (const doc of await t.sources.docs
    .pick({
      hasInManyResouces: { $has: { manyResources: { $is: resourceKey } } },
      isOneResource: { $at: { oneResource: { $is: resourceKey } } },
    })
    .getRows()) {
    if (doc.hasInManyResouces) {
      count++;
    }
    if (doc.isOneResource) {
      count++;
    }
  }

  if (count === lastCount) {
    console.warn("count === lastCount", count);
  } else {
    lastCount = count;
  }
  return count;
}

async function test<T>(callback: () => Awaitable<T>): Promise<T> {
  const result = await callback();
  // expect(await getCountRefs()).toEqual(await countRefs());
  return result;
}

async function createDoc() {
  const doc = await test(() =>
    t.sources.docs.insert({
      oneResource: resourceKey,
    })
  );
  await test(() => doc.at("manyResources").add(resourceKey));
  return doc;
}

it("sanity", async () => {
  const doc1 = await createDoc();
  const doc2 = await createDoc();
  const doc3 = await createDoc();

  expect(await getCountRefs()).toEqual(6);

  await test(() => doc1.update({ oneResource: null }));
  await test(() => doc2.at("manyResources").remove(resourceKey));

  await test(() => doc1.delete());
  await test(() => doc2.delete());
  await test(() => doc3.delete());
});

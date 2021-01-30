import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import CliModule from "@dabsi/modules/CliModule";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import SessionModule, { SESSION_TIMEOUT } from "@dabsi/modules/session";
import { Session } from "@dabsi/modules/session/entities/Session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import { Resource } from "@dabsi/modules/session/resource";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import { getRelationMetadatasTo } from "@dabsi/typedata/entity/metadata";
import { DataRelation } from "@dabsi/typedata/relation";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { findEntities } from "@dabsi/typeorm/findEntities";
import {
  ChildEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  TableInheritance,
} from "typeorm";
import TestIdColumn from "../../../typedata/entity/tests/TestIdColumn";

@Entity()
class TestRes1 extends Resource {
  @TestIdColumn() id!: string;
}

@Entity()
class TestRes2 extends Resource {
  @TestIdColumn() id!: string;

  @ManyToOne(() => TestRes1)
  res1!: DataRelation<TestRes1>;
}

@Entity()
@TableInheritance({ column: "type" })
class TestRes3 extends Resource {
  @TestIdColumn() id!: string;

  @Column()
  type!: string;

  @ManyToOne(() => TestRes1)
  res1!: DataRelation<TestRes1>;
}

@ChildEntity()
class TestRes3Child1 extends TestRes3 {
  @Column()
  child1Text!: string;
}

@ChildEntity()
class TestRes3Child1Child1 extends TestRes3Child1 {
  @Column()
  child1Child1Text!: string;
}

@Entity()
class TestDoc {
  @TestIdColumn() id!: string;

  @ManyToOne(() => TestRes1)
  res1!: DataRelation<TestRes1>;

  @ManyToOne(() => TestRes2)
  res2!: DataRelation<TestRes2>;

  @JoinTable()
  @ManyToMany(() => TestRes3)
  manyRes3!: DataRelation<TestRes3>[];
}

const t = Tester.beforeAll(async () => {
  const moduleRunner = new ModuleRunner();
  moduleRunner.getInstance(CliModule);
  await moduleRunner.getInstance(TestDbModule);
  const sessionModule = moduleRunner.getInstance(SessionModule);
  const dbModule = moduleRunner.getInstance(DbModule);
  dbModule.entityTypes.addAll(
    findEntities([TestRes1, TestRes2, TestDoc, TestRes3])
  );
  await dbModule.init();
  const data = moduleRunner.resolve(DataContext);

  const handledResouces: any[] = [];

  const handle = (resType, selection) => {
    sessionModule.defineResourceType(resType, {
      selection,
      handle: res => {
        handledResouces.push({ ...res, resType });
      },
    });
  };

  handle(TestRes1, {
    pick: [],
    fields: { customField: ["hello"] },
  });

  handle(TestRes3Child1Child1, {
    pick: [],
    fields: { subChild1CustomField: ["hello"] },
    relataions: { session: { pick: [] } },
  });

  const sessions = data.getSource(Session);
  return {
    handledResouces,
    sessions,
    sessionModule,
    resources1: data.getSource(TestRes1),
    resources2: data.getSource(TestRes2),
    resources3: data.getSource(TestRes3),

    connection: dbModule.getConnection(),
    docs: data.getSource(TestDoc),
    createResouces: async session => {
      const res1 = await t.resources1.insertKey({
        session,
      });
      const res2 = await t.resources2.insertKey({
        res1,
        session,
      });
      const res3Child1 = await data.getSource(TestRes3Child1).insertKey({
        session,
        res1,
      });

      const res3Child1Child1 = await data
        .getSource(TestRes3Child1Child1)
        .insertKey({
          session,
          res1,
        });
      return { res1, res2, res3Child1, res3Child1Child1 };
    },
  };
})
  .beforeAll(async t => {
    return {
      timeoutSession: await t.sessions.insertKey({
        token: "x",
        timeout: getCurrentTime() - SESSION_TIMEOUT,
      }),
      notTimeoutSesion: await t.sessions.insertKey({
        token: "x",
        timeout: getCurrentTime() + SESSION_TIMEOUT,
      }),
    };
  })
  .beforeAll(async t => {
    const timeoutWithRefs = await t.createResouces(t.timeoutSession);
    (
      await t.docs.insert({
        res2: timeoutWithRefs.res2,
      })
    )
      .at("manyRes3")
      .add([timeoutWithRefs.res3Child1, timeoutWithRefs.res3Child1Child1]);
    return {
      timeoutWithoutRefs: await t.createResouces(t.timeoutSession),
      timeoutWithRefs,
      notTimeout: await t.createResouces(t.notTimeoutSesion),
    };
  });

beforeAll(async () => {
  await t.sessionModule.cleanAll();
});

it("expect to delete timeout session", async () => {
  expect(await t.sessions.get(t.timeoutSession)).toBeFalsy();
  expect(await t.sessions.get(t.notTimeoutSesion)).toBeTruthy();
});

it("expect to delete timeout resources without refs", async () => {
  expect(await t.resources1.get(t.timeoutWithoutRefs.res1)).toBeFalsy();
  expect(await t.resources2.get(t.timeoutWithoutRefs.res2)).toBeFalsy();
  expect(await t.resources3.get(t.timeoutWithoutRefs.res3Child1)).toBeFalsy();
  expect(
    await t.resources3.get(t.timeoutWithoutRefs.res3Child1Child1)
  ).toBeFalsy();
});

it("expect to not delete timeout resources with refs", async () => {
  expect(await t.resources1.get(t.timeoutWithRefs.res1)).toBeTruthy();
  expect(await t.resources2.get(t.timeoutWithRefs.res2)).toBeTruthy();
  expect(await t.resources3.get(t.timeoutWithRefs.res3Child1)).toBeTruthy();
  expect(
    await t.resources3.get(t.timeoutWithRefs.res3Child1Child1)
  ).toBeTruthy();
});

it("expect to not delete not-timeout resources ", async () => {
  expect(await t.resources1.get(t.notTimeout.res1)).toBeTruthy();
  expect(await t.resources2.get(t.notTimeout.res2)).toBeTruthy();
  expect(await t.resources3.get(t.notTimeout.res3Child1)).toBeTruthy();
  expect(await t.resources3.get(t.notTimeout.res3Child1Child1)).toBeTruthy();
});

it("expect to selection with children", () => {
  expect(t.handledResouces).toContain(
    jasmine.objectContaining({
      resType: TestRes3Child1Child1,
      subChild1CustomField: "hello",
    })
  );
});

it("expect to selection without children", () => {
  expect(t.handledResouces).toContain(
    jasmine.objectContaining({
      resType: TestRes1,
      customField: "hello",
    })
  );
});

import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import CliModule from "@dabsi/modules/CliModule";
import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { SESSION_TIMEOUT } from "@dabsi/modules/session";
import getCurrentTime from "@dabsi/modules/session/getCurrentTime";
import RequestSession from "@dabsi/modules/session/RequestSession";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import { RichTextContext } from "@dabsi/system/rich-text/context";
import { RichTextDocument } from "@dabsi/system/rich-text/entities/Document";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { findEntities } from "@dabsi/typeorm/findEntities";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
class TestRichTextEntity extends RichTextEntity {
  @Column()
  testText!: string;
}

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      test: {
        packed: string;
        unpacked: {
          testKey: string;
          dataText: string;
          entityText: string;
        };
        readonly: {
          entityText: string;
          dataText: string;
        };
      };
    }
    interface EntityChildren {
      test: TestRichTextEntity;
    }
  }
}
const ModuleTester = ({ entityTypes = [] as Function[] }) =>
  Tester.beforeAll(async () => {
    const moduleRunner = new ModuleRunner();
    moduleRunner.getInstance(CliModule);
    moduleRunner.getInstance(TestDbModule);
    moduleRunner.getInstance(DataModule);
    const dbModule = moduleRunner.getInstance(DbModule);
    dbModule.entityTypes.addAll(findEntities(entityTypes));
    await dbModule.init();
    const data = moduleRunner.resolve(DataContext);

    return {
      data,
      moduleRunner,
      connection: dbModule.getConnection(),
    };
  });

const t = ModuleTester({ entityTypes: [RichTextDocument] }).beforeAll(
  async t => {
    const richTextModule = await t.moduleRunner.getInstance(RichTextModule);

    richTextModule.install(i => {
      i.defineEntity("test", {
        entityType: TestRichTextEntity,
        mutability: {
          MUTABLE: true,
        },
        unpackSelection: { pick: ["testText"] },
        packEntityKey: data => data.testKey,
        unpack: (_, row, data) => ({
          testKey: row.$key,
          entityText: row.testText,
          dataText: data,
        }),
        pack: (_, row, data) => data.dataText,
        unpackForReadonly: (_, row, data) => ({
          entityText: row.testText,
          dataText: data,
        }),
      });
    });

    await richTextModule.init();

    const session = await t.data.getSource(RequestSession).insert({
      token: "test",
      timeout: getCurrentTime() + SESSION_TIMEOUT,
    });
    Resolver.provide(
      t.moduleRunner.context,
      DataRow(RequestSession).provide(() => session)
    );
    const context = t.moduleRunner.resolve(RichTextContext);
    return {
      context,
      config: { context },
      testEntites: t.data.getSource(TestRichTextEntity),
      testEntityKey1: await t.data.getSource(TestRichTextEntity).insertKey({}),
    };
  }
);

const contentWithTestEntity = ({ testKey }) =>
  TestContent({
    blocks: [
      TestBlock({
        text: "hello world",
        entityRanges: [{ offset: 0, length: 1, key: 0 }],
      }),
    ],
    entityMap: {
      "0": {
        type: "test",
        mutability: "MUTABLE",
        data: {
          testKey,
        },
      },
    },
  });

const createContent = ({ testKeys = [] as string[] } = {}) =>
  TestContent({
    blocks: [
      TestBlock({
        text: testKeys.map(() => " ").join(""),
        entityRanges: testKeys.map((testKey, index) => ({
          offset: index,
          length: 1,
          key: index,
        })),
      }),
    ],
    entityMap: mapArrayToObject(testKeys, (testKey, index) => [
      String(index),
      {
        type: "test",
        mutability: "MUTABLE",
        data: {
          testKey,
        },
      },
    ]),
  });

const packWithTestEntity = ({ testKey }) =>
  t.context.pack(t.config, contentWithTestEntity({ testKey }));

let counter = 0;
const TestBlock = ({
  key = "x" + ++counter,
  depth = 0,
  type = "unstyled",
  text = "",
  inlineStyleRanges = [] as Draft.RawDraftInlineStyleRange[],
  entityRanges = [] as Draft.RawDraftEntityRange[],
} = {}) =>
  ({
    key,
    depth,
    type,
    text,
    inlineStyleRanges,
    entityRanges,
  } as const);

beforeEach(() => {
  counter = 0;
});
const TestContent = ({
  entityMap = {} as Record<number, Draft.RawDraftEntity>,
  blocks = [] as Draft.RawDraftContentBlock[],
} = {}) => ({ entityMap, blocks });

describe("packing", () => {
  it("expect to be resolved", () =>
    expectAsync(
      t.context.pack(
        t.config,
        TestContent({
          blocks: [TestBlock()],
        })
      )
    ).toBeResolved());

  it("expect to error because invalid block type", () =>
    expectAsync(
      t.context.pack(
        t.config,
        TestContent({
          blocks: [TestBlock({ type: "uknown" })],
        })
      )
    ).toBeRejected());

  it("expect to error because not-allowed style", () =>
    expectAsync(
      t.context.pack(
        t.config,
        TestContent({
          blocks: [
            TestBlock({
              type: "unstyled",
              text: "hello",
              inlineStyleRanges: [
                { style: "bad-style" as any, offset: 0, length: 1 },
              ],
            }),
          ],
        })
      )
    ).toBeRejected());

  it("expect to remove invalid entity ranges", async () => {
    const packed = await packWithTestEntity({ testKey: "invalid-key" });
    expect(packed.entityKeys.length).toEqual(0);
    expect(packed.entityMap).toEqual({});
    expect(packed.blocks).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          entityRanges: undefined,
        }),
      ])
    );
  });
  it("expect to be valid entity ranges", async () => {
    const packed = await packWithTestEntity({ testKey: t.testEntityKey1 });
    expect(packed.entityKeys.length).toEqual(1);
    expect(packed.entityMap).not.toEqual({});
    expect(packed.blocks).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          entityRanges: jasmine.objectContaining({
            length: 1,
          }),
        }),
      ])
    );
  });
});

it("expect to insert/update/delete entities", async () => {
  const testEntity1 = await t.testEntites.insert({});
  const testEntity2 = await t.testEntites.insert({});
  const testEntity3 = await t.testEntites.insert({});
  const docKey1 = await t.context.insertDocument(
    t.config,
    createContent({ testKeys: [testEntity1.$key, testEntity2.$key] })
  );
  const docKey2 = await t.context.insertDocument(
    t.config,
    createContent({ testKeys: [testEntity1.$key, testEntity2.$key] })
  );
  expect(await testEntity1.at("documents").getCountRows()).toEqual(2);
  expect(await testEntity2.at("documents").getCountRows()).toEqual(2);

  await t.context.updateDocument(
    t.config,
    docKey1,
    createContent({ testKeys: [testEntity2.$key, testEntity3.$key] })
  );
  expect(await testEntity1.at("documents").getCountRows()).toEqual(1);
  expect(await testEntity2.at("documents").getCountRows()).toEqual(2);
  expect(await testEntity3.at("documents").getCountRows()).toEqual(1);
  await t.context.deleteDocument(t.config, docKey1);

  expect(await testEntity1.at("documents").getCountRows()).toEqual(1);
  expect(await testEntity2.at("documents").getCountRows()).toEqual(1);
  expect(await t.testEntites.get(testEntity3.$key)).toBeFalsy();
});

import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import RichTextTester from "@dabsi/system/rich-text/tests/RichTextTester";
import {
  RTTestEntity1,
  RTTestEntity1Type,
} from "@dabsi/system/rich-text/tests/RTTestEntity1";

const t = RichTextTester(async ({ richTextModule }) => {
  richTextModule.install(i => {
    i.defineEntity(RTTestEntity1Type, {
      entityType: RTTestEntity1,
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
}).beforeAll(async () => {
  return {
    testEntites: t.data.getSource(RTTestEntity1),
    testEntityKey1: await t.data.getSource(RTTestEntity1).insertKey({}),
  };
});

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
  const docKey1 = await t.context.insert(
    t.config,
    createContent({ testKeys: [testEntity1.$key, testEntity2.$key] })
  );
  const docKey2 = await t.context.insert(
    t.config,
    createContent({ testKeys: [testEntity1.$key, testEntity2.$key] })
  );
  expect(await testEntity1.at("documents").getCountRows()).toEqual(2);
  expect(await testEntity2.at("documents").getCountRows()).toEqual(2);

  await t.context.update(
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

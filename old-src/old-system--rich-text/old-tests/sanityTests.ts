import notNull from "@dabsi/common/object/notNull";
import { Tester } from "@dabsi/jasmine/Tester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextPacker } from "@dabsi/system/rich-text/packer";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/makeContentWithEntity";
import { rtTestBuilders, rtTester } from "@dabsi/system/rich-text/tests/tester";
import { Resolver } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      "test-entity": DataType<
        { packedString: string },
        { unpackedString: string },
        { commonString: string }
      >;
    }
    interface BlockDataTypes {
      "test-block": DataType<
        { packedString: string },
        { unpackedString: string },
        { commonString: string }
      >;
    }
  }
}

rtTestBuilders.push(
  Resolver([RichTextModule], rtModule => {
    rtModule
      .defineEntity("test-entity", {
        readonlyKeys: ["commonString"],
        pack({ unpackedString }, { config }) {
          return {
            packedString: unpackedString,
            commonString: unpackedString,
          };
        },
        unpack({ packedString, commonString }, { config }) {
          return { unpackedString: packedString, commonString };
        },
      })
      .defineBlock("test-block", {
        readonlyKeys: ["commonString"],
        pack({ unpackedString }, { config }) {
          return {
            packedString: unpackedString,
            commonString: unpackedString,
          };
        },
        unpack({ packedString, commonString }, { config }) {
          return { unpackedString: packedString, commonString };
        },
      });
  })
);

const t = Tester.beforeAll(async () => {
  const t = rtTester;
  const config = t.configure({});

  let content = makeContentWithEntity({
    type: "test-entity",
    data: { unpackedString: "hello-entity", commonString: "hello-entity" },
  });

  const testBlockKey = "tb1";
  const docKey = await t.pack({
    ...content,
    blocks: [
      {
        type: "test-block",
        key: testBlockKey,
        depth: 0,
        text: " ",
        data: {
          unpackedString: "hello-block",
          commonString: "hello-block",
        },
        styleMap: {},
        styleRanges: [],
        entityRanges: [],
      },
      ...content.blocks,
    ],
  });

  const doc = notNull(await config.context.docs.fetchOrFail(docKey));
  const packedContent: RichTextContent.Packed = JSON.parse(doc.content);

  const {
    blocks: [packedBlock],
    entityMap: { 0: packedEntity },
  } = packedContent;

  const {
    blocks: [unpackedBlock],
    entityMap: { 0: unpackedEntity },
  } = await t.unpack(docKey, false);

  const {
    blocks: [readonlyBlock],
    entityMap: { 0: readonlyEntity },
  } = await t.unpack(docKey, true);

  return {
    packedEntity,
    packedBlock,
    unpackedBlock,
    unpackedEntity,
    readonlyBlock,
    readonlyEntity,
    packer: new RichTextPacker(config),
  };
});

it("expect to fix invalid align", async () => {
  expect(
    await t.packer.packBlock({
      type: "regular",
      text: " ",
      depth: 0,
      key: "xb1",
      styleMap: { align: <any>"INVALID" },
      styleRanges: [],
      entityRanges: [],

      data: {},
    })
  ).toEqual(
    jasmine.objectContaining({
      styleMap: {},
    })
  );
});

describe("expect to", () => {
  describe("entity", () => {
    it("packed data", () => {
      expect(t.packedEntity.data).toEqual({
        packedString: "hello-entity",
        commonString: "hello-entity",
      });
    });

    it("unpack data", () => {
      expect(t.unpackedEntity.data).toEqual({
        unpackedString: "hello-entity",
        commonString: "hello-entity",
      });
    });

    it("readonly data", () => {
      expect(<any>t.readonlyEntity.data).toEqual({
        commonString: "hello-entity",
      });
    });
  });
  describe("block", () => {
    it("packed data", () => {
      expect(t.packedBlock.data).toEqual({
        packedString: "hello-block",
        commonString: "hello-block",
      });
    });

    it("unpacked data", () => {
      expect(t.unpackedBlock.data).toEqual({
        unpackedString: "hello-block",
        commonString: "hello-block",
      });
    });

    it("readonly data", () => {
      expect(<any>t.readonlyBlock.data).toEqual({
        commonString: "hello-block",
      });
    });
  });
});

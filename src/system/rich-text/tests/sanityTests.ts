import { Tester } from "@dabsi/jasmine/Tester";
import RichTextModule from "@dabsi/system/rich-text";
import { RichTextContent } from "@dabsi/system/rich-text/content";

import {
  rtTester as t,
  rtTestModules,
} from "@dabsi/system/rich-text/tests/tester";
import { makeContentWithEntity } from "@dabsi/system/rich-text/tests/utils";
import { Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface EntityDataTypes {
      "test-entity": EntityDataType<
        { packedString: string },
        { unpackedString: string },
        { commonString: string }
      >;
    }
    interface BlockDataTypes {
      "test-block": BlockDataType<
        { packedString: string },
        { unpackedString: string },
        { commonString: string }
      >;
    }
  }
}
@Module()
class TestModule {
  constructor(protected rtModule: RichTextModule) {
    rtModule
      .defineEntity("test-entity", {
        readonlyKeys: ["commonString"],
        pack({ config }, { unpackedString }) {
          return { packedString: unpackedString, commonString: unpackedString };
        },
        unpack({ config }, { packedString, commonString }) {
          return { unpackedString: packedString, commonString };
        },
      })
      .defineBlock("test-block", {
        readonlyKeys: ["commonString"],
        pack({ config }, { unpackedString }) {
          return { packedString: unpackedString, commonString: unpackedString };
        },
        unpack({ config }, { packedString, commonString }) {
          return { unpackedString: packedString, commonString };
        },
      });
  }
}
rtTestModules.push(TestModule);

const t2 = Tester.beforeAll(async () => {
  const { context } = t.configure({});

  let content = makeContentWithEntity({
    type: "test-entity",
    mutability: "IMMUTABLE",
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
          styles: {},
        },
        inlineStyleRanges: [],
        entityRanges: [],
      },
      ...content.blocks,
    ],
  });

  const doc = await context.docs.getOrFail(docKey);
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
  };
});

describe("expect to", () => {
  describe("entity", () => {
    it("packed data", () => {
      expect(t2.packedEntity.data).toEqual({
        packedString: "hello-entity",
        commonString: "hello-entity",
      });
    });

    it("unpack data", () => {
      expect(t2.unpackedEntity.data).toEqual({
        unpackedString: "hello-entity",
        commonString: "hello-entity",
      });
    });

    it("readonly data", () => {
      expect(<any>t2.readonlyEntity.data).toEqual({
        commonString: "hello-entity",
      });
    });
  });
  describe("block", () => {
    it("packed data", () => {
      expect(t2.packedBlock.data).toEqual({
        packedString: "hello-block",
        commonString: "hello-block",
      });
    });

    it("unpacked data", () => {
      expect(t2.unpackedBlock.data).toEqual({
        unpackedString: "hello-block",
        commonString: "hello-block",
        styles: {},
      });
    });

    it("readonly data", () => {
      expect(<any>t2.readonlyBlock.data).toEqual({
        commonString: "hello-block",
        styles: {},
      });
    });
  });
});

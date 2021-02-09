import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Tester } from "@dabsi/jasmine/Tester";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

describe("change block type:", () => {
  const t = Tester.beforeAll(() => {
    const regularBlock = {
      type: "regular",
      text: " ",
      depth: 0,
      data: {},
      inlineStyleRanges: [],
      entityRanges: [],
    };

    let state = EditorState.createWithContent(
      convertFromRaw({
        blocks: [
          {
            ...regularBlock,
            key: "regular-k",
            data: {
              "block-regular": "hello",
              "style-align": "LEFT",
            },
          },
          {
            ...regularBlock,
            key: "atomic-k",
            type: "atomic",
            data: {
              "block-atomic": "hello",
            },
          },
        ],
        entityMap: {},
      })
    );
    const store = new RichTextStore(
      () => state,
      nextState => {
        state = nextState;
      }
    );

    store.selectAll();

    store.applyList("ordered");

    const content = convertToRaw(state.getCurrentContent());
    const blockMap = mapArrayToObject(content.blocks, block => [
      block.key,
      block,
    ]);

    return {
      content,
      blockMap,
      regularBlock: blockMap["regular-k"],
      atomicBlock: blockMap["atomic-k"],
    };
  });

  it("expect atomic block will be without changes", () => {
    expect(t.atomicBlock.type).toEqual("atomic");
    expect(t.atomicBlock.data).toEqual({ ["block-atomic"]: "hello" });
  });

  it("expect to delete regular block data", () => {
    expect(t.regularBlock.data).not.toContain("block-regular");
  });

  it("expect to change regular to list block", () => {
    expect(t.regularBlock.type).toEqual("list");
    expect(t.regularBlock.data).toEqual(
      jasmine.objectContaining({ ["block-list"]: { type: "ordered" } })
    );
  });

  it("expect to style align in regular block", () => {
    expect(t.regularBlock.data).toEqual(
      jasmine.objectContaining({
        ["style-align"]: "LEFT",
      })
    );
  });
});

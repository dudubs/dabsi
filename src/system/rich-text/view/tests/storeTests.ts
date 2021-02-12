import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import { RichTextStore } from "@dabsi/system/rich-text/view/store";
import { convertFromRaw, EditorState } from "draft-js";

const regularBlock = {
  type: "regular",
  text: " ",
  depth: 0,
  data: {},
  inlineStyleRanges: [],
  entityRanges: [],
};

const TestContentState = ({
  blocks = [] as Draft.RawDraftContentBlock[],
  entityMap = {} as Record<string, Draft.RawDraftEntity>,
}) => ({ blocks, entityMap });

let blockKeyCounter = 0;
beforeEach(() => {
  blockKeyCounter = 0;
});

const TestContentBlock = ({
  type = "regular",
  text = "",
  key = `k-${++blockKeyCounter}`,
  depth = 0,
  inlineStyleRanges = [] as Draft.RawDraftInlineStyleRange[],
  entityRanges = [] as Draft.RawDraftEntityRange[],
  data = {},
} = {}): Draft.RawDraftContentBlock => ({
  type,
  text,
  key,
  depth,
  inlineStyleRanges,
  entityRanges,
  data,
});

fdescribe("insertBlocks", () => {
  const text = "01234567890";

  let store: RichTextStore;

  const getBlockTexts = () =>
    store
      .getRawContent()
      .blocks.map(b => b.text)
      .join("\n");
  beforeEach(() => {
    store = createTestStore(
      TestContentState({
        blocks: [
          TestContentBlock({ text, key: "sk0" }),
          TestContentBlock({ text, key: "sk1" }),
          TestContentBlock({ text, key: "sk2" }),
        ],
      })
    );
  });

  it("expect to insert block before", () => {
    store.select({ anchorKey: "sk1" });
    store.insertBlocks([{ text: "new1" }]);
    expect(getBlockTexts()).toEqual([text, "new1", text, text].join("\n"));

    store.insertBlocks([{ text: "new2" }]);
    expect(getBlockTexts()).toEqual(
      [text, "new1", "new2", text, text].join("\n")
    );
  });
  it("expect to insert block after", () => {
    store.select({ anchorKey: "sk1", anchorOffset: text.length });
    store.insertBlocks([{ text: "new1" }]);
    expect(getBlockTexts()).toEqual([text, text, "new1", text].join("\n"));

    store.insertBlocks([{ text: "new2" }]);
    expect(getBlockTexts()).toEqual(
      [text, text, "new1", "new2", text].join("\n")
    );
  });
  it("expect to insert to split", () => {
    store.select({
      anchorKey: "sk1",
      anchorOffset: 5,
    });
    store.insertBlocks([{ text: "new1" }]);
    expect(getBlockTexts()).toEqual(
      [text, text.substr(0, 5), "new1", text.substr(5), text].join("\n")
    );
    store.insertBlocks([{ text: "new2" }]);
    expect(getBlockTexts()).toEqual(
      [text, text.substr(0, 5), "new1", "new2", text.substr(5), text].join("\n")
    );
  });

  it("expect to split middle of line", () => {
    store.select({
      anchorKey: "sk1",
      anchorOffset: 4,
      focusOffset: 6,
    });
    store.insertBlocks([{ text: "new1" }]);
    expect(getBlockTexts()).toEqual(
      [text, text.substr(0, 4), "new1", text.substr(6), text].join("\n")
    );
    store.insertBlocks([{ text: "new2" }]);
    expect(getBlockTexts()).toEqual(
      [text, text.substr(0, 4), "new1", "new2", text.substr(6), text].join("\n")
    );
  });
  it("expect to split between blocks", () => {
    store.select({
      anchorKey: "sk0",
      anchorOffset: 4,
      focusKey: "sk2",
      focusOffset: 6,
    });
    store.insertBlocks([{ text: "new1" }]);
    expect(getBlockTexts()).toEqual(
      [text.substr(0, 4), "new1", text.substr(6)].join("\n")
    );
    store.insertBlocks([{ text: "new2" }]);
    expect(getBlockTexts()).toEqual(
      [text.substr(0, 4), "new1", "new2", text.substr(6)].join("\n")
    );
  });
});

describe("change block type:", () => {
  const t = Tester.beforeAll(() => {
    const store = createTestStore({
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
    });

    store.selectAll();

    store.applyList("ordered");

    const rawContent = store.getRawContent();
    const blockMap = mapArrayToObject(rawContent.blocks, block => [
      block.key,
      block,
    ]);

    return {
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
function createTestStore(
  contentState: Draft.RawDraftContentState
): RichTextStore {
  let state = EditorState.createWithContent(convertFromRaw(contentState));
  return new RichTextStore(
    () => state,
    nextState => {
      state = nextState;
    }
  );
}

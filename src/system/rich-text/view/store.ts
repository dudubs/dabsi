import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { OmitParameter } from "@dabsi/common/typings2/Fn";
import {
  CharacterMetadata,
  ContentBlock,
  ContentState,
  convertToRaw,
  EditorState,
  genKey,
  Modifier,
  SelectionState,
} from "draft-js";
import Immutable from "immutable";
import "./extra";

export class RichTextStore {
  constructor(
    protected getter: () => EditorState,
    protected setter: (state: EditorState) => void
  ) {}

  get state(): EditorState {
    return this.getter();
  }

  set state(value: EditorState) {
    this.setter(value);
  }

  get content(): ContentState {
    return this.state.getCurrentContent();
  }

  get selection(): SelectionState {
    const selection = this.state.getSelection();
    // if (!selection) {
    //   return SelectionState.createEmpty(this.content.getFirstBlock().getKey());
    // }
    return selection;
  }

  get isSomeBlockSelection() {
    return this.selection.getAnchorKey() === this.selection.getFocusKey();
  }

  call<
    K extends ExtractKeys<
      typeof EditorState,
      (editorState: EditorState, ...args: any[]) => void
    >
  >(
    method: K,
    ...args: OmitParameter<typeof EditorState[K]>
  ): ReturnType<typeof EditorState[K]> {
    return (EditorState[method] as any)(this.state, ...args);
  }

  update<
    K extends ExtractKeys<
      typeof EditorState,
      (editorState: EditorState, ...args: any[]) => EditorState
    >
  >(method: K, ...args: OmitParameter<typeof EditorState[K]>): this {
    this.state = (EditorState[method] as any)(this.state, ...args);
    return this;
  }

  getCurrentBlockData(blockType = this.currentBlock.getType()) {
    return this.currentBlock.get("data").get("block-" + blockType);
  }

  get currentListType() {
    return this.getCurrentBlockData("list")?.type;
  }

  applyHeader(level: number) {
    this.updateBlocks("change-block-type", block => {
      block
        .set("type", level ? "header" : "regular")
        .update("data", data =>
          !level
            ? data
            : data.update("block-header", data => ({ ...data, level }))
        );
    });
  }
  applyList(listType) {
    const toggle = this.currentListType === listType;
    this.updateBlocks("change-block-type", block => {
      block
        .set("type", toggle ? "regular" : "list")
        .update("data", data =>
          toggle
            ? data
            : data.update("block-list", data => ({ ...data, type: listType }))
        );
    });
  }

  adjustDepth(add: number, maxDepth: number) {
    this.updateBlocks("adjust-depth", block =>
      block.update("depth", depth =>
        Math.max(0, Math.min(maxDepth, depth + add))
      )
    );
  }

  get currentBlock(): Draft.ContentBlock {
    return this.content.getBlockForKey(this.selection.getStartKey());
  }

  get store(): RichTextStore {
    return this;
  }
  get blockBefore(): Draft.ContentBlock | undefined {
    return this.content.getBlockBefore(this.selection.getStartKey());
  }

  get blockAfter(): Draft.ContentBlock | undefined {
    return this.content.getBlockAfter(this.selection.getEndKey());
  }

  get blockBeforeOrAfter(): Draft.ContentBlock | undefined {
    return this.blockBefore || this.blockAfter;
  }

  get currentHeaderLevel(): number | undefined {
    return this.currentBlock.getData().get("block-header")?.level;
  }

  get currentAlign() {
    return this.currentBlock.getData().get("style-align");
  }

  applyAlignment(align: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFY") {
    const toggle = this.currentAlign === align;
    this.updateBlocks("change-block-data", block =>
      block.update("data", data =>
        toggle ? data.delete("style-align") : data.set("style-align", align)
      )
    );
  }

  get currentDirection() {
    return this.currentBlock.getData().get("style-direction");
  }

  applyDirection(direction) {
    const remove = this.currentDirection == direction;
    this.updateBlocks("change-block-data", block =>
      block.update("data", data =>
        remove
          ? data.delete("style-direction")
          : data.set("style-direction", direction)
      )
    );
  }

  selectAll() {
    this.update(
      "forceSelection",
      <any>(
        SelectionState.createEmpty(this.content.getFirstBlock().getKey())
          .set("focusKey", this.content.getLastBlock().getKey())
          .set("focusOffset", this.content.getLastBlock().getText().length)
      )
    );
  }
  updateBlocks(
    changeType: Draft.EditorChangeType,
    callback: (block: Draft.ContentBlock) => void
  ) {
    const { selection } = this;
    this.update("push", this.mapBlocks(callback), changeType);
    this.update("forceSelection", selection);
  }

  mapBlocks(
    updateBlock: (block: Draft.ContentBlock) => void
  ): Draft.ContentState {
    const { selection, content } = this;

    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();
    let isStarted = false;
    let isEnded = false;

    const getNextBlock = (block: Draft.ContentBlock) => {
      const newBlock = block.asMutable();

      updateBlock(newBlock as any);
      const isNewBlockType = newBlock.get("type") !== block.getType();
      const isAtomicBlock = block.getType() === "atomic";
      // can't change block type & data of atomic block.
      if (isNewBlockType && isAtomicBlock) {
        return block;
      }

      isNewBlockType &&
        newBlock.update("data", data =>
          data.delete("block-" + block.getType())
        );

      return newBlock.asImmutable();
    };

    return content.update("blockMap", bm => {
      if (startKey === endKey) {
        return bm.update(startKey, getNextBlock);
      }
      return bm.map(b => {
        if (isEnded) return b;
        if (isStarted) {
          isEnded = b.getKey() === endKey;
          return getNextBlock(b);
        } else {
          if ((isStarted = b.getKey() === startKey)) {
            return getNextBlock(b);
          }
        }
        return b;
      });
    }) as any;
  }

  insertBlocks(
    newRawBlocks: {
      type?: string;
      text?: string;
      key?: string;
      entity?: string;
      style?: string[];
    }[],
    content = this.content
  ): this {
    if (!newRawBlocks.length) return this;

    const newBlocks: ContentBlock[] = newRawBlocks.map(
      ({ type = "regular", text = "", key = genKey(), entity, style }) => {
        return new ContentBlock({
          type,
          text,
          key,
          characterList: Immutable.List(
            Immutable.Repeat(
              CharacterMetadata.create({
                ...(entity ? { entity } : null),
                ...(style ? { style: Immutable.Set(style) } : null),
              }),
              text.length
            )
          ),
        });
      }
    );
    const newBlocksEntries: [string, ContentBlock][] = newBlocks.map(block => [
      block.getKey(),
      block,
    ]);

    let afterBlockKey: string | null = null;
    let beforeBlockKey: string | null = null;

    const splitAndInsertAfter = () => {
      content = Modifier.splitBlock(content, this.selection);
      afterBlockKey = this.selection.getAnchorKey();
    };

    if (this.selection.isSomeBlock) {
      if (this.selection.isSomeOffset) {
        if (
          // is start of line
          this.selection.getAnchorOffset() === 0
        ) {
          beforeBlockKey = this.selection.getAnchorKey();
        } else if (
          // is end of line
          this.selection.getEndOffset() === this.currentBlock.getText().length
        ) {
          afterBlockKey = this.selection.getAnchorKey();
        } else {
          // in middle
          splitAndInsertAfter();
        }
      } else {
        // between characters
        splitAndInsertAfter();
      }
    } else {
      // between blocks
      splitAndInsertAfter();
    }

    content = <any>content.update("blockMap", blockMap =>
      blockMap.flatMap((block, key) => {
        if (afterBlockKey && key === afterBlockKey) {
          return [[key, block], ...newBlocksEntries];
        }
        if (beforeBlockKey && key === beforeBlockKey) {
          return [...newBlocksEntries, [key, block]];
        }
        return [[key, block]];
      })
    );

    this.update("push", content, "insert-fragment");
    const lastBlock = newBlocks[newBlocksEntries.length - 1];

    this.select({
      anchorKey: lastBlock.getKey(),
      endOfAnchor: true,
    });

    return this;
  }

  insertAtomicBlock(
    type: string,
    mutability: Draft.DraftEntityMutability,
    data
  ): this {
    let content = this.content.createEntity(type, mutability, data);
    const entityKey = content.getLastCreatedEntityKey();

    this.insertBlocks(
      [{ type: "atomic", text: " ", entity: entityKey }],
      content
    );

    return this;
  }

  getRawContent(): Draft.RawDraftContentState {
    return convertToRaw(this.content);
  }

  deleteCurrentBlock(): this {
    const { currentBlock } = this;
    this.selectBeforeOrAfter();

    const {
      selection: { endKey },
    } = this;

    this.update(
      "push",
      this.content.flatMapBlocks(block =>
        block.getKey() === currentBlock.getKey() ? [] : [block]
      ),
      "remove-range"
    );

    this.select({ anchorKey: endKey, endOfAnchor: true });
    return this;
  }

  select({
    anchorKey = this.currentBlock.getKey(),
    endOfAnchor = false,
    endOfFocus = false,
    anchorOffset = endOfAnchor
      ? this.content.getBlockForKey(anchorKey).getLength()
      : 0,
    focusKey = anchorKey,
    focusOffset = endOfFocus
      ? this.content.getBlockForKey(focusKey).getLength()
      : anchorOffset,
  }): this {
    return this.update(
      "forceSelection",
      new SelectionState({
        anchorKey,
        anchorOffset,
        focusKey,
        focusOffset,
      })
    );
  }

  selectBeforeOrAfter(): this {
    const { blockBeforeOrAfter } = this;
    if (!blockBeforeOrAfter) {
      const key = genKey();
      return this.select({ anchorOffset: 0 }).insertBlocks([{ key }]);
    } else {
      return this.select({
        anchorKey: blockBeforeOrAfter.getKey(),
        endOfAnchor: true,
      });
    }
    return this;
  }
}

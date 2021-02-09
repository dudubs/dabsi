import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { OmitParameter } from "@dabsi/common/typings2/Fn";
import {
  AtomicBlockUtils,
  ContentState,
  EditorState,
  Modifier,
  SelectionState,
} from "draft-js";

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
    return this.state.getSelection();
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

  modifierCall<
    K extends ExtractKeys<
      typeof Modifier,
      (content: ContentState, ...args: any[]) => void
    >
  >(
    method: K,
    ...args: OmitParameter<typeof Modifier[K]>
  ): ReturnType<typeof Modifier[K]> {
    return (Modifier[method] as any)(this.content, ...args);
  }

  setBlockType(blockType: string) {
    const { selection } = this;
    this.update(
      "push",
      this.modifierCall("setBlockType", selection, blockType),
      "change-block-type"
    );
    this.update("forceSelection", selection);
  }

  getCurrentBlockData(blockType = this.currentBlock.getType()) {
    return this.currentBlock.get("data").get("block-" + blockType);
  }

  get currentListType() {
    return this.getCurrentBlockData("list")?.type;
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

  applyAlignment(align) {
    const { currentBlock } = this;
    const remove = align === "JUSTIFY";
    this.updateBlocks("change-block-data", block =>
      block.update("data", data =>
        remove ? data.delete("align") : data.set("align", align)
      )
    );
  }

  applyDirection(direction) {
    const { currentBlock } = this;
    const remove = currentBlock.getData().get("direction") == direction;
    this.updateBlocks("change-block-data", block =>
      block.update("data", data =>
        remove ? data.delete("direction") : data.set("direction", direction)
      )
    );
  }

  applyHeader(level: number) {
    this.updateBlocks("change-block-type", block => {
      block
        .set("type", level ? "header" : "regular")
        .update("data", data =>
          level ? data.set("level", level) : data.delete("level")
        );
    });
  }

  updateBlocks(
    changeType: Draft.EditorChangeType,
    callback: (block: Draft.ContentBlock) => any
  ) {
    const { selection } = this;
    this.update("push", this.mapBlocks(callback), changeType);
    this.update("forceSelection", selection);
  }

  mapBlocks(
    getNextBlock: (block: Draft.ContentBlock) => any
  ): Draft.ContentState {
    const { selection, content } = this;

    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();
    let isStarted = false;
    let isEnded = false;

    const getNextBlockWrapped = (block: Draft.ContentBlock) => {
      const nextBlock = getNextBlock(block.asMutable() as any);
      const nextBlockType = nextBlock.getType();

      const isSomeBlockType = nextBlockType === block.getType();
      // can't change block type & data of atomic block.
      if (block.getType() === "atomic" && !isSomeBlockType) {
        return block;
      }

      nextBlock.update("data", data => data.delete("block-" + block.getType()));

      return nextBlock.asImuutable();
    };

    return content.update("blockMap", bm => {
      if (startKey === endKey) {
        return bm.update(startKey, getNextBlockWrapped);
      }
      return bm.map(b => {
        if (isEnded) return b;
        if (isStarted) {
          isEnded = b.getKey() === endKey;
          return getNextBlockWrapped(b);
        } else {
          if ((isStarted = b.getKey() === startKey)) {
            return getNextBlockWrapped(b);
          }
        }
        return b;
      });
    }) as any;
  }

  insertAtomicBlock(
    type: string,
    mutability: Draft.DraftEntityMutability,
    data
  ) {
    const contentState = this.content.createEntity(type, mutability, data);
    const entityKey = contentState.getLastCreatedEntityKey();
    this.state = AtomicBlockUtils.insertAtomicBlock(this.state, entityKey, " ");
    this.update("forceSelection", this.content.getSelectionAfter());
  }
}

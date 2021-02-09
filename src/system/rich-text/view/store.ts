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

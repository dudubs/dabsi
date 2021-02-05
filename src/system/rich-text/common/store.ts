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
    // console.log(selection.toJS());

    this.update(
      "push",
      this.modifierCall("setBlockType", selection, blockType),
      "change-block-type"
    );
    this.update("forceSelection", selection);
  }

  adjustDepth(add: number, maxDepth: number) {
    this.updateSelectionBlocks("adjust-depth", block =>
      block.update("depth", depth =>
        Math.max(0, Math.min(maxDepth, depth + add))
      )
    );
  }

  get startBlock(): Draft.ContentBlock {
    return this.content.getBlockForKey(this.selection.getStartKey());
  }

  applyAlignment(align) {
    const { startBlock } = this;
    const remove = align === "JUSTIFY";
    this.updateSelectionBlocks("change-block-data", block =>
      block.update("data", data =>
        remove ? data.delete("align") : data.set("align", align)
      )
    );
  }

  applyDirection(direction) {
    const { startBlock } = this;
    const remove = startBlock.getData().get("direction") == direction;
    this.updateSelectionBlocks("change-block-data", block =>
      block.update("data", data =>
        remove ? data.delete("direction") : data.set("direction", direction)
      )
    );
  }

  updateSelectionBlocks(
    changeType: Draft.EditorChangeType,
    callback: (block: Draft.ContentBlock) => any
  ) {
    const { selection } = this;
    this.update("push", this.mapSelectionBlocks(callback), changeType);
    this.update("forceSelection", selection);
  }

  mapSelectionBlocks(
    callback: (block: Draft.ContentBlock) => any
  ): Draft.ContentState {
    const { selection, content } = this;

    const startKey = selection.getStartKey();
    const endKey = selection.getEndKey();
    let isStarted = false;
    let isEnded = false;

    return content.update("blockMap", bm => {
      if (startKey === endKey) {
        return bm.update(startKey, callback);
      }

      return bm.map(b => {
        if (isEnded) return b;

        if (isStarted) {
          isEnded = b.getKey() === endKey;
          return callback(b);
        } else {
          if ((isStarted = b.getKey() === startKey)) {
            return callback(b);
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

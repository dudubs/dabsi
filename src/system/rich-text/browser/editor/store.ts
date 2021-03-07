import mapBetween from "@dabsi/common/iterator/mapBetween";
import takeBetween from "@dabsi/common/iterator/takeBetween";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { OmitParameter } from "@dabsi/common/typings2/Fn";
import { Union } from "@dabsi/common/typings2/Union";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
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

declare global {
  namespace IRichText {
    interface Store {}
  }
}

export interface RichTextStore extends IRichText.Store {}
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
    const remove = this.currentListType === listType || !listType;
    this.updateBlocks("change-block-type", block => {
      block
        .set("type", remove ? "regular" : "list")
        .update("data", data =>
          remove
            ? data
            : data.update("block-list", data => ({ ...data, type: listType }))
        );
    });
  }

  applyLayout(layout: RichTextBlock.UnpackedStyle<"layout"> | null) {
    const remove = !layout || layout === "BLOCK";
    this.updateBlocks("change-block-data", block => {
      block.update("data", data =>
        remove ? data.delete("style-layout") : data.set("style-layout", layout)
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

  getCurrentStyle(style): any {
    return this.currentBlock.getData().get("style-" + style);
  }

  getCurrentBlockData<T extends RichTextBlock.Type>(
    blockType: T
  ): RichTextBlock.UnpackedData<T> | undefined {
    return this.currentBlock.get("data").get("block-" + blockType);
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

  applyAlignment(align: "LEFT" | "RIGHT" | "CENTER" | "JUSTIFY" | null) {
    const clear = !align || this.currentAlign === align;
    this.updateBlocks("change-block-data", block =>
      block.update("data", data =>
        clear ? data.delete("style-align") : data.set("style-align", align)
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

  // StoreQuery
  mapBlocks(
    updateBlock: (block: Draft.ContentBlock) => void
  ): Draft.ContentState {
    const {
      selection: { startKey, endKey },
      content,
    } = this;

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

    return content.update("blockMap", blockMap => {
      return Immutable.OrderedMap(
        Immutable.Seq.Indexed<Draft.ContentBlock>(
          mapBetween(
            (blockMap as Immutable.OrderedMap<
              string,
              Draft.ContentBlock
            >).values(),
            b => b.key === startKey,
            b => b.key === endKey,
            b => getNextBlock(b)
          )
        ).map(b => [b!.key, b])
      );
    }) as any;
  }

  updateBlockData<T extends RichTextBlock.Type>(
    type: T,
    blockKey: string,
    callback: (
      data: RichTextBlock.UnpackedData<T>
    ) => RichTextBlock.UnpackedData<T>
  ): this {
    const block = this.content.getBlockForKey(blockKey);
    if (block.type !== type) {
      console.warn(`expect to block-type "${type}".`);
      return this;
    }

    return this.update(
      "push",
      <any>this.content.update("blockMap", blockMap =>
        blockMap.set(
          blockKey,
          block.update("data", data =>
            data.update("block-" + type, data => callback(data))
          )
        )
      ),
      "change-block-data"
    );
  }

  insertBlocks(
    newRawBlocks: Union<
      {
        [K in RichTextBlock.Type]: {
          type?: K;
          text?: string;
          key?: string;
          entity?: string;
          style?: string[];
          data?: RichTextBlock.UnpackedData<K>;
        };
      }
    >[],
    content = this.content
  ): this {
    if (!newRawBlocks.length) return this;

    const newBlocks: ContentBlock[] = newRawBlocks.map(
      ({
        type = "regular",
        text = " ",
        key = genKey(),
        entity,
        style,
        data,
      }) => {
        return new ContentBlock({
          type,
          text,
          key,
          data: Immutable.Map({
            ["block-" + type]: data,
          }),
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
      afterBlockKey = anchorKey;
    };

    const {
      selection: {
        isSomeBlock,
        isSomeOffset,
        anchorOffset,
        endOffset,
        anchorKey,
      },
    } = this;

    if (isSomeBlock) {
      if (isSomeOffset) {
        if (anchorOffset === 0) {
          // is start of line
          beforeBlockKey = anchorKey;
        } else if (endOffset === this.currentBlock.getText().length) {
          // is end of line
          afterBlockKey = anchorKey;
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

  @StoreQuery()
  get rawContent(): Draft.RawDraftContentState {
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
      ? this.content.getBlockForKey(anchorKey)?.getLength() || 0
      : 0,
    focusKey = anchorKey,
    focusOffset = endOfFocus
      ? this.content.getBlockForKey(focusKey)?.getLength() || 0
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

  getEntityAt(
    blockKey: string,
    offset: number
  ): Draft.EntityInstance | undefined {
    const block = this.content.getBlockForKey(blockKey);
    if (!block) return;
    const entityKey = block.getEntityAt(offset);
    if (!entityKey) return;
    return this.content.getEntity(entityKey);
  }

  @StoreQuery()
  get selectedBlocks(): Draft.ContentBlock[] {
    const {
      selection: { startKey, endKey },
    } = this;
    return [
      ...takeBetween(
        this.content.getBlockMap().values(),
        b => b.key === startKey,
        b => b.key === endKey
      ),
    ];
  }
}

function StoreQuery() {
  return (target: { state: object }, propertyName, desc) => {
    const map = new WeakMap();
    const { get } = desc;
    desc.get = function (this: { state: object }) {
      return map.touch(this.state, () => get.call(this));
    };
  };
}

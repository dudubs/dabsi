import definePrototype from "@dabsi/common/class/definePrototype";
import { SelectionState } from "draft-js";

declare module "draft-js" {
  interface SelectionState {
    anchorKey: string;
    anchorOffset: number;
    focusKey: string;
    focusOffset: number;
    startKey: string;
    startOffset: number;
    endKey: string;
    endOffset: number;
    isSomeBlock: boolean;
    isSomeOffset: boolean;
    isSomeBlockAndOffset: boolean;
  }
  namespace SelectionState {
    function create(config: {
      anchorKey: string;
      anchorOffset?: number;
      focusKey?: string;
      focusOffset?: number;
    }): SelectionState;
  }
}

definePrototype(SelectionState, {
  get anchorKey(): string {
    return this.getAnchorKey();
  },
  get anchorOffset(): number {
    return this.getAnchorOffset();
  },
  get focusKey(): string {
    return this.getFocusKey();
  },
  get focusOffset(): number {
    return this.getFocusOffset();
  },
  get startKey(): string {
    return this.getStartKey();
  },
  get startOffset(): number {
    return this.getStartOffset();
  },
  get endKey(): string {
    return this.getEndKey();
  },
  get endOffset(): number {
    return this.getEndOffset();
  },
  get isSomeBlock(): boolean {
    return this.anchorKey === this.focusKey;
  },
  get isSomeOffset(): boolean {
    return this.anchorOffset === this.focusOffset;
  },
  get isSomeBlockAndOffset() {
    return this.isSomeBlock && this.isSomeOffset;
  },
});

SelectionState.create = function ({
  anchorKey,
  anchorOffset = 0,
  focusKey = anchorKey,
  focusOffset = anchorOffset,
}) {
  return new this({ anchorKey, anchorOffset, focusKey, focusOffset });
};

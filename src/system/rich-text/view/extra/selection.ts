import extend from "@dabsi/common/function/extend";
import { SelectionState } from "draft-js";

declare module "draft-js" {
  interface SelectionState extends _Extra {}
  namespace SelectionState {
    function create(config: {
      anchorKey: string;
      anchorOffset?: number;
      focusKey?: string;
      focusOffset?: number;
    }): SelectionState;
  }
}

export class _Extra extends extend(SelectionState, {
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
}) {}

SelectionState.create = function ({
  anchorKey,
  anchorOffset = 0,
  focusKey = anchorKey,
  focusOffset = anchorOffset,
}) {
  return new this({ anchorKey, anchorOffset, focusKey, focusOffset });
};

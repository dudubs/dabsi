import { SelectionState } from "draft-js";

export function createSelectionState(
  startKey: string,
  { endKey = startKey, startOffset = 0, endOffset = startOffset } = {}
): SelectionState {
  return new SelectionState({
    anchorKey: startKey,
    anchorOffset: startOffset,
    focusKey: endKey,
    focusOffset: endOffset,
  });
}

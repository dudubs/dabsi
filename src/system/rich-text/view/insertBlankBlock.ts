import { ContentState } from "draft-js";

export default function insertBlankBlock(
  contentState: ContentState,
  where: "after" | "before",
  blockKey: string
) {
  const newBlock = ContentState.createFromText(" ").getFirstBlock();
  return ContentState.createFromBlockArray(
    contentState.getBlocksAsArray().flatMap(block => {
      if (blockKey === block.getKey()) {
        if (where === "after") {
          return [block, newBlock];
        }
        return [newBlock, block];
      }
      return [block];
    })
  );
}

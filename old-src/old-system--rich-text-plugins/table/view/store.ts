import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { genKey } from "draft-js";
import { Range } from "immutable";

declare global {
  namespace IRichText {
    interface Store {
      insertTableRow(blockKey: string);
      insertTable(rows?: number, columns?: number): RichTextStore;
    }
  }
}

const createEmptyCell = (): RichTextBlock.UnpackedData<"table">["cells"][number] => ({
  key: genKey(),
  content: RichTextContent.createEmpty(" "),
});

RichTextStore.prototype.insertTableRow = function (blockKey: string) {
  return this.updateBlockData("table", blockKey, data => ({
    ...data,
    cells: [
      ...data.cells,
      ...Range(0, data.columns)
        .map(() => createEmptyCell())
        .toArray(),
    ],
  }));
};

RichTextStore.prototype.insertTable = function (
  rows = 3,
  columns = 3
): RichTextStore {
  return this.insertBlocks([
    {
      type: "table",
      data: {
        cells: Range(0, rows * columns)
          .map(i => createEmptyCell())
          .toArray(),
        columns: 3,
      },
    },
  ]);
};

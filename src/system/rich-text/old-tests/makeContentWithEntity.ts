import { RichTextContent } from "@dabsi/system/rich-text/common/content";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";

export function makeContentWithEntity(
  entity: RichTextEntity.Unpacked
): RichTextContent.Unpacked {
  return {
    blocks: [
      {
        key: "b1",
        text: " ",
        type: "regular",
        depth: 0,
        styleRanges: [],
        entityRanges: [[0, 0, 1]],
        data: {},
        styleMap: {},
      },
    ],
    entityMap: {
      0: entity,
    },
  };
}

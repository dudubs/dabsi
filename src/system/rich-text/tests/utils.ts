import { RichTextContent } from "@dabsi/system/rich-text/content";
import { RichTextEntity } from "@dabsi/system/rich-text/contentEntity";

export function makeContentWithEntity(
  entity: RichTextEntity.Unpacked
): RichTextContent.Unpacked {
  return {
    blocks: [
      {
        key: "b1",
        text: " ",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ key: 0, offset: 0, length: 1 }],
        data: { styles: {} },
      },
    ],
    entityMap: {
      0: entity,
    },
  };
}

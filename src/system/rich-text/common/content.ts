import { RichTextBlock } from "@dabsi/system/rich-text/common/block";
import { RichTextEntity } from "@dabsi/system/rich-text/common/entity";
import { genKey } from "draft-js";

// get entity mutablility by client
export namespace RichTextContent {
  export type Packed = {
    blocks: RichTextBlock.Packed[];
    entityMap: Record<string, RichTextEntity.Packed>;
  };

  export type Unpacked = {
    blocks: RichTextBlock.Unpacked<any>[];
    entityMap: Record<string, RichTextEntity.Unpacked>;
  };

  export function createEmpty(text = " "): Unpacked {
    return {
      blocks: [
        {
          key: genKey(),
          type: "regular",
          depth: 0,
          text: text || " ",
          styleMap: {},
          styleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
  }
}

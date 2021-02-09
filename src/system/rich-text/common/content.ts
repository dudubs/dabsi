import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";

// get entity mutablility by client
export namespace RichTextContent {
  export type Packed = {
    blocks: RichTextBlock.Packed[];
    entityMap: Record<string, RichTextEntity.Packed>;
  };

  export type Unpacked = {
    blocks: RichTextBlock.Unpacked<any>[];
    entityMap: Record<string, RichTextEntity.Unpacked<any>>;
  };
}

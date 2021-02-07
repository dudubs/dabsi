import { RichTextBlock } from "@dabsi/system/rich-text/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/contentEntity";

export namespace RichTextContent {
  export type Packed = {
    blocks: RichTextBlock.Packed[];
    entityMap: Record<string, RichTextEntity.Packed>;
  };

  export type Unpacked = {
    blocks: RichTextBlock.Unpacked[];
    entityMap: Record<string, RichTextEntity.Unpacked>;
  };
}

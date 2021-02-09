import { RichTextBlock } from "@dabsi/system/rich-text/common/contentBlock";
import { RichTextEntity } from "@dabsi/system/rich-text/common/contentEntity";

// get entity mutablility by client
export namespace RichTextContent {
  export type Packed = {
    blocks: RichTextBlock.Packed[];
    entityMap: Record<string, RichTextEntity.Packed>;
  };

  export type Raw = {
    blocks: RichTextBlock.Raw<any>[];
    entityMap: Record<string, RichTextEntity.Raw<any>>;
  };

  export type Unpacked = {
    blocks: RichTextBlock.Unpacked[];
    entityMap: Record<string, RichTextEntity.Unpacked>;
  };
}

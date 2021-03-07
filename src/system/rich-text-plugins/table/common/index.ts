import { RichTextContent } from "@dabsi/system/rich-text/common/content";

declare global {
  namespace IRichText {
    interface BlockDataTypes {
      table: DataType<
        {
          cells: {
            key: string;
            content: RichTextContent.Packed;
          }[];
        },
        {
          cells: {
            key: string;
            content: RichTextContent.Unpacked;
          }[];
        },
        { columns: number }
      >;
    }
  }
}

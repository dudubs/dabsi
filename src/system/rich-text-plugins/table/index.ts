import RichTextModule from "@dabsi/system/rich-text";
import { Module } from "@dabsi/typedi";

declare global {
  namespace IRichText {
    interface BlockDataTypes {
      table: {
        packed;
        unpacked: {
          columns: number;
          rows: Draft.RawDraftContentBlock[];
        };
        readonly;
      };
    }
  }
}
@Module({})
export default class RichTextTableModule {
  constructor(public richTextModule: RichTextModule) {
    // defineblock

    richTextModule.defineBlockHandler("table", {});
  }
}

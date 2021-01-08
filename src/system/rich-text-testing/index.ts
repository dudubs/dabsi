import RichTextLinkModule from "@dabsi/system/rich-text-plugins/link";
import RichTextTableModule from "@dabsi/system/rich-text-plugins/table";
import { Module } from "@dabsi/typedi";

declare global {
  interface RichTextInputValue {
    text: string;
    styles: {}[];
  }
}
@Module({
  dependencies: [RichTextTableModule, RichTextLinkModule, RichTextTableModule],
})
export default class RichTextTestingModule {}

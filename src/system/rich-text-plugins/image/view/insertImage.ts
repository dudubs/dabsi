import { RichTextEditor } from "@dabsi/system/rich-text/view/RichTextEditor";
import RichTextEditorCommands from "@dabsi/system/rich-text/view/RichTextEditorCommands";

export function insertImage(editor: RichTextEditor, url: string, key: string) {
  RichTextEditorCommands.insertAtomicBlock(editor, "", "IMMUTABLE", {
    url,
    key,
  });
}

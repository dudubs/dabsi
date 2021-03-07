import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import useEditorChange from "@dabsi/system/rich-text/browser/editor/useEditorChange";

export default function (): RichTextStore {
  return useEditorChange(editor => editor.currentStore);
}

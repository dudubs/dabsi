import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";

export const RichTextEditorGlobals: IRichText.EditorGlobals = <any>{};

class _Globals {
  builders: ((editor: RichTextEditor) => void)[] = [];

  blockMaxDepth = 30;
}

Object.assign(RichTextEditorGlobals, new _Globals());

declare global {
  namespace IRichText {
    interface EditorGlobals extends _Globals {}
  }
}

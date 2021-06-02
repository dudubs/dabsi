import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import React from "react";

declare global {
  namespace IRichText {
    interface EditorProps {
      mui?: boolean;
    }
  }
}

RichTextEditorGlobals.builders.push(editor => {
  if (!editor.props.mui) return;

  for (const builder of RichTextEditorGlobals.mui.builders) {
    builder(editor);
  }
});

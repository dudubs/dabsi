import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import { MuiInlineStyleButton } from "@dabsi/system/rich-text/browser/toolbars/inlineStyleButton";
import React from "react";
import "../muiStyles";

MuiRichTextEditorPlugins.push(editor => {
  editor.toolbars.push(() => {
    return (
      <>
        <MuiInlineStyleButton store={editor.store} inlineStyle="BOLD" />
        <MuiInlineStyleButton store={editor.store} inlineStyle="ITALIC" />
        <MuiInlineStyleButton store={editor.store} inlineStyle="UNDERLINE" />
      </>
    );
  });
});

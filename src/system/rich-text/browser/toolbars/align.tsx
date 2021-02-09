import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import React from "react";
import { MuiAlignButton } from "./alignButton";

MuiRichTextEditorPlugins.push(editor => {
  editor.toolbars.push(() => {
    return (
      <>
        <MuiAlignButton align="LEFT" store={editor.store} />
        <MuiAlignButton align="CENTER" store={editor.store} />
        <MuiAlignButton align="RIGHT" store={editor.store} />
        <MuiAlignButton align="JUSTIFY" store={editor.store} />
      </>
    );
  });
});

import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/muiPlugins";
import { MuiDirectionButton } from "@dabsi/system/rich-text/browser/toolbars/directionButton";
import { MuiHeaderButton } from "@dabsi/system/rich-text/browser/toolbars/headerButton";
import { MuiInlineStyleButton } from "@dabsi/system/rich-text/browser/toolbars/inlineStyleButton";
import { MuiSeparator } from "@dabsi/system/rich-text/browser/toolbars/separator";
import React from "react";
import "../muiStyles";
import { maxDepth } from "../muiStyles";
import { MuiAlignButton } from "./alignButton";

import { MuiDepthButton } from "./depthButton";
import "./dev";
//
import { MuiListButtonSet } from "./listButton";

MuiRichTextEditorPlugins.push(editor => {
  const { store } = editor;

  editor.bindKey("Tab", event => {
    event.preventDefault();
    store.adjustDepth(event.shiftKey ? -1 : 1, maxDepth);
  });

  editor.toolbars.push(() => {
    return (
      <>
        <MuiInlineStyleButton store={editor.store} inlineStyle="BOLD" />
        <MuiInlineStyleButton store={editor.store} inlineStyle="ITALIC" />
        <MuiInlineStyleButton store={editor.store} inlineStyle="UNDERLINE" />

        <MuiListButtonSet store={editor.store} />

        <MuiHeaderButton store={editor.store} />
        <MuiSeparator />

        <MuiDepthButton depth={1} store={editor.store} />
        <MuiDepthButton depth={-1} store={editor.store} />
        <MuiAlignButton align="LEFT" store={editor.store} />
        <MuiAlignButton align="CENTER" store={editor.store} />
        <MuiAlignButton align="RIGHT" store={editor.store} />
        <MuiAlignButton align="JUSTIFY" store={editor.store} />

        <MuiDirectionButton direction={"LTR"} store={editor.store} />
        <MuiDirectionButton direction={"RTL"} store={editor.store} />
      </>
    );
  });
});

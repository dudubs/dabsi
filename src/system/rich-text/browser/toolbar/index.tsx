import { MuiRichTextEditorPlugins } from "@dabsi/system/rich-text/browser/globals";

import { MuiHeaderButton } from "@dabsi/system/rich-text/browser/plugins/header/button";
import { MuiInlineStyleButton } from "@dabsi/system/rich-text/browser/toolbar/inlineStyleButton";
import { MuiSeparator } from "@dabsi/system/rich-text/browser/toolbar/separator";
import React from "react";

import { MuiDepthButton } from "../plugins/depth/button";
import "./dev";
import { MuiListButton } from "../plugins/list/button";
import { MuiAlignButton } from "@dabsi/system/rich-text/browser/plugins/align/button";
import { MuiDirectionButton } from "@dabsi/system/rich-text/browser/plugins/direction/button";

MuiRichTextEditorPlugins.push(editor => {
  editor.toolbars.push(() => {
    return (
      <>
        <MuiInlineStyleButton store={editor.store} styleType="BOLD" />
        <MuiInlineStyleButton store={editor.store} styleType="ITALIC" />
        <MuiInlineStyleButton store={editor.store} styleType="UNDERLINE" />

        <MuiHeaderButton store={editor.store} />
        <MuiListButton store={editor.store} listType="ORDERED" />
        <MuiListButton store={editor.store} listType="UNORDERED" />
        <MuiSeparator />

        <MuiDepthButton store={editor.store} depth={1} />
        <MuiDepthButton store={editor.store} depth={-1} />
        <MuiAlignButton store={editor.store} align="LEFT" />
        <MuiAlignButton store={editor.store} align="CENTER" />
        <MuiAlignButton store={editor.store} align="RIGHT" />
        <MuiAlignButton store={editor.store} align="JUSTIFY" />

        <MuiDirectionButton store={editor.store} direction={"LTR"} />
        <MuiDirectionButton store={editor.store} direction={"RTL"} />
      </>
    );
  });
});

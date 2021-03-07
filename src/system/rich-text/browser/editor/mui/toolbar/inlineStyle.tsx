import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiInlineStyleButton } from "@dabsi/system/rich-text/browser/editor/mui/toolbar/inlineStyleButton";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => (
    <>
      <MuiInlineStyleButton store={store} styleType="BOLD" />
      <MuiInlineStyleButton store={store} styleType="ITALIC" />
      <MuiInlineStyleButton store={store} styleType="UNDERLINE" />
    </>
  ));
});

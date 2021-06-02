import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiAlignButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-style-align/button";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => {
    return <MuiAlignButton store={store} />;
  });
});

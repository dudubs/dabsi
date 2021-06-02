import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiDepthButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-depth/button";
import { MuiDirectionButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-style-direction/button";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => {
    return (
      <>
        <MuiDepthButton store={store} depth={1} />
        <MuiDepthButton store={store} depth={-1} />
      </>
    );
  });
});

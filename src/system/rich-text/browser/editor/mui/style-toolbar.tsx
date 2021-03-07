import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiDirectionButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-style-direction/button";
import React from "react";
import { MuiDepthButton } from "./builders/block-depth/button";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => {
    return (
      <>
        <MuiDirectionButton store={store} direction={"LTR"} />
        <MuiDirectionButton store={store} direction={"RTL"} />
      </>
    );
  });
});

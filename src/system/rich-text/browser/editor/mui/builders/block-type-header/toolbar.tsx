import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiHeaderButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-type-header/button";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => {
    return <MuiHeaderButton store={store} />;
  });
});

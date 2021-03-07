import { RichTextEditorGlobals } from "@dabsi/system/rich-text/browser/editor/globals";
import { MuiListButton } from "@dabsi/system/rich-text/browser/editor/mui/builders/block-type-list/button";
import React from "react";

RichTextEditorGlobals.mui.builders.push(({ muiToolbarMap }) => {
  muiToolbarMap.editable.push(({ store }) => {
    return <MuiListButton store={store} />;
  });
});
